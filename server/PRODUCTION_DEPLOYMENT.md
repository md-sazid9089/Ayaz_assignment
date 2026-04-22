# Server Production Deployment Guide

**Status**: ✅ READY FOR VERCEL DEPLOYMENT

---

## 🚀 5-Minute Deployment

### Step 1: Prepare Environment (2 min)

Update `server/.env` with production values:

```env
# Database (Required)
DATABASE_URL=mysql://user:password@host:port/database_name

# Authentication (Generate new secrets)
JWT_SECRET=<output of: openssl rand -base64 32>
ADMIN_API_KEY=<output of: openssl rand -base64 32>

# External APIs (Get from providers)
FIRECRAWL_API_KEY=your-firecrawl-key
RESEND_API_KEY=your-resend-key

# Email (Your domain)
FROM_EMAIL=noreply@yourdomain.com

# Production Mode
NODE_ENV=production
```

### Step 2: Deploy to Vercel (3 min)

1. **Connect Repository**
   - Go to https://vercel.com/new
   - Select your GitHub repository
   - Authorize Vercel

2. **Configure Project**
   - Framework: `Next.js`
   - Root Directory: `server` (if monorepo) or `.` (if server is at root)

3. **Set Environment Variables**
   - Click "Environment Variables"
   - Add all variables from `.env`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~60 seconds)

5. **Verify**
   - Test endpoint: `https://your-server.vercel.app/api/health`
   - Should return: `{ "status": "ok" }`

---

## 📋 Complete Deployment Checklist

### Pre-Deployment ✅

- [ ] MySQL database created
- [ ] Database name matches DATABASE_URL
- [ ] Firecrawl API key obtained
- [ ] Resend API key obtained
- [ ] JWT secret generated: `openssl rand -base64 32`
- [ ] Admin API key generated: `openssl rand -base64 32`
- [ ] All `.env` variables updated
- [ ] Code pushed to GitHub
- [ ] `.gitignore` includes `.env`

### Configuration ✅

- [x] `vercel.json` - Complete
- [x] `next.config.js` - Complete
- [x] `package.json` - Complete
- [x] `tsconfig.json` - Complete
- [x] `.vercelignore` - Complete
- [x] `.env` - Template provided

### API Endpoints ✅

- [x] Auth endpoints (signup, signin)
- [x] Product endpoints (CRUD)
- [x] Price history endpoints
- [x] Admin endpoints
- [x] Health check endpoint

### Security ✅

- [x] CORS headers configured
- [x] Security headers configured
- [x] JWT authentication ready
- [x] Bcrypt password hashing ready
- [x] Input validation ready
- [x] Admin API key protection ready

---

## 🔧 Configuration Reference

### vercel.json
```json
{
  "version": 2,
  "buildCommand": "npm install && npm run prisma:generate && npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "DATABASE_URL": { "required": true },
    "JWT_SECRET": { "required": true },
    "FIRECRAWL_API_KEY": { "required": true },
    "RESEND_API_KEY": { "required": true },
    "ADMIN_API_KEY": { "required": true },
    "FROM_EMAIL": { "required": true }
  }
}
```

### Build Settings
- **Framework**: Next.js
- **Build Command**: `npm install && npm run prisma:generate && npm run build`
- **Output Directory**: `.next`
- **Node Version**: 18.x (recommended) or 20.x

### Runtime
- **Function Duration**: 60 seconds (default)
- **Memory**: 3GB (default, auto-scales)
- **CPU**: Proportional to memory

---

## 🗄️ Database Setup

### Option 1: PlanetScale (Recommended)
```bash
# 1. Sign up at https://planetscale.com
# 2. Create database
# 3. Copy connection string
# 4. Paste as DATABASE_URL in Vercel
```

### Option 2: AWS RDS
```bash
# 1. Create RDS MySQL instance
# 2. Allow public access
# 3. Create database
# 4. Get connection string
# 5. Format: mysql://user:password@host:3306/database
```

### Option 3: Local/Self-Hosted
```bash
# 1. Ensure MySQL is accessible from Vercel IPs
# 2. Create database
# 3. Use connection string with public IP
```

