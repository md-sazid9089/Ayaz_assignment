# Product Price Tracking System - Backend

A professional, production-ready backend for the Product Price Tracking System built with **Next.js**, **Prisma ORM**, **MySQL**, **Firecrawl API**, and **Resend**.

## 🚀 Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Product Tracking**: Add, update, and delete products to track with target prices
- **Web Scraping**: Firecrawl API integration for extracting product data and prices
- **Price History**: Automatic price history tracking with statistics
- **Email Alerts**: Resend integration for sending price drop notifications
- **Scheduled Tasks**: Background service for automatic price checking
- **Security**: Input validation, password hashing, JWT authentication
- **Error Handling**: Comprehensive error handling and validation
- **Type Safety**: Full TypeScript support

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MySQL 5.7+ or MySQL 8.0+
- Git

## 🛠️ Installation

### 1. Clone the repository
```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/price_tracker_db"

# JWT
JWT_SECRET="your-generated-secret-key"

# APIs
FIRECRAWL_API_KEY="your-firecrawl-key"
RESEND_API_KEY="your-resend-key"
ADMIN_API_KEY="your-admin-key"

# Email
FROM_EMAIL="noreply@pricetracksystem.com"

# Environment
NODE_ENV="development"
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### 3. Setup Database

**Create MySQL Database:**
```bash
mysql -u root -p
CREATE DATABASE price_tracker_db;
EXIT;
```

**Initialize Prisma:**
```bash
# Generate Prisma client
npm run prisma:generate

# Create database schema
npm run prisma:push
```

Or use migrations (recommended for production):
```bash
npm run prisma:migrate
```

### 4. Get API Keys

- **Firecrawl API**: https://www.firecrawl.dev (Sign up and get API key)
- **Resend**: https://resend.com (Sign up for email service)
- **JWT Secret**: Generate with: `openssl rand -base64 32`
- **Admin API Key**: Generate with: `openssl rand -base64 32`

## 🚀 Running the Server

### Development
```bash
npm run dev
```
Server runs on `http://localhost:3001`

### Production Build
```bash
npm run build
npm start
```

### Database Studio (Visual Inspect)
```bash
npm run prisma:studio
```
Opens Prisma Studio at `http://localhost:5555`

## 📚 API Documentation

### Authentication Routes

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "id": "cuid123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGc..."
  }
}
```

#### Sign In
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "Signed in successfully",
  "data": {
    "user": {
      "id": "cuid123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGc..."
  }
}
```

### Product Routes

All product routes require authentication. Include `Authorization: Bearer {token}` header.

#### Get All Products
```http
GET /api/products
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": "cuid123",
      "productUrl": "https://example.com/product",
      "productTitle": "Product Name",
      "currentPrice": 99.99,
      "targetPrice": 79.99,
      "currency": "USD",
      "alertSent": false,
      "createdAt": "2024-01-01T12:00:00Z",
      "priceHistory": [...]
    }
  ]
}
```

#### Add Product
```http
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "productUrl": "https://amazon.com/dp/B0123456",
  "targetPrice": 79.99
}

Response:
{
  "success": true,
  "message": "Product added successfully",
  "data": {
    "id": "cuid456",
    "productUrl": "https://amazon.com/dp/B0123456",
    "productTitle": "Amazing Product",
    "currentPrice": 99.99,
    "targetPrice": 79.99,
    "currency": "USD",
    "alertSent": false,
    "createdAt": "2024-01-02T10:30:00Z"
  }
}
```

#### Get Product Details
```http
GET /api/products/{id}
Authorization: Bearer {token}

Response: Single product object with full price history
```

#### Update Product
```http
PUT /api/products/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "targetPrice": 75.00
}

Response: Updated product object
```

#### Delete Product
```http
DELETE /api/products/{id}
Authorization: Bearer {token}

Response: 204 No Content
```

#### Get Price History
```http
GET /api/products/{id}/history?limit=100&skip=0
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Price history retrieved successfully",
  "data": {
    "data": [
      {
        "id": "cuid789",
        "trackedProductId": "cuid123",
        "price": 99.99,
        "checkedAt": "2024-01-02T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 30,
      "limit": 100,
      "skip": 0,
      "hasMore": false
    },
    "stats": {
      "minPrice": 79.99,
      "maxPrice": 129.99,
      "avgPrice": 99.99,
      "priceChange": {
        "current": 99.99,
        "oldest": 129.99,
        "percentChange": -23.1
      }
    }
  }
}
```

### Admin Routes

#### Trigger Price Check
```http
POST /api/admin/check-prices
X-API-Key: {admin-api-key}

Response:
{
  "success": true,
  "message": "Price check completed",
  "data": {
    "totalChecked": 50,
    "successful": 48,
    "alertsSent": 5,
    "pricesChanged": 12,
    "errors": [...]
  }
}
```

#### Get Price Check Stats
```http
GET /api/admin/check-prices
X-API-Key: {admin-api-key}

Response:
{
  "success": true,
  "data": {
    "totalTrackedProducts": 50,
    "productsWithAlerts": 5,
    "averagePriceHistoryLength": 20,
    "lastCheckTime": "2024-01-02T11:00:00Z"
  }
}
```

