// app/api/products/[id]/history/route.ts
// Get price history for a specific product

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
} from "@/utils/response";

/**
 * GET /api/products/[id]/history
 * Get price history for a tracked product
 * Query params: ?limit=100&skip=0
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const userId = verifyAuth(request);
    if (!userId) {
      return unauthorizedResponse("Authentication required");
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get("limit") || "100"), 500); // Max 500
    const skip = Math.max(parseInt(searchParams.get("skip") || "0"), 0);

    // Fetch product to verify ownership
    const product = await prisma.trackedProduct.findUnique({
      where: { id: params.id },
      select: { userId: true },
    });

    if (!product) {
      return notFoundResponse("Product not found");
    }

    // Check ownership
    if (product.userId !== userId) {
      return forbiddenResponse("You do not have permission to access this data");
    }

    // Fetch price history
    const [priceHistory, totalCount] = await Promise.all([
      prisma.priceHistory.findMany({
        where: { trackedProductId: params.id },
        orderBy: { checkedAt: "desc" },
        take: limit,
        skip,
      }),
      prisma.priceHistory.count({
        where: { trackedProductId: params.id },
      }),
    ]);

    // Calculate statistics
    if (priceHistory.length === 0) {
      return successResponse(
        {
          data: [],
          pagination: {
            total: totalCount,
            limit,
            skip,
            hasMore: false,
          },
          stats: null,
        },
        "No price history available"
      );
    }

    const prices = priceHistory.map((h) => h.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

    return successResponse(
      {
        data: priceHistory,
        pagination: {
          total: totalCount,
          limit,
          skip,
          hasMore: skip + limit < totalCount,
        },
        stats: {
          minPrice,
          maxPrice,
          avgPrice: parseFloat(avgPrice.toFixed(2)),
          recordCount: priceHistory.length,
          totalRecords: totalCount,
          priceChange: {
            current: priceHistory[0]?.price || 0,
            oldest: priceHistory[priceHistory.length - 1]?.price || 0,
            percentChange:
              priceHistory.length > 1 && priceHistory[priceHistory.length - 1]?.price
                ? parseFloat(
                    (
                      ((priceHistory[0]!.price - priceHistory[priceHistory.length - 1]!.price) /
                        priceHistory[priceHistory.length - 1]!.price) *
                      100
                    ).toFixed(2)
                  )
                : 0,
          },
        },

      },
      "Price history retrieved successfully"
    );
  } catch (error: any) {
    console.error("Get price history error:", error);
    return errorResponse("Failed to retrieve price history", 500);
  }
}