### Create Database
```sql
CREATE DATABASE IF NOT EXISTS price_tracker_db;
```

### Setup Schema
```bash
npm run prisma:push
```

---

## 📊 Vercel Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Example |
|----------|-------|---------|
| `DATABASE_URL` | MySQL connection | `mysql://user:pass@host:3306/db` |
| `JWT_SECRET` | Generated secret | `openssl rand -base64 32` |
| `FIRECRAWL_API_KEY` | Firecrawl API key | `fc_xxxxx` |
| `RESEND_API_KEY` | Resend API key | `re_xxxxx` |
| `ADMIN_API_KEY` | Generated admin key | `openssl rand -base64 32` |
| `FROM_EMAIL` | Sender email | `noreply@domain.com` |
| `NODE_ENV` | Environment | `production` |

---

## ✅ Post-Deployment Testing

### 1. Health Check
```bash
curl https://your-server.vercel.app/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Database connected successfully",
  "data": {
    "status": "healthy",
    "timestamp": "2026-04-22T..."
  }
}
```

### 2. Sign Up
```bash
curl -X POST https://your-server.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

### 3. Sign In
```bash
curl -X POST https://your-server.vercel.app/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

### 4. Get Products
```bash
curl https://your-server.vercel.app/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🐛 Common Issues & Solutions

### Issue: Build Fails with "prisma not found"
**Solution:**
- Check `vercel.json` buildCommand includes `npm run prisma:generate`
- Verify `@prisma/client` is in dependencies
- Ensure `prisma` is in devDependencies

### Issue: "DATABASE_URL is undefined"
**Solution:**
- Add `DATABASE_URL` in Vercel dashboard
- Verify exact variable name matches
- Redeploy after adding variable

### Issue: Cannot connect to database
**Solution:**
- Verify MySQL host is accessible from internet
- Check connection string format
- Test locally first: `npm run prisma:studio`
- Ensure firewall allows Vercel IPs

### Issue: 401 Unauthorized on API calls
**Solution:**
- Verify JWT_SECRET matches on client
- Check Authorization header format: `Bearer TOKEN`
- Ensure token is not expired (7 days)
- Regenerate token if needed

### Issue: CORS errors from client
**Solution:**
- Update client `.env`: `VITE_API_BASE_URL=https://your-server.vercel.app`
- Verify CORS headers in `next.config.js`
- Check Access-Control-Allow-Origin value
- Redeploy server after CORS changes

---

## 📈 Monitoring & Maintenance

### Vercel Dashboard
- **Function Logs**: View real-time API logs
- **Analytics**: Monitor requests, errors, duration
- **Deployments**: View build history
- **Settings**: Manage environment variables

### Best Practices
- [ ] Monitor error rate in dashboard
- [ ] Check response times regularly
- [ ] Review database connection logs
- [ ] Set up email alerts for deployments
- [ ] Keep dependencies updated

### Scheduled Tasks
For price checking, use:
- **Option 1**: GitHub Actions cron
- **Option 2**: Vercel Cron Jobs
- **Option 3**: Third-party service (IFT, EasyCron)

```bash
# Trigger price check via API
curl -X POST https://your-server.vercel.app/api/admin/check-prices \
  -H "X-API-Key: YOUR_ADMIN_API_KEY"
```

---

## 🔐 Security Best Practices

- ✅ Never commit `.env` files
- ✅ Rotate secrets regularly
- ✅ Use strong JWT_SECRET (32+ characters)
- ✅ Monitor API logs for suspicious activity
- ✅ Set CORS header to specific frontend domain (not `*`)
- ✅ Rate limit API endpoints (Vercel does this)
- ✅ Keep dependencies updated
- ✅ Review database access logs

---

## 📞 Support

**Need Help?**
1. Check [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
2. Review [README.md](./README.md)
3. Check Vercel build logs
4. Test locally first

**Useful Commands:**
```bash
# Local testing
npm run dev

# Build verification
npm run build

# Database inspection
npm run prisma:studio

# Database setup
npm run prisma:push
```

---

**Status**: ✅ READY FOR PRODUCTION  
**Last Updated**: April 22, 2026  
**Version**: 1.0.0  

🚀 **Deploy with confidence!**
