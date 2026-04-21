# Server Setup Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Create MySQL Database
```bash
mysql -u root -p
CREATE DATABASE price_tracker_db;
EXIT;
```

### 3. Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` and set:
- `DATABASE_URL` - Your MySQL connection
- `JWT_SECRET` - Run: `openssl rand -base64 32`
- `FIRECRAWL_API_KEY` - Get from https://www.firecrawl.dev
- `RESEND_API_KEY` - Get from https://resend.com
- `ADMIN_API_KEY` - Run: `openssl rand -base64 32`

### 4. Setup Database
```bash
npm run prisma:generate
npm run prisma:push
```

### 5. Start Server
```bash
npm run dev
```

Visit `http://localhost:3001`

---

## 🗂️ Folder Structure

```
server/
├── app/api/                 # API Routes
│   ├── auth/                # Authentication
│   ├── products/            # Product management
│   └── admin/               # Admin endpoints
├── lib/                     # Core libraries
│   ├── prisma.ts            # Database setup
│   ├── auth.ts              # JWT & Password hashing
│   ├── firecrawl.ts         # Web scraping
│   ├── resend.ts            # Email sending
│   └── priceChecker.ts      # Price checking logic
├── utils/                   # Utilities
│   ├── validation.ts        # Input validation
│   └── response.ts          # Response formatting
└── prisma/
    └── schema.prisma        # Database schema
```

---

## 🔌 API Endpoints Quick Reference

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/auth/signup` | ❌ | Register new user |
| POST | `/api/auth/signin` | ❌ | Login user |
| GET | `/api/products` | ✅ | Get user's products |
| POST | `/api/products` | ✅ | Add new product |
| GET | `/api/products/:id` | ✅ | Get product details |
| PUT | `/api/products/:id` | ✅ | Update product |
| DELETE | `/api/products/:id` | ✅ | Delete product |
| GET | `/api/products/:id/history` | ✅ | Get price history |
| POST | `/api/admin/check-prices` | 🔑 | Trigger price check |
| GET | `/api/health` | ❌ | Health check |

---

## 📚 Database Models

### User
```
├── id (unique identifier)
├── name
├── email (unique)
├── password (hashed)
└── trackedProducts (relation)
```

### TrackedProduct
```
├── id (unique identifier)
├── userId (reference to User)
├── productUrl
├── productTitle
├── productImage
├── currentPrice
├── targetPrice
├── currency
├── alertSent (boolean flag)
├── lastAlertSentAt (timestamp)
└── priceHistory (relation)
```

### PriceHistory
```
├── id (unique identifier)
├── trackedProductId (reference)
├── price
└── checkedAt (timestamp)
```

---

## 🔑 Key Features

### Authentication Flow
1. User signs up with name, email, password
2. Password is hashed with bcryptjs (10 salt rounds)
3. User can sign in with email and password
4. JWT token issued (expires in 7 days)
5. Include token in `Authorization: Bearer {token}` header

### Product Tracking Flow
1. User adds product with URL and target price
2. Firecrawl API fetches product title, current price, image
3. Product saved to database
4. Price history record created

### Price Checking Flow
1. Background service calls price check endpoint
2. For each product: scrape current price
3. Save new price to history
4. If price ≤ target: send email alert
5. Update last alert timestamp (prevent duplicate alerts)

### Email Alert Flow
1. Check if price below target
2. Check if last alert was > 24 hours ago
3. Send email via Resend API
4. Mark `alertSent: true`
5. Update `lastAlertSentAt` timestamp

---

## 🐛 Common Issues & Solutions

### Issue: `connect ECONNREFUSED 127.0.0.1:3306`
**Solution**: Start MySQL
```bash
# Windows
net start MySQL

# Mac
brew services start mysql

# Linux
sudo systemctl start mysql
```

### Issue: `Table doesn't exist`
**Solution**: Push schema to database
```bash
npm run prisma:push
```

### Issue: `FIRECRAWL_API_KEY is required`
**Solution**: Add to `.env.local`
```env
FIRECRAWL_API_KEY=your-key-here
```

### Issue: `Port 3001 already in use`
**Solution**: Kill process using port
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID {PID} /F

# Mac/Linux
lsof -i :3001
kill -9 {PID}
```

---

## 📊 Database Schema Diagram

```
┌─────────────────┐
│     User        │
├─────────────────┤
│ id (PK)         │
│ name            │
│ email (UNIQUE)  │
│ password        │
│ createdAt       │
│ updatedAt       │
└────────┬────────┘
         │ 1:N
         │
         ↓
┌──────────────────────────┐         ┌──────────────────┐
│  TrackedProduct          │1:N      │  PriceHistory    │
├──────────────────────────┤    ┌───→├──────────────────┤
│ id (PK)                  │    │    │ id (PK)          │
│ userId (FK)              │    │    │ trackedProductId │
│ productUrl               │    │    │ (FK)             │
│ productTitle             │    │    │ price            │
│ productImage             │    │    │ checkedAt        │
│ currentPrice             │    │    └──────────────────┘
│ targetPrice              │────┘
│ currency                 │
│ alertSent                │
│ lastAlertSentAt          │
│ createdAt                │
│ updatedAt                │
└──────────────────────────┘
```

---

## 🔒 Security Checklist

- [x] Passwords hashed with bcrypt
- [x] JWT tokens with expiration
- [x] Input validation on all endpoints
- [x] User ownership verification
- [x] Sensitive data in environment variables
- [x] SQL injection prevention (Prisma ORM)
- [x] CORS headers configured
- [x] Error messages don't leak sensitive info

---

## 📱 Testing the API

### Sign Up
```bash
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"User","email":"user@test.com","password":"pass123"}'
```

### Get Your Token
```bash
curl -X POST http://localhost:3001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"pass123"}'
```

### Use Token
```bash
curl -X GET http://localhost:3001/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🚀 Next Steps

1. ✅ Setup complete - start developing!
2. Connect frontend to these API endpoints
3. Setup scheduled price checking (cron job)
4. Deploy to production (Vercel, Render, etc.)
5. Monitor with health checks
6. Scale database as needed

---

## 📞 Support Resources

- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Firecrawl**: https://www.firecrawl.dev/docs
- **Resend**: https://resend.com/docs
- **MySQL Docs**: https://dev.mysql.com/doc

---

**Happy coding! 🎉**