#### Health Check
```http
GET /api/health

Response:
{
  "success": true,
  "message": "Server is healthy",
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-02T11:00:00Z",
    "database": "connected"
  }
}
```

## ⏰ Scheduled Price Checking

### Using Node-Cron

Create a file `lib/scheduler.ts`:

```typescript
import cron from 'node-cron';
import { checkAllProductPrices } from './priceChecker';

export function startPriceCheckScheduler() {
  // Run price check every hour
  cron.schedule('0 * * * *', async () => {
    console.log('Running scheduled price check...');
    try {
      await checkAllProductPrices();
      console.log('Price check completed successfully');
    } catch (error) {
      console.error('Error during scheduled price check:', error);
    }
  });

  console.log('Price check scheduler started');
}
```

### Using External Cron Service

Call the admin endpoint from an external service (e.g., AWS CloudWatch, GitHub Actions):

```bash
curl -X POST http://your-api.com/api/admin/check-prices \
  -H "X-API-Key: your-admin-api-key" \
  -H "Content-Type: application/json"
```

## 🗄️ Database Schema

### User Table
```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  password      String    // Hashed with bcrypt
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  trackedProducts TrackedProduct[]
}
```

### TrackedProduct Table
```prisma
model TrackedProduct {
  id            String    @id @default(cuid())
  userId        String
  productUrl    String
  productTitle  String?
  productImage  String?
  currentPrice  Float
  targetPrice   Float
  currency      String
  alertSent     Boolean   @default(false)
  lastAlertSentAt DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  user          User      @relation(fields: [userId], references: [id])
  priceHistory  PriceHistory[]
}
```

### PriceHistory Table
```prisma
model PriceHistory {
  id                String    @id @default(cuid())
  trackedProductId  String
  price             Float
  checkedAt         DateTime  @default(now())
  trackedProduct    TrackedProduct @relation(fields: [trackedProductId], references: [id])
}
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs with 10 salt rounds
- **JWT Tokens**: Expire after 7 days
- **Input Validation**: All endpoints validate request data
- **Ownership Checks**: Users can only access their own products
- **Environment Variables**: All sensitive data in .env files
- **CORS**: Configured for frontend communication
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **XSS Prevention**: HTML escaping in emails

## 📝 Project Structure

```
server/
├── app/
│   └── api/
│       ├── auth/
│       │   ├── signup/route.ts
│       │   └── signin/route.ts
│       ├── products/
│       │   ├── route.ts
│       │   └── [id]/
│       │       ├── route.ts
│       │       └── history/route.ts
│       ├── admin/
│       │   └── check-prices/route.ts
│       └── health/route.ts
├── lib/
│   ├── prisma.ts          # Database client
│   ├── auth.ts            # JWT & bcrypt utilities
│   ├── firecrawl.ts       # Web scraping
│   ├── resend.ts          # Email service
│   └── priceChecker.ts    # Price checking logic
├── utils/
│   ├── validation.ts      # Request validation
│   └── response.ts        # Response formatting
├── prisma/
│   └── schema.prisma      # Database schema
├── .env.example           # Environment template
├── tsconfig.json          # TypeScript config
├── next.config.js         # Next.js config
└── package.json           # Dependencies
```

## 🧪 Testing the API

### Using cURL

```bash
# Sign up
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Sign in
curl -X POST http://localhost:3001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Add product (replace TOKEN with actual token)
curl -X POST http://localhost:3001/api/products \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productUrl": "https://amazon.com/dp/B0123456",
    "targetPrice": 79.99
  }'
```

### Using Postman

1. Open Postman
2. Create POST request to `http://localhost:3001/api/auth/signin`
3. Add JSON body with email and password
4. Copy token from response
5. Add `Authorization: Bearer {token}` header to product requests

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
- Check MySQL is running: `mysql -u root -p`
- Verify DATABASE_URL in .env.local

### Prisma Error: Tables Not Found
```bash
npm run prisma:push
```

### Port 3001 Already in Use
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID {PID} /F

# Mac/Linux
lsof -i :3001
kill -9 {PID}
```

### Firecrawl API Errors
- Verify API key is correct in .env.local
- Check Firecrawl credits
- Ensure URL is publicly accessible

### Resend Email Not Sending
- Verify API key in .env.local
- Check FROM_EMAIL is verified in Resend dashboard
- Check email format is valid

## 📦 Environment Variable Checklist

- [ ] `DATABASE_URL` - MySQL connection string
- [ ] `JWT_SECRET` - Random generated secret
- [ ] `FIRECRAWL_API_KEY` - From Firecrawl dashboard
- [ ] `RESEND_API_KEY` - From Resend dashboard
- [ ] `ADMIN_API_KEY` - Random generated secret
- [ ] `FROM_EMAIL` - Verified email address

## 🚀 Deployment

### Deploy to Vercel

```bash
cd server
vercel deploy
```

### Deploy to Render

1. Push code to GitHub
2. Connect Render to GitHub repository
3. Create new Web Service
4. Set Build Command: `npm install && npm run prisma:push && npm run build`
5. Set Start Command: `npm start`
6. Add environment variables in Render dashboard

### Deploy with Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run prisma:generate
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

## 📄 License

MIT License - feel free to use for personal and commercial projects

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check environment variables
4. Review server logs

---

**Built with ❤️ for the Product Price Tracking System**
