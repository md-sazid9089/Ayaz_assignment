// app/api/auth/signup/route.ts
// User registration endpoint

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateToken, isValidEmail, isStrongPassword } from "@/lib/auth";
import { validateSignUp } from "@/utils/validation";
import { successResponse, errorResponse, validationErrorResponse, createdResponse } from "@/utils/response";

/**
 * POST /api/auth/signup
 * Create a new user account
 * Body: { name, email, password }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request
    const validation = validateSignUp(body);
    if (!validation.valid) {
      return validationErrorResponse(validation.errors);
    }

    // Check for duplicate email
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email.toLowerCase() },
    });

    if (existingUser) {
      return errorResponse("Email already registered", 400, [
        { field: "email", message: "This email is already in use" },
      ]);
    }

    // Hash password
    const hashedPassword = await hashPassword(body.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: body.name.trim(),
        email: body.email.toLowerCase(),
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = generateToken(user.id, user.email);

    // Return success response
    return createdResponse(
      {
        user,
        token,
      },
      "User created successfully"
    );
  } catch (error: any) {
    console.error("Sign up error:", error);
    return errorResponse("Failed to create user account", 500);
  }
}
