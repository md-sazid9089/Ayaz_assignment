// app/api/auth/signin/route.ts
// User login endpoint

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, generateToken } from "@/lib/auth";
import { validateSignIn } from "@/utils/validation";
import { successResponse, errorResponse, validationErrorResponse } from "@/utils/response";

/**
 * POST /api/auth/signin
 * Authenticate a user and return JWT token
 * Body: { email, password }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request
    const validation = validateSignIn(body);
    if (!validation.valid) {
      return validationErrorResponse(validation.errors);
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: body.email.toLowerCase() },
    });

    if (!user) {
      return errorResponse("Invalid email or password", 401);
    }

    // Compare passwords
    const passwordMatch = await comparePassword(body.password, user.password);

    if (!passwordMatch) {
      return errorResponse("Invalid email or password", 401);
    }

    // Generate JWT token
    const token = generateToken(user.id, user.email);

    // Return success response with user data
    return successResponse(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
      "Signed in successfully"
    );
  } catch (error: any) {
    console.error("Sign in error:", error);
    return errorResponse("Failed to sign in", 500);
  }
}
