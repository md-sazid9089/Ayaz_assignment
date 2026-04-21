# Product Price Tracking System - Complete Backend

A professional, production-ready backend for tracking product prices, sending alerts, and managing user accounts using **Next.js**, **Prisma**, **MySQL**, **Firecrawl**, and **Resend**.

## 📁 Project Structure

```
server/
├── 📄 README.md                    # Full documentation
├── 📄 SETUP_GUIDE.md               # Quick start guide
├── 📄 API_EXAMPLES.md              # API request/response examples
├── 📄 package.json                 # Dependencies
├── 📄 .env.example                 # Environment template
├── 📄 example.env                  # Extended environment examples
├── 📄 .gitignore                   # Git ignore patterns
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 next.config.js               # Next.js configuration
│
├── 📂 app/
│   └── 📂 api/
│       ├── 📂 auth/                # Authentication routes
│       │   ├── signup/route.ts     # User registration
│       │   └── signin/route.ts     # User login
│       ├── 📂 products/            # Product management
│       │   ├── route.ts            # GET all, POST new
│       │   └── 📂 [id]/
│       │       ├── route.ts        # GET, PUT, DELETE product
│       │       └── 📂 history/
│       │           └── route.ts    # GET price history
│       ├── 📂 admin/               # Admin endpoints
│       │   └── 📂 check-prices/
│       │       └── route.ts        # Trigger price checks
│       └── 📂 health/              # Monitoring
│           └── route.ts            # Health check
│
├── 📂 lib/                         # Core libraries
│   ├── 📄 prisma.ts                # Database client setup
│   ├── 📄 auth.ts                  # JWT & password utilities
│   ├── 📄 firecrawl.ts             # Web scraping service
│   ├── 📄 resend.ts                # Email sending service
│   └── 📄 priceChecker.ts          # Price checking logic
│
├── 📂 utils/                       # Utilities
│   ├── 📄 validation.ts            # Input validation
│   └── 📄 response.ts              # Response formatting
│
└── 📂 prisma/
    └── 📄 schema.prisma            # Database schema
```

## 🚀 Quick Start

### 1. Install & Configure (5 minutes)
```bash
npm install
cp .env.example .env.local
# Edit .env.local with your API keys
```

### 2. Setup Database
```bash
npm run prisma:push
```

### 3. Start Server
```bash
npm run dev
# http://localhost:3001
```

## 📚 Documentation

| File | Purpose |
|------|---------|
| [README.md](./README.md) | Complete setup and API documentation |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | 5-minute quick start guide |
| [API_EXAMPLES.md](./API_EXAMPLES.md) | Real-world request/response examples |

## ✨ Key Features

### 🔐 Authentication
- User registration and login
- JWT token-based authentication
- Bcrypt password hashing (10 rounds)
- Token expiry (7 days)

### 📦 Product Tracking
- Add products by URL
- Automatic price fetching via Firecrawl
- Target price configuration
- Prevent duplicate tracking

### 📊 Price History
- Automatic price recording
- Historical data with timestamps
- Statistics (min, max, avg, % change)
- Pagination support

### 📧 Email Alerts
- Automatic email when price drops
- Professional HTML emails via Resend
- 24-hour alert cooldown (prevent spam)
- Customizable alert status

### ⏰ Background Jobs
- Scheduled price checking
- Automatic alert sending
- Admin trigger endpoint
- Statistics tracking

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/signin` - Login

### Products
- `GET /api/products` - Get all tracked products
- `POST /api/products` - Add new product
- `GET /api/products/:id` - Get product details
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/:id/history` - Get price history

### Admin
- `POST /api/admin/check-prices` - Trigger price check
- `GET /api/admin/check-prices` - Get check statistics

### Health
- `GET /api/health` - Server health check

## 🗄️ Database Schema

### User
```
id, name, email, password (hashed), createdAt, updatedAt
```

