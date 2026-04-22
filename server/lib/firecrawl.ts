// lib/firecrawl.ts
// Firecrawl API integration for scraping product information

import axios from "axios";

// Type definition for scraped product data
export interface ScrapedProduct {
  title: string | null;
  price: number | null;
  currency: string;
  imageUrl: string | null;
  success: boolean;
  error?: string;
}

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || "";
const FIRECRAWL_API_URL = "https://api.firecrawl.dev/v1/scrape"; // Update if Firecrawl endpoint changes

/**
 * Scrape product information from a URL using Firecrawl API
 * @param productUrl - URL of the product page to scrape
 * @returns Promise<ScrapedProduct> - Extracted product information
 */
export async function scrapeProductData(productUrl: string): Promise<ScrapedProduct> {
  try {
    // Validate URL format
    if (!isValidUrl(productUrl)) {
      return {
        title: null,
        price: null,
        currency: "USD",
        imageUrl: null,
        success: false,
        error: "Invalid URL format",
      };
    }

    // Call Firecrawl API to scrape the page
    const response = await axios.post(
      FIRECRAWL_API_URL,
      {
        url: productUrl,
        formats: ["markdown", "html"], // Request both formats for better parsing
      },
      {
        headers: {
          Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 second timeout
      }
    );

    // Extract data from response
    const data = response.data?.data;
    if (!data) {
      return {
        title: null,
        price: null,
        currency: "USD",
        imageUrl: null,
        success: false,
        error: "No data received from Firecrawl",
      };
    }

    // Parse product information
    const title = extractTitle(data);
    const price = extractPrice(data);
    const imageUrl = extractImageUrl(data);

    return {

      title,
      price,
      currency: "USD",
      imageUrl,
      success: true,
    };
  } catch (error: any) {
    console.error("Firecrawl scraping error:", error.message);
    return {
      title: null,
      price: null,
      currency: "USD",
      imageUrl: null,
      success: false,
      error: error.message || "Failed to scrape product data",
    };
  }
}

/**
 * Extract product title from scraped data
 * Looks for common title selectors and patterns
 * @param data - Scraped page data
 * @returns string | null - Product title or null
 */
function extractTitle(data: any): string | null {
  try {
    // Try common title patterns
    // This is a placeholder - adjust based on actual Firecrawl response structure
    const markdown = data.markdown || "";
    const html = data.html || "";

    // Look for <h1> tags (common product title location)
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match && h1Match[1]) {
      return h1Match[1].replace(/<[^>]*>/g, "").trim();
    }

    // Look for title tag
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      return titleMatch[1].replace(/<[^>]*>/g, "").trim();
    }

    // Look for product name in meta tags
    const metaMatch = html.match(/<meta\s+name=["']og:title["']\s+content=["']([^"']*)["']/i);
    if (metaMatch && metaMatch[1]) {
      return metaMatch[1];
    }

    // Fallback: extract from markdown headers
    const markdownHeaderMatch = markdown.match(/^# (.+?)$/m);
    if (markdownHeaderMatch && markdownHeaderMatch[1]) {
      return markdownHeaderMatch[1];
    }

    return null;
  } catch (error) {
    console.error("Error extracting title:", error);
    return null;
  }
}

/**
 * Extract product price from scraped data
 * Looks for common price patterns like $99.99
 * @param data - Scraped page data
 * @returns number | null - Price as float or null
 */
function extractPrice(data: any): number | null {
  try {
    const html = data.html || "";
    const markdown = data.markdown || "";
    const content = html + " " + markdown;

    // Common price patterns: $99.99, USD 99.99, $99, €99.99, etc.
    const pricePatterns = [
      /\$\s*(\d+\.?\d*)/g, // $99.99 or $99
      /USD\s*(\d+\.?\d*)/gi, // USD 99.99
      /price["\']?\s*:\s*["\']?(\d+\.?\d*)/gi, // price: 99.99
      /amount["\']?\s*:\s*["\']?(\d+\.?\d*)/gi, // amount: 99.99
      /(\d+\.\d{2})/g, // Generic decimal number 99.99
    ];

    // Search for price patterns in order of specificity
    for (const pattern of pricePatterns) {
      const match = content.match(pattern);
      if (match) {
        // Extract numeric value from match
        const priceStr = match[0];
        const numberMatch = priceStr.match(/(\d+\.?\d*)/);
        if (numberMatch && numberMatch[1]) {
          const price = parseFloat(numberMatch[1]);
          // Validate price is reasonable (between 0.01 and 1000000)
          if (price > 0.01 && price < 1000000) {
            return price;
          }
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error extracting price:", error);
    return null;
  }
}

/**
 * Extract product image URL from scraped data
 * Looks for common image selectors
 * @param data - Scraped page data
 * @returns string | null - Image URL or null
 */
function extractImageUrl(data: any): string | null {
  try {
    const html = data.html || "";

    // Look for og:image meta tag (most reliable)
    const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i);
    if (ogImageMatch && ogImageMatch[1]) {
      return ogImageMatch[1];
    }

    // Look for product image classes
    const productImageMatch = html.match(/class=["'][^"']*product[-_]?image[^"']*["']\s+src=["']([^"']*)["']/i);
    if (productImageMatch && productImageMatch[1]) {
      return productImageMatch[1];
    }

    // Look for first img tag
    const imgMatch = html.match(/<img[^>]+src=["']([^"']*)["\'][^>]*>/i);
    if (imgMatch && imgMatch[1]) {
      // Avoid icon/logo images
      const src = imgMatch[1];
      if (!src.includes("logo") && !src.includes("icon") && src.includes(".")) {
        return src;
      }
    }

    return null;
  } catch (error) {
    console.error("Error extracting image URL:", error);
    return null;
  }
}

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns boolean - True if URL is valid
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Normalize URL to prevent duplicate tracking of same product
 * @param url - URL to normalize
 * @returns string - Normalized URL
 */
export function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // Remove query parameters for normalization
    return urlObj.origin + urlObj.pathname;
  } catch {
    return url;
  }
}
