# Server Deployment Readiness Checklist

**Status**: ✅ Ready for Vercel Deployment

---

## ✅ Configuration Files

- ✅ `vercel.json` - Deployment configuration complete
  - Build command: `npm install && npm run prisma:generate && npm run build`
  - Output directory: `.next`
  - Framework: `nextjs`
  - Environment variables defined
  - Security headers configured
  - CORS headers configured

- ✅ `next.config.js` - Next.js configuration ready
  - React strict mode enabled
  - Production source maps disabled
  - CORS headers configured
  - Security headers configured

- ✅ `.vercelignore` - Deployment exclusions configured
  - node_modules excluded
  - Development files excluded
  - Documentation excluded

- ✅ `package.json` - All scripts configured
  - `npm run build` - Build Next.js app
  - `npm run prisma:generate` - Generate Prisma client
  - `npm run start` - Production server

- ✅ `tsconfig.json` - TypeScript configuration complete
  - Strict mode enabled
  - Module resolution configured

---

## ✅ Environment Configuration

- ✅ `.env` file created with all required variables
  ```
  DATABASE_URL          - MySQL connection string
  JWT_SECRET           - Authentication secret
  FIRECRAWL_API_KEY    - Web scraping API
  RESEND_API_KEY       - Email service API
  ADMIN_API_KEY        - Admin endpoint protection
  FROM_EMAIL           - Email sender address
  NODE_ENV             - Set to production on Vercel
  ```

- ✅ All secrets externalized (NOT in code)
- ✅ All API keys externalized
- ✅ No hardcoded credentials

---

## ✅ Database Setup

- ✅ Prisma ORM configured
- ✅ MySQL connection string ready
- ✅ Database schema defined (3 models)
- ✅ Migration scripts available
  - `npm run prisma:push` - Create database
  - `npm run prisma:migrate` - Run migrations
  - `npm run prisma:studio` - Visual inspect

---

## ✅ API Routes

- ✅ Authentication routes (`/api/auth/*`)
  - POST /api/auth/signup
  - POST /api/auth/signin

- ✅ Products routes (`/api/products/*`)
  - GET /api/products
  - POST /api/products
  - GET /api/products/:id
  - PUT /api/products/:id
  - DELETE /api/products/:id
  - GET /api/products/:id/history

- ✅ Admin routes (`/api/admin/*`)
  - POST /api/admin/check-prices
  - GET /api/admin/check-prices

- ✅ Health routes (`/api/health/*`)
  - GET /api/health

---

## ✅ Core Services

- ✅ Authentication service (`lib/auth.ts`)
  - JWT token generation
  - Bcrypt password hashing
  - Token verification

- ✅ Database client (`lib/prisma.ts`)
  - Prisma client singleton
  - Connection pooling ready

- ✅ Email service (`lib/resend.ts`)
  - Resend API integration
  - HTML email templates

- ✅ Web scraping (`lib/firecrawl.ts`)
  - Firecrawl API integration
  - Data extraction logic

- ✅ Price checking (`lib/priceChecker.ts`)
  - Automated price checks
  - Alert management

---

## ✅ Utilities

- ✅ Input validation (`utils/validation.ts`)
  - Email validation
  - Password strength check
  - URL validation
  - Data sanitization

- ✅ Response formatting (`utils/response.ts`)
  - Consistent JSON responses
  - Error formatting
  - Status code handling

---

## 🚀 Pre-Deployment Steps

### Step 1: Verify Build Locally
```bash
npm install
npm run build
```

### Step 2: Test Locally
```bash
npm run dev
# Test endpoints at http://localhost:3001
```

### Step 3: Set Up Database
```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE price_tracker_db;

# Setup Prisma
npm run prisma:push
```

### Step 4: Update Environment
Update `.env` with production values:
```env
DATABASE_URL=mysql://user:pass@production-host:3306/price_tracker_db
JWT_SECRET=production-secret-key
FIRECRAWL_API_KEY=production-key
RESEND_API_KEY=production-key
ADMIN_API_KEY=production-key
FROM_EMAIL=noreply@yourdomain.com
NODE_ENV=production
```

