// app/api/products/route.ts
// Get all products and add new product endpoint

import { NextRequest } from "next/server";

export const maxDuration = 60;

import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import { scrapeProductData } from "@/lib/firecrawl";
import { validateAddProduct } from "@/utils/validation";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedResponse,
  createdResponse,
} from "@/utils/response";

/**
 * GET /api/products
 * Get all tracked products for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const userId = verifyAuth(request);
    if (!userId) {
      return unauthorizedResponse("Authentication required");
    }

    // Fetch user's tracked products
    const products = await prisma.trackedProduct.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        priceHistory: {
          orderBy: { checkedAt: "desc" },
          take: 7, // Include last 7 price history records
        },
      },
    });

    return successResponse(products, "Products retrieved successfully");
  } catch (error: any) {
    console.error("Get products error:", error);
    return errorResponse("Failed to retrieve products", 500);
  }
}

/**
 * POST /api/products
 * Add a new product to track
 * Body: { productUrl, targetPrice }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const userId = verifyAuth(request);
    if (!userId) {
      return unauthorizedResponse("Authentication required");
    }

    // Parse request body
    const body = await request.json();

    // Validate request
    const validation = validateAddProduct(body);
    if (!validation.valid) {
      return validationErrorResponse(validation.errors);
    }

    // Check if user already tracking this product
    const existingProduct = await prisma.trackedProduct.findUnique({
      where: {
        userId_productUrl: {
          userId,
          productUrl: body.productUrl,
        },
      },
    });

    if (existingProduct) {
      return errorResponse("You are already tracking this product", 400);
    }

    // Scrape product information from the URL
    const scrapedData = await scrapeProductData(body.productUrl);

    if (!scrapedData.success || scrapedData.price === null) {
      return errorResponse(
        scrapedData.error || "Failed to fetch product information from the URL",
        400
      );
    }

    // Create tracked product
    const trackedProduct = await prisma.trackedProduct.create({
      data: {
        userId,
        productUrl: body.productUrl,
        productTitle: scrapedData.title,
        productImage: scrapedData.imageUrl,
        currentPrice: scrapedData.price,
        targetPrice: body.targetPrice,
        currency: scrapedData.currency,
      },
    });

    // Create initial price history record
    await prisma.priceHistory.create({
      data: {
        trackedProductId: trackedProduct.id,
        price: scrapedData.price,
        checkedAt: new Date(),
      },
    });

    return createdResponse(trackedProduct, "Product added successfully");
  } catch (error: any) {
    console.error("Add product error:", error);
    return errorResponse("Failed to add product", 500);
  }
}
