// lib/auth.ts
// Authentication utilities for JWT and password hashing

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

// Type definition for JWT payload
export interface JWTPayload {
  userId: string;
  email: string;
}

// Type definition for auth response
export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRY = "7d";
const SALT_ROUNDS = 10;

/**
 * Hash a plain text password using bcryptjs
 * @param password - Plain text password
 * @returns Promise<string> - Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

/**
 * Compare plain text password with hashed password
 * @param password - Plain text password to check
 * @param hashedPassword - Hashed password from database
 * @returns Promise<boolean> - True if passwords match
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
}

/**
 * Generate JWT token for a user
 * @param userId - User ID
 * @param email - User email
 * @returns string - JWT token
 */
export function generateToken(userId: string, email: string): string {
  try {
    const payload: JWTPayload = { userId, email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    return token;
  } catch (error) {
    throw new Error("Error generating token");
  }
}

/**
 * Verify and decode JWT token
 * @param token - JWT token to verify
 * @returns JWTPayload - Decoded payload if valid
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Extract JWT token from request headers
 * @param request - Next.js request object
 * @returns string | null - Token if found, null otherwise
 */
export function getTokenFromRequest(request: NextRequest): string | null {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    const token = authHeader.substring(7); // Remove "Bearer " prefix
    return token;
  } catch (error) {
    return null;
  }
}

/**
 * Verify request is authenticated and return user ID
 * @param request - Next.js request object
 * @returns string | null - User ID if authenticated, null otherwise
 */
export function verifyAuth(request: NextRequest): string | null {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return null;
    }
    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }
    return payload.userId;
  } catch (error) {
    return null;
  }
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns boolean - True if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns boolean - True if password meets minimum requirements
 */
export function isStrongPassword(password: string): boolean {
  // Minimum 6 characters
  return password.length >= 6;
}