---

## 📋 Deployment to Vercel

### 1. Connect to Vercel
```bash
# In GitHub, connect your repository to Vercel
# Dashboard: https://vercel.com/new
```

### 2. Select Project Type
- Framework: Next.js
- Root Directory: `server` (or `.`)

### 3. Set Environment Variables
In Vercel Dashboard, add:
- `DATABASE_URL`
- `JWT_SECRET`
- `FIRECRAWL_API_KEY`
- `RESEND_API_KEY`
- `ADMIN_API_KEY`
- `FROM_EMAIL`
- `NODE_ENV=production`

### 4. Configure Build Settings
- Build Command: `npm install && npm run prisma:generate && npm run build`
- Output Directory: `.next`

### 5. Deploy
Click Deploy and wait for completion.

---

## ✅ Post-Deployment Verification

### 1. Health Check
```bash
GET https://your-server.vercel.app/api/health
```

### 2. Authentication Test
```bash
POST https://your-server.vercel.app/api/auth/signup
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "TestPass123!"
}
```

### 3. Error Handling
- Check status codes (400, 401, 403, 404, 500)
- Verify error messages
- Check request logs

### 4. Monitor
- Vercel Dashboard: Function Logs
- Monitor database connections
- Check API response times

---

## 🔒 Security Checklist

- ✅ CORS headers configured
- ✅ Security headers configured (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- ✅ JWT tokens in use
- ✅ Bcrypt password hashing
- ✅ Input validation on all endpoints
- ✅ Error messages don't leak info
- ✅ Admin endpoints protected
- ✅ HTTPS enabled on Vercel
- ✅ Database credentials externalized
- ✅ API keys externalized

---

## 📊 Performance Settings

### Vercel Function Configuration
```json
{
  "functions": {
    "api/**": {
      "maxDuration": 60
    }
  }
}
```

### Database Connection Pooling
- Prisma handles connection pooling automatically
- Max connections: Configurable in DATABASE_URL

### Caching Strategy
- API responses: Cache-Control headers set
- Database queries: Optimized with indexes
- Static content: 3600s cache

---

## 🐛 Troubleshooting

### Build Fails
**Error**: `Prisma not found`
- Solution: Ensure `npm run prisma:generate` in build command
- File: `vercel.json` buildCommand

**Error**: `DATABASE_URL is undefined`
- Solution: Add environment variable in Vercel dashboard
- Ensure variable name matches `.env`

### Runtime Errors
**Error**: `Cannot connect to database`
- Solution: Verify DATABASE_URL format
- Check MySQL instance is running
- Verify network access

**Error**: `CORS blocked`
- Solution: Check next.config.js CORS headers
- Verify Access-Control-Allow-Origin value

### API Errors
**Error**: `401 Unauthorized`
- Solution: JWT_SECRET must match between requests
- Verify token is in Authorization header

**Error**: `500 Internal Server Error`
- Solution: Check Vercel Function Logs
- Verify all environment variables are set

---

## 📞 Support

**Before Deploying:**
- [ ] Verify `.env` has all required variables
- [ ] Test build locally: `npm run build`
- [ ] Test server locally: `npm run dev`
- [ ] Read SETUP_GUIDE.md for additional help

**During Deployment:**
- [ ] Monitor Vercel build logs
- [ ] Check deployment preview
- [ ] Test endpoints before production

**After Deployment:**
- [ ] Test all API endpoints
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Test database connection

---

## ✅ Deployment Status

```
✅ Configuration:      Ready
✅ Dependencies:       Configured
✅ Database:          Schema Ready
✅ API Routes:        Complete
✅ Security:          Configured
✅ Performance:       Optimized
✅ Vercel Config:     Complete

🚀 READY FOR VERCEL DEPLOYMENT
```

---

**Last Updated**: April 22, 2026  
**Version**: 1.0.0  
**Status**: ✅ Ready to Deploy
