// utils/response.ts
// Helper functions for consistent API responses

import { NextResponse } from "next/server";

/**
 * Success response handler
 * @param data - Data to return
 * @param message - Success message
 * @param statusCode - HTTP status code (default 200)
 * @returns NextResponse - Formatted response
 */
export function successResponse(
  data: any = null,
  message: string = "Success",
  statusCode: number = 200
) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: statusCode }
  );
}

/**
 * Error response handler
 * @param message - Error message
 * @param statusCode - HTTP status code (default 400)
 * @param errors - Array of validation errors (optional)
 * @returns NextResponse - Formatted error response
 */
export function errorResponse(
  message: string = "Error",
  statusCode: number = 400,
  errors: any = null
) {
  return NextResponse.json(
    {
      success: false,
      message,
      ...(errors && { errors }),
    },
    { status: statusCode }
  );
}

/**
 * Validation error response
 * @param errors - Array of validation errors
 * @returns NextResponse - Formatted validation error response
 */
export function validationErrorResponse(errors: any) {
  return NextResponse.json(
    {
      success: false,
      message: "Validation failed",
      errors,
    },
    { status: 400 }
  );
}

/**
 * Unauthorized response
 * @param message - Unauthorized message
 * @returns NextResponse - 401 Unauthorized response
 */
export function unauthorizedResponse(message: string = "Unauthorized") {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 401 }
  );
}

/**
 * Forbidden response
 * @param message - Forbidden message
 * @returns NextResponse - 403 Forbidden response
 */
export function forbiddenResponse(message: string = "Forbidden") {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 403 }
  );
}

/**
 * Not found response
 * @param message - Not found message
 * @returns NextResponse - 404 Not Found response
 */
export function notFoundResponse(message: string = "Not found") {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 404 }
  );
}

/**
 * Server error response
 * @param message - Error message
 * @returns NextResponse - 500 Server Error response
 */
export function serverErrorResponse(message: string = "Internal server error") {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 500 }
  );
}

/**
 * Created response (201)
 * @param data - Created data
 * @param message - Success message
 * @returns NextResponse - 201 Created response
 */
export function createdResponse(data: any, message: string = "Created successfully") {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: 201 }
  );
}

/**
 * No content response (204)
 * @returns NextResponse - 204 No Content response
 */
export function noContentResponse() {
  return new NextResponse(null, { status: 204 });
}
