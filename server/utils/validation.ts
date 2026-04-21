// utils/validation.ts
// Request validation helpers

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Validate sign-up request body
 * @param body - Request body to validate
 * @returns ValidationResult - Validation result with any errors
 */
export function validateSignUp(body: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate name
  if (!body.name || typeof body.name !== "string") {
    errors.push({ field: "name", message: "Name is required" });
  } else if (body.name.trim().length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters" });
  } else if (body.name.length > 100) {
    errors.push({ field: "name", message: "Name must not exceed 100 characters" });
  }

  // Validate email
  if (!body.email || typeof body.email !== "string") {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!isValidEmail(body.email)) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  // Validate password
  if (!body.password || typeof body.password !== "string") {
    errors.push({ field: "password", message: "Password is required" });
  } else if (body.password.length < 6) {
    errors.push({ field: "password", message: "Password must be at least 6 characters" });
  } else if (body.password.length > 128) {
    errors.push({ field: "password", message: "Password must not exceed 128 characters" });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate sign-in request body
 * @param body - Request body to validate
 * @returns ValidationResult - Validation result with any errors
 */
export function validateSignIn(body: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate email
  if (!body.email || typeof body.email !== "string") {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!isValidEmail(body.email)) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  // Validate password
  if (!body.password || typeof body.password !== "string") {
    errors.push({ field: "password", message: "Password is required" });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate add product request body
 * @param body - Request body to validate
 * @returns ValidationResult - Validation result with any errors
 */
export function validateAddProduct(body: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate product URL
  if (!body.productUrl || typeof body.productUrl !== "string") {
    errors.push({ field: "productUrl", message: "Product URL is required" });
  } else if (!isValidUrl(body.productUrl)) {
    errors.push({ field: "productUrl", message: "Invalid URL format" });
  }

  // Validate target price
  if (body.targetPrice === undefined || body.targetPrice === null) {
    errors.push({ field: "targetPrice", message: "Target price is required" });
  } else if (typeof body.targetPrice !== "number") {
    errors.push({ field: "targetPrice", message: "Target price must be a number" });
  } else if (body.targetPrice <= 0) {
    errors.push({ field: "targetPrice", message: "Target price must be greater than 0" });
  } else if (body.targetPrice > 1000000) {
    errors.push({ field: "targetPrice", message: "Target price is unreasonably high" });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate update product request body
 * @param body - Request body to validate
 * @returns ValidationResult - Validation result with any errors
 */
export function validateUpdateProduct(body: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate target price if provided
  if (body.targetPrice !== undefined) {
    if (typeof body.targetPrice !== "number") {
      errors.push({ field: "targetPrice", message: "Target price must be a number" });
    } else if (body.targetPrice <= 0) {
      errors.push({ field: "targetPrice", message: "Target price must be greater than 0" });
    } else if (body.targetPrice > 1000000) {
      errors.push({ field: "targetPrice", message: "Target price is unreasonably high" });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns boolean - True if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns boolean - True if URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize string input
 * Removes potentially dangerous characters
 * @param input - String to sanitize
 * @returns string - Sanitized string
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, 1000); // Limit length to prevent abuse
}

/**
 * Parse and validate price string
 * Handles formats like "99.99", "$99.99", "USD 99.99"
 * @param priceStr - Price string to parse
 * @returns number | null - Parsed price or null if invalid
 */
export function parsePrice(priceStr: string): number | null {
  if (!priceStr) return null;

  // Remove common currency symbols and text
  let cleaned = priceStr
    .replace(/[\$€£¥₹]/g, "") // Remove currency symbols
    .replace(/USD|EUR|GBP|JPY|INR/gi, "") // Remove currency codes
    .replace(/,/g, "") // Remove commas
    .trim();

  const parsed = parseFloat(cleaned);

  // Validate parsed number
  if (isNaN(parsed) || parsed <= 0 || parsed > 1000000) {
    return null;
  }

  return parsed;
}
