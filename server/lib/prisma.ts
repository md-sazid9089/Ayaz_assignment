// lib/prisma.ts
// Prisma client setup - creates a singleton instance to avoid multiple client connections
// This is especially important in Next.js serverless functions

import { PrismaClient } from "@prisma/client";

// Declare a global variable for Prisma to persist between hot reloads in development
declare global {
  var prisma: PrismaClient | undefined;
}

// Create or reuse existing Prisma client
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// In production, use the prisma instance as-is
// In development, save it to global so it's not recreated on hot reload
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
