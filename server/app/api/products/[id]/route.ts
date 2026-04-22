// app/api/products/[id]/route.ts
// Get, update, and delete a specific product endpoint

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";
import { validateUpdateProduct } from "@/utils/validation";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  noContentResponse,
} from "@/utils/response";

/**
 * GET /api/products/[id]
 * Get details of a specific tracked product
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

    // Fetch product
    const product = await prisma.trackedProduct.findUnique({
      where: { id: params.id },
      include: {
        priceHistory: {
          orderBy: { checkedAt: "desc" },
        },
      },
    });

    if (!product) {
      return notFoundResponse("Product not found");
    }

    // Check ownership
    if (product.userId !== userId) {
      return forbiddenResponse("You do not have permission to access this product");
    }

    return successResponse(product, "Product retrieved successfully");
  } catch (error: any) {
    console.error("Get product error:", error);
    return errorResponse("Failed to retrieve product", 500);
  }
}

/**
 * PUT /api/products/[id]
 * Update a tracked product (e.g., target price)
 * Body: { targetPrice? }
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const userId = verifyAuth(request);
    if (!userId) {
      return unauthorizedResponse("Authentication required");
    }

    // Parse request body
    const body: any = await request.json();


    // Validate request
    const validation = validateUpdateProduct(body);
    if (!validation.valid) {
      return validationErrorResponse(validation.errors);
    }

    // Fetch product
    const product = await prisma.trackedProduct.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return notFoundResponse("Product not found");
    }

    // Check ownership
    if (product.userId !== userId) {
      return forbiddenResponse("You do not have permission to update this product");
    }

    // Update product
    const updatedProduct = await prisma.trackedProduct.update({
      where: { id: params.id },
      data: {
        ...(body.targetPrice !== undefined && { targetPrice: body.targetPrice }),
        updatedAt: new Date(),
      },
    });

    return successResponse(updatedProduct, "Product updated successfully");
  } catch (error: any) {
    console.error("Update product error:", error);
    return errorResponse("Failed to update product", 500);
  }
}

/**
 * DELETE /api/products/[id]
 * Delete a tracked product
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const userId = verifyAuth(request);
    if (!userId) {
      return unauthorizedResponse("Authentication required");
    }

    // Fetch product
    const product = await prisma.trackedProduct.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return notFoundResponse("Product not found");
    }

    // Check ownership
    if (product.userId !== userId) {
      return forbiddenResponse("You do not have permission to delete this product");
    }

    // Delete product (cascade will delete related price history)
    await prisma.trackedProduct.delete({
      where: { id: params.id },
    });

    return noContentResponse();
  } catch (error: any) {
    console.error("Delete product error:", error);
    return errorResponse("Failed to delete product", 500);
  }
}
