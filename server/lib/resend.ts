// lib/resend.ts
// Resend API integration for sending email alerts

import { Resend } from "resend";

// Type definition for email alert
export interface PriceAlertEmail {
  userEmail: string;
  productName: string;
  currentPrice: number;
  targetPrice: number;
  productUrl: string;
  currency: string;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@pricetracksystem.com";

// Initialize Resend client
const resend = new Resend(RESEND_API_KEY);

/**
 * Send price drop alert email using Resend
 * @param emailData - Email and product information
 * @returns Promise<boolean> - True if email sent successfully
 */
export async function sendPriceAlertEmail(emailData: PriceAlertEmail): Promise<boolean> {
  try {
    // Validate inputs
    if (!emailData.userEmail || !emailData.productName || !emailData.productUrl) {
      console.error("Invalid email data provided");
      return false;
    }

    // Check for required environment variables
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return false;
    }

    // Create professional HTML email
    const htmlBody = createEmailHTML(emailData);

    // Send email
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: emailData.userEmail,
      subject: `🎉 Price Drop Alert! ${emailData.productName} is now ${emailData.currency} ${emailData.currentPrice}`,
      html: htmlBody,
    });

    // Check if email was sent successfully
    if (result.error) {
      console.error("Failed to send email:", result.error);
      return false;
    }

    console.log("Email sent successfully:", result.data?.id);
    return true;
  } catch (error: any) {
    console.error("Error sending email:", error.message);
    return false;
  }
}

/**
 * Create professional HTML email body
 * @param emailData - Email and product information
 * @returns string - HTML email body
 */
function createEmailHTML(emailData: PriceAlertEmail): string {
  const priceDropAmount = (emailData.targetPrice - emailData.currentPrice).toFixed(2);
  const priceDropPercent = (
    ((emailData.targetPrice - emailData.currentPrice) / emailData.targetPrice) *
    100
  ).toFixed(1);

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #f0ad4e;
                padding-bottom: 20px;
            }
            .header h1 {
                color: #f0ad4e;
                margin: 0;
                font-size: 28px;
            }
            .header p {
                color: #666;
                margin: 10px 0 0 0;
                font-size: 14px;
            }
            .product-info {
                background-color: #f9f9f9;
                padding: 20px;
                border-left: 4px solid #f0ad4e;
                margin: 20px 0;
                border-radius: 4px;
            }
            .product-info h2 {
                color: #333;
                margin: 0 0 15px 0;
                font-size: 20px;
            }
            .price-row {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
            }
            .price-row:last-child {
                border-bottom: none;
            }
            .price-label {
                font-weight: bold;
                color: #666;
            }
            .price-value {
                color: #333;
                font-size: 16px;
            }
            .current-price {
                color: #27ae60;
                font-weight: bold;
                font-size: 18px;
            }
            .savings {
                background-color: #d4edda;
                color: #155724;
                padding: 10px;
                border-radius: 4px;
                margin: 15px 0;
                text-align: center;
            }
            .savings strong {
                display: block;
                font-size: 18px;
                margin-bottom: 5px;
            }
            .cta-button {
                display: inline-block;
                background-color: #f0ad4e;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                margin: 20px 0;
                text-align: center;
            }
            .cta-button:hover {
                background-color: #ec971f;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #999;
                font-size: 12px;
            }
            .footer a {
                color: #f0ad4e;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 Price Drop Alert!</h1>
                <p>Great news! A product you're tracking is now on sale</p>
            </div>

            <div class="product-info">
                <h2>${escapeHtml(emailData.productName)}</h2>
                
                <div class="price-row">
                    <span class="price-label">Target Price:</span>
                    <span class="price-value">${emailData.currency} ${emailData.targetPrice.toFixed(2)}</span>
                </div>
                
                <div class="price-row">
                    <span class="price-label">Current Price:</span>
                    <span class="price-value current-price">${emailData.currency} ${emailData.currentPrice.toFixed(2)}</span>
                </div>

                <div class="savings">
                    <strong>Save ${priceDropAmount} (${priceDropPercent}% off)</strong>
                    <p>Better than your target price!</p>
                </div>
            </div>

            <div style="text-align: center;">
                <a href="${escapeHtml(emailData.productUrl)}" class="cta-button">
                    View Product & Buy Now
                </a>
            </div>

            <div class="footer">
                <p>This is an automated price alert from your Product Price Tracking System.</p>
                <p>You received this email because you set a price alert for this product.</p>
                <p><a href="#">Manage your alerts</a> | <a href="#">Unsubscribe</a></p>
            </div>
        </div>
    </body>
    </html>
  `;
}

/**
 * Escape HTML special characters to prevent injection
 * @param text - Text to escape
 * @returns string - Escaped text
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}

/**
 * Send test email (for development/testing)
 * @param testEmail - Email address to send test to
 * @returns Promise<boolean> - True if email sent successfully
 */
export async function sendTestEmail(testEmail: string): Promise<boolean> {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: testEmail,
      subject: "Test Email from Price Tracking System",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1>Test Email</h1>
          <p>If you received this email, the Resend integration is working correctly!</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        </div>
      `,
    });

    if (result.error) {
      console.error("Failed to send test email:", result.error);
      return false;
    }

    console.log("Test email sent successfully:", result.data?.id);
    return true;
  } catch (error: any) {
    console.error("Error sending test email:", error.message);
    return false;
  }
}
