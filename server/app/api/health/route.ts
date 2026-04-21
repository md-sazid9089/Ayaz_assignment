// app/api/health/route.ts
// Health check endpoint for monitoring

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/response";

/**
 * GET /api/health
 * Health check endpoint - verify server and database connection
 */
export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;

    return successResponse(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: "connected",
      },
      "Server is healthy"
    );
  } catch (error: any) {
    console.error("Health check error:", error);
    return errorResponse("Server is not healthy", 503, {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: error.message,
    });
  }
}
