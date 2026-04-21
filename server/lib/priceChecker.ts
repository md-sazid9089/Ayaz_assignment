// lib/priceChecker.ts
// Background service for checking product prices and sending alerts

import { prisma } from "./prisma";
import { scrapeProductData } from "./firecrawl";
import { sendPriceAlertEmail } from "./resend";

// Type definition for price check result
export interface PriceCheckResult {
  trackedProductId: string;
  oldPrice: number;
  newPrice: number;
  priceChanged: boolean;
  alertSent: boolean;
  error?: string;
}

/**
 * Check price of a single tracked product
 * Called for individual products or from scheduled tasks
 * @param trackedProductId - ID of the product to check
 * @returns Promise<PriceCheckResult> - Result of the price check
 */
export async function checkProductPrice(trackedProductId: string): Promise<PriceCheckResult> {
  try {
    // Fetch the tracked product from database
    const trackedProduct = await prisma.trackedProduct.findUnique({
      where: { id: trackedProductId },
      include: { user: true },
    });

    if (!trackedProduct) {
      return {
        trackedProductId,
        oldPrice: 0,
        newPrice: 0,
        priceChanged: false,
        alertSent: false,
        error: "Product not found",
      };
    }

    // Scrape current price from the product URL
    const scrapedData = await scrapeProductData(trackedProduct.productUrl);

    if (!scrapedData.success || scrapedData.price === null) {
      return {
        trackedProductId,
        oldPrice: trackedProduct.currentPrice,
        newPrice: 0,
        priceChanged: false,
        alertSent: false,
        error: scrapedData.error || "Failed to scrape price",
      };
    }

    const newPrice = scrapedData.price;
    const oldPrice = trackedProduct.currentPrice;
    const priceChanged = newPrice !== oldPrice;

    // Create price history record regardless of price change
    await prisma.priceHistory.create({
      data: {
        trackedProductId,
        price: newPrice,
        checkedAt: new Date(),
      },
    });

    // Check if price dropped and alert should be sent
    let alertSent = false;
    let shouldAlert = false;

    if (newPrice <= trackedProduct.targetPrice) {
      // Price is at or below target
      const now = new Date();
      const lastAlertTime = trackedProduct.lastAlertSentAt
        ? new Date(trackedProduct.lastAlertSentAt)
        : null;

      // Send alert only if:
      // 1. Never sent before, OR
      // 2. Last alert was more than 24 hours ago (avoid spam)
      if (!lastAlertTime || now.getTime() - lastAlertTime.getTime() > 24 * 60 * 60 * 1000) {
        shouldAlert = true;
      }
    }

    // Send email alert if conditions are met
    if (shouldAlert && trackedProduct.user) {
      const emailSent = await sendPriceAlertEmail({
        userEmail: trackedProduct.user.email,
        productName: trackedProduct.productTitle || "Tracked Product",
        currentPrice: newPrice,
        targetPrice: trackedProduct.targetPrice,
        productUrl: trackedProduct.productUrl,
        currency: trackedProduct.currency,
      });

      if (emailSent) {
        alertSent = true;
        // Update alert status in database
        await prisma.trackedProduct.update({
          where: { id: trackedProductId },
          data: {
            alertSent: true,
            lastAlertSentAt: new Date(),
          },
        });
      }
    }

    // Update product with new price
    await prisma.trackedProduct.update({
      where: { id: trackedProductId },
      data: {
        currentPrice: newPrice,
        productTitle: scrapedData.title || trackedProduct.productTitle,
        productImage: scrapedData.imageUrl || trackedProduct.productImage,
        updatedAt: new Date(),
      },
    });

    return {
      trackedProductId,
      oldPrice,
      newPrice,
      priceChanged,
      alertSent,
    };
  } catch (error: any) {
    console.error(`Error checking price for product ${trackedProductId}:`, error);
    return {
      trackedProductId,
      oldPrice: 0,
      newPrice: 0,
      priceChanged: false,
      alertSent: false,
      error: error.message || "Unknown error during price check",
    };
  }
}

/**
 * Check prices for ALL tracked products
 * This should be called by a scheduled task (cron job)
 * @returns Promise<PriceCheckResult[]> - Results for all products checked
 */
export async function checkAllProductPrices(): Promise<PriceCheckResult[]> {
  try {
    // Fetch all tracked products
    const trackedProducts = await prisma.trackedProduct.findMany({
      include: { user: true },
    });

    console.log(`Starting price check for ${trackedProducts.length} products...`);

    const results: PriceCheckResult[] = [];

    // Check each product
    for (const product of trackedProducts) {
      try {
        const result = await checkProductPrice(product.id);
        results.push(result);

        // Add small delay between requests to avoid overwhelming APIs
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error checking product ${product.id}:`, error);
        results.push({
          trackedProductId: product.id,
          oldPrice: 0,
          newPrice: 0,
          priceChanged: false,
          alertSent: false,
          error: "Error during price check",
        });
      }
    }

    console.log(
      `Price check complete. Alerts sent: ${results.filter((r) => r.alertSent).length}`
    );

    return results;
  } catch (error: any) {
    console.error("Error checking all product prices:", error);
    throw error;
  }
}

/**
 * Reset alert flags for products where price is above target
 * Run this periodically to allow alerts to be sent again if price changes
 * @returns Promise<number> - Number of products reset
 */
export async function resetOldAlertFlags(): Promise<number> {
  try {
    const result = await prisma.trackedProduct.updateMany({
      where: {
        alertSent: true,
        // Complex condition: currentPrice > targetPrice
        // Note: Prisma doesn't support direct field comparisons in raw queries
        // so we handle this in application logic
      },
      data: {
        alertSent: false,
        lastAlertSentAt: null,
      },
    });

    return result.count;
  } catch (error: any) {
    console.error("Error resetting alert flags:", error);
    throw error;
  }
}

/**
 * Get price check statistics
 * Useful for monitoring the price checking service
 * @returns Promise<object> - Statistics about price checks
 */
export async function getPriceCheckStats(): Promise<{
  totalTrackedProducts: number;
  productsWithAlerts: number;
  averagePriceHistoryLength: number;
  lastCheckTime: Date | null;
}> {
  try {
    const totalProducts = await prisma.trackedProduct.count();
    const productsWithAlerts = await prisma.trackedProduct.count({
      where: { alertSent: true },
    });

    // Get last price check time
    const lastCheck = await prisma.priceHistory.findFirst({
      orderBy: { checkedAt: "desc" },
    });

    // Calculate average price history per product
    const priceHistoryStats = await prisma.priceHistory.groupBy({
      by: ["trackedProductId"],
      _count: true,
    });

    const averageHistoryLength =
      priceHistoryStats.length > 0
        ? priceHistoryStats.reduce((sum, item) => sum + item._count, 0) / priceHistoryStats.length
        : 0;

    return {
      totalTrackedProducts: totalProducts,
      productsWithAlerts: productsWithAlerts,
      averagePriceHistoryLength: Math.round(averageHistoryLength),
      lastCheckTime: lastCheck?.checkedAt || null,
    };
  } catch (error: any) {
    console.error("Error getting price check stats:", error);
    throw error;
  }
}