### TrackedProduct
```
id, userId, productUrl, productTitle, productImage, 
currentPrice, targetPrice, currency, alertSent, lastAlertSentAt,
createdAt, updatedAt
```

### PriceHistory
```
id, trackedProductId, price, checkedAt
```

## 🔑 Required Environment Variables

```env
DATABASE_URL=mysql://user:pass@localhost:3306/price_tracker_db
JWT_SECRET=generated-secret-key
FIRECRAWL_API_KEY=your-api-key
RESEND_API_KEY=your-api-key
ADMIN_API_KEY=generated-admin-key
FROM_EMAIL=noreply@pricetracksystem.com
```

## 🛠️ Development Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:push      # Push schema to database
npm run prisma:migrate   # Create database migration
npm run prisma:studio    # Open Prisma Studio (visual DB)
```

## 🧪 Testing

### Manual Testing
```bash
# Sign up
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"User","email":"user@test.com","password":"pass123"}'

# Get token
curl -X POST http://localhost:3001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"pass123"}'

# Use token
curl -X GET http://localhost:3001/api/products \
  -H "Authorization: Bearer YOUR_TOKEN"
```

See [API_EXAMPLES.md](./API_EXAMPLES.md) for complete request/response examples.

## 🔒 Security Features

✅ JWT authentication  
✅ Bcrypt password hashing  
✅ Input validation on all endpoints  
✅ User ownership verification  
✅ SQL injection prevention (Prisma ORM)  
✅ Sensitive data in environment variables  
✅ CORS headers configured  
✅ Error handling without leaking info  

## 🚀 Deployment

### Vercel
```bash
cd server
vercel deploy
```

### Render
1. Connect GitHub repo
2. Set build command: `npm install && npm run prisma:push && npm run build`
3. Set start command: `npm start`
4. Add environment variables

### Docker
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

## 📖 Database Migrations

### Create Migration
```bash
npm run prisma:migrate
```

### View Migrations
```bash
npm run prisma:studio
```

### Reset Database (⚠️ Destructive)
```bash
npx prisma migrate reset
```

## 📞 External Services Setup

### Firecrawl API
1. Visit https://www.firecrawl.dev
2. Sign up for account
3. Get API key from dashboard
4. Add to `.env.local`

### Resend Email
1. Visit https://resend.com
2. Create account
3. Verify sender email
4. Get API key from settings
5. Add to `.env.local`

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check MySQL is running
mysql -u root -p

# Verify DATABASE_URL in .env.local
```

### Prisma Schema Error
```bash
npm run prisma:push
```

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID {PID} /F

# Mac/Linux
lsof -i :3001
kill -9 {PID}
```

See [README.md](./README.md) for more troubleshooting.

## 📚 Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Database**: MySQL with Prisma ORM
- **Auth**: JWT + bcryptjs
- **Web Scraping**: Firecrawl API
- **Email**: Resend
- **Package Manager**: npm

## 📊 File Statistics

- **Total Files**: 20+
- **TypeScript Routes**: 7
- **Utility Files**: 4
- **Configuration Files**: 5
- **Documentation**: 4
- **LOC**: ~3000+ lines of production code

## 🤝 Contributing

1. Clone repository
2. Create feature branch
3. Make changes
4. Test with `npm run dev`
5. Submit pull request

## 📄 License

MIT License - Use freely in personal and commercial projects

## 🎯 Next Steps

1. ✅ Review [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. ✅ Configure `.env.local`
3. ✅ Run `npm install && npm run prisma:push`
4. ✅ Start with `npm run dev`
5. ✅ Test endpoints with [API_EXAMPLES.md](./API_EXAMPLES.md)
6. ✅ Connect frontend to backend
7. ✅ Setup scheduled price checking
8. ✅ Deploy to production

---

## 🔗 Related Projects

- **Frontend**: [Client Folder](../client) - React + Tailwind + Recharts
- **Deployment**: Vercel, Render, or Docker

---

**Built with ❤️ for professional price tracking**

For questions or issues, refer to the full documentation in [README.md](./README.md).
