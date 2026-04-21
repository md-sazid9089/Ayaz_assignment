// app/api/admin/check-prices/route.ts
// Admin endpoint to manually trigger price checks
// In production, this should be protected with API key or admin authentication

import { NextRequest } from "next/server";
import { checkAllProductPrices, getPriceCheckStats } from "@/lib/priceChecker";
import { successResponse, errorResponse } from "@/utils/response";

/**
 * POST /api/admin/check-prices
 * Manually trigger a full price check for all products
 * This should be called by a cron job or scheduled task
 * In production, add proper authentication
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add proper authentication (API key or admin check)
    const apiKey = request.headers.get("x-api-key");

    if (apiKey !== process.env.ADMIN_API_KEY) {
      return errorResponse("Unauthorized", 401);
    }

    // Run price checks
    const results = await checkAllProductPrices();

    // Prepare summary
    const summary = {
      totalChecked: results.length,
      successful: results.filter((r) => !r.error).length,
      alertsSent: results.filter((r) => r.alertSent).length,
      pricesChanged: results.filter((r) => r.priceChanged).length,
      errors: results.filter((r) => r.error),
    };

    return successResponse(summary, "Price check completed");
  } catch (error: any) {
    console.error("Price check error:", error);
    return errorResponse("Failed to check prices", 500);
  }
}

/**
 * GET /api/admin/check-prices
 * Get statistics about price checking
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add proper authentication
    const apiKey = request.headers.get("x-api-key");

    if (apiKey !== process.env.ADMIN_API_KEY) {
      return errorResponse("Unauthorized", 401);
    }

    const stats = await getPriceCheckStats();
    return successResponse(stats, "Price check stats retrieved");
  } catch (error: any) {
    console.error("Get stats error:", error);
    return errorResponse("Failed to retrieve stats", 500);
  }
}
