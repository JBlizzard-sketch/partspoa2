# 🚀 PartsPOA Deployment Guide

**Last Updated**: October 23, 2025  
**Status**: Production-Ready  
**Next.js Version**: 13.5.1  
**Node Version**: 18+

This comprehensive guide covers deploying PartsPOA to Render and other platforms.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Deploy to Render.com](#deploy-to-rendercom-recommended)
4. [Deploy to Vercel](#deploy-to-vercel)
5. [Deploy with Docker](#deploy-with-docker)
6. [Database Setup](#database-setup)
7. [Post-Deployment Checklist](#post-deployment-checklist)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:
- ✅ **PostgreSQL database** (Render PostgreSQL, Neon, or Supabase)
- ✅ **Cloudinary account** for image hosting (free tier works)
- ✅ **Node.js 18+** runtime
- ✅ **GitHub account** (for automated deployments)
- ✅ **653 products seeded** in database

---

## Environment Variables

### Required for Production

```env
# Application Settings
NODE_ENV=production
PORT=5000
NEXT_PUBLIC_APP_URL=https://your-domain.onrender.com

# Database (PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/database
PGHOST=your-db-host.postgres.render.com
PGPORT=5432
PGUSER=your_db_user
PGPASSWORD=your_secure_password
PGDATABASE=partspoa

# Cloudinary (Image CDN)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**⚠️ SECURITY NOTE**: Never commit these values to Git. Use platform secret management.

---

## Deploy to Render.com (Recommended)

Render offers:
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Free PostgreSQL database
- ✅ Auto-deploy from GitHub
- ✅ European (Frankfurt) region for Kenya

### Option 1: Using Render Blueprint (Easiest)

**Step 1: Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

**Step 2: Deploy to Render**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will auto-detect `render.yaml`
5. Click **"Apply"**

**Step 3: Add Environment Variables**
After blueprint deploys:
1. Go to your web service
2. Click **"Environment"** tab
3. Add the Cloudinary credentials:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Save and redeploy

**Step 4: Seed Database**
1. Connect to database shell in Render dashboard
2. Run the setup script (tables will be created automatically)
3. Or use the SQL execute tool to run seed data

✅ **Your site is now live!**

### Option 2: Manual Setup

**Step 1: Create PostgreSQL Database**
1. In Render Dashboard, click **"New +"** → **"PostgreSQL"**
2. Name: `partspoa-db`
3. Database: `partspoa`
4. User: `partspoa_user`
5. Plan: **Free** (256MB RAM)
6. Region: **Frankfurt** (closest to Kenya)
7. Click **"Create Database"**
8. Copy the **Internal Database URL** (starts with `postgresql://`)

**Step 2: Create Web Service**
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `partspoa`
   - **Region**: `Frankfurt`
   - **Branch**: `main`
   - **Root Directory**: `.` (leave empty)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Plan**: **Starter** (Free tier)

**Step 3: Add Environment Variables**
In the web service, go to **Environment** tab and add:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=<paste internal database URL from Step 1>
PGHOST=<from database connection info>
PGPORT=5432
PGUSER=partspoa_user
PGPASSWORD=<from database connection info>
PGDATABASE=partspoa
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_APP_URL=https://partspoa.onrender.com
```

**Step 4: Deploy**
1. Click **"Create Web Service"**
2. Render will build and deploy your app
3. Wait 3-5 minutes for build to complete
4. Your site will be live at `https://partspoa.onrender.com`

**Step 5: Seed Database**
After deployment:
1. Go to database in Render dashboard
2. Click **"Connect"** → **"External Connection"**
3. Use SQL client or Render shell to run seed script
4. Alternatively: Add a one-time job to run `npm run setup`

---

## Database Setup on Render

### Method 1: Using Render Shell (Recommended)

1. Go to your database in Render Dashboard
2. Click **"Shell"** tab
3. Run this command to create tables:

```sql
-- Tables will be created automatically by the app
-- Just verify they exist:
\dt

-- Should show: categories, products, users, cart_items, wishlist, reviews, orders
```

4. Seed data using the Node.js script:
   - Create a one-time **Background Worker** in Render
   - Command: `npm run setup`
   - Or connect via external connection and run locally

### Method 2: Using External Connection

1. Get external connection details from Render database dashboard
2. Connect using `psql`:
```bash
psql postgresql://user:pass@hostname:port/database
```
3. Tables will be created automatically on first app start
4. Run seed script: `npm run setup` (from local machine connected to prod DB)

---

## Deploy to Vercel

### Quick Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET

# Deploy to production
vercel --prod
```

### Via GitHub Integration

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Add environment variables (same as above)
5. Deploy!

**Note**: Vercel's free tier doesn't include PostgreSQL. Use external database (Neon, Supabase, etc.)

---

## Deploy with Docker

### Using Dockerfile

The project includes a production-ready multi-stage Dockerfile.

**Build and Run:**
```bash
# Build the image
docker build -t partspoa:latest .

# Run the container
docker run -d -p 5000:5000 \
  --name partspoa-app \
  -e DATABASE_URL=postgresql://user:pass@host:5432/db \
  -e CLOUDINARY_CLOUD_NAME=your_cloud_name \
  -e CLOUDINARY_API_KEY=your_api_key \
  -e CLOUDINARY_API_SECRET=your_api_secret \
  -e NEXT_PUBLIC_APP_URL=https://your-domain.com \
  partspoa:latest

# View logs
docker logs -f partspoa-app

# Stop container
docker stop partspoa-app
```

### Using Docker Compose

```bash
# Start all services (app + database)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Note**: Edit `docker-compose.yml` with your environment variables.

### Deploy to Docker Hub

```bash
# Tag image
docker tag partspoa:latest your-username/partspoa:latest

# Push to Docker Hub
docker push your-username/partspoa:latest

# Pull and run on server
docker pull your-username/partspoa:latest
docker run -d -p 5000:5000 your-username/partspoa:latest
```

---

## Post-Deployment Checklist

### Essential Checks

- [ ] **Database connected**: Visit `/api/categories` - should return JSON
- [ ] **Products seeded**: 653 products in database
- [ ] **Images loading**: Cloudinary images display on product cards
- [ ] **Homepage loads**: No errors, products visible
- [ ] **Search works**: `/search?q=brake` returns results
- [ ] **Cart functional**: Add items, view cart
- [ ] **Responsive**: Test on mobile device
- [ ] **HTTPS enabled**: Site loads over https://
- [ ] **SEO tags**: View page source, check meta tags
- [ ] **Sitemap accessible**: Visit `/sitemap.xml`
- [ ] **Robots.txt**: Visit `/robots.txt`

### Performance Checks

- [ ] **Page load < 3s**: Test with Google PageSpeed Insights
- [ ] **Images optimized**: Cloudinary serving WebP format
- [ ] **No console errors**: Check browser console
- [ ] **API responses < 500ms**: Test with browser Network tab

### SEO Checks

- [ ] **Meta title on all pages**: View page source
- [ ] **Meta description**: Present and descriptive
- [ ] **Open Graph tags**: For social sharing
- [ ] **Structured data**: JSON-LD for products
- [ ] **Canonical URLs**: No duplicate content

---

## Verify Deployment

### Test API Endpoints

```bash
# Test categories
curl https://your-domain.onrender.com/api/categories
# Should return: Array of 8 categories

# Test products
curl https://your-domain.onrender.com/api/products/featured
# Should return: Array of 12 featured products with Cloudinary images

# Test search
curl https://your-domain.onrender.com/api/search?q=fuel
# Should return: Products matching "fuel"
```

### Test Pages

Visit these URLs and verify they load:
- `https://your-domain.onrender.com` (Homepage)
- `https://your-domain.onrender.com/categories/engine-parts` (Category)
- `https://your-domain.onrender.com/products/[any-product-slug]` (Product detail)
- `https://your-domain.onrender.com/cart` (Cart)
- `https://your-domain.onrender.com/blog` (Blog)

---

## Troubleshooting

### "Database connection failed"

**Symptoms**: Site loads but shows database errors

**Solutions**:
1. Verify `DATABASE_URL` is correct
2. Check all `PG*` environment variables match database
3. Ensure database allows connections from Render IPs (usually automatic)
4. Test connection from Render shell: `pg_isready -h $PGHOST`

### "Images not loading"

**Symptoms**: Broken image placeholders on product cards

**Solutions**:
1. Verify Cloudinary credentials are set
2. Check `next.config.js` includes `res.cloudinary.com` in `images.domains`
3. Ensure products in database have Cloudinary URLs (not local paths)
4. Test Cloudinary URL directly in browser

### "Build failed"

**Symptoms**: Deployment fails during build step

**Solutions**:
1. Check build logs for specific error
2. Run `npm run build` locally to reproduce
3. Verify `package.json` has correct scripts
4. Check TypeScript errors: `npm run typecheck`
5. Ensure all dependencies in `package.json`

### "Pages loading slowly"

**Symptoms**: Site takes > 5 seconds to load

**Solutions**:
1. Enable caching headers (already configured in Next.js)
2. Use Cloudinary image optimization (already enabled)
3. Upgrade Render plan (free tier sleeps after 15 min inactivity)
4. Deploy to region closer to users (Frankfurt for Kenya)
5. Add Redis caching for API responses (future improvement)

### "502 Bad Gateway" or "503 Service Unavailable"

**Symptoms**: Site shows Render error page

**Solutions**:
1. Check application logs in Render dashboard
2. Verify app is listening on `PORT` environment variable (already configured)
3. Check if app crashed - look for error in logs
4. Restart service manually in Render dashboard
5. Check if free tier quota exceeded

---

## Performance Optimization

### Already Implemented ✅

- **Standalone output**: Optimized Docker builds
- **Image optimization**: Next.js Image component + Cloudinary
- **SWC minification**: Fast builds and smaller bundles
- **Compression**: Gzip/Brotli enabled
- **Lazy loading**: Images load on demand

### Future Improvements

1. **Redis Caching**: Cache API responses (requires paid plan)
2. **CDN**: Use Cloudinary CDN for static assets
3. **Database Connection Pooling**: Already handled by Neon driver
4. **Code Splitting**: Further optimize bundle size
5. **Service Worker**: Offline support (PWA)

---

## Scaling Considerations

### When Traffic Grows

**Database**:
- Upgrade to paid PostgreSQL plan (more connections, storage)
- Enable read replicas for high traffic
- Use Neon's serverless Postgres for auto-scaling

**Application**:
- Upgrade Render plan for more RAM/CPU
- Enable auto-scaling (available on higher tiers)
- Add Redis for session storage and caching

**Images**:
- Upgrade Cloudinary plan for more bandwidth
- Use responsive images (already implemented)
- Enable Cloudinary auto-format and auto-quality

---

## Security Best Practices

### Already Implemented ✅

- ✅ **HTTPS**: Automatic on Render
- ✅ **Environment variables**: Secrets not in code
- ✅ **Content Security Policy**: Headers configured
- ✅ **SQL injection protection**: Using Drizzle ORM parameterized queries
- ✅ **XSS protection**: React escapes by default

### Additional Recommendations

- [ ] Enable rate limiting (use Upstash Redis)
- [ ] Add CORS headers for API routes
- [ ] Implement authentication (NextAuth.js)
- [ ] Add input validation (Zod already installed)
- [ ] Regular dependency updates: `npm audit fix`
- [ ] Enable Render's DDoS protection (automatic on paid plans)

---

## Monitoring & Logs

### View Application Logs

**Render Dashboard**:
1. Go to your web service
2. Click **"Logs"** tab
3. Real-time log streaming available

**Via Render API**:
```bash
# Get recent logs
curl https://api.render.com/v1/services/{service-id}/logs \
  -H "Authorization: Bearer {your-api-key}"
```

### Monitor Performance

**Render Built-in Monitoring**:
- CPU usage
- Memory usage
- Request count
- Response times

**External Tools** (Optional):
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Google Analytics**: Traffic monitoring
- **Uptime Robot**: Downtime alerts

---

## Custom Domain Setup

### Add Custom Domain to Render

1. Go to your web service in Render
2. Click **"Settings"** tab
3. Scroll to **"Custom Domains"**
4. Click **"Add Custom Domain"**
5. Enter your domain (e.g., `partspoa.co.ke`)
6. Add DNS records provided by Render:
   ```
   Type: CNAME
   Name: www
   Value: partspoa.onrender.com
   ```
7. Wait for DNS propagation (5-60 minutes)
8. Render automatically provisions SSL certificate

### Update Environment Variable

After adding custom domain:
```env
NEXT_PUBLIC_APP_URL=https://www.partspoa.co.ke
```

---

## Backup & Disaster Recovery

### Database Backups

**Render PostgreSQL**:
- Free plan: No automatic backups
- Paid plans: Daily automated backups
- Manual backup: Use `pg_dump`

```bash
# Manual backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore backup
psql $DATABASE_URL < backup-20251023.sql
```

### Application Backups

- **Git repository**: Primary backup (all code)
- **Cloudinary**: Images backed up automatically
- **Environment variables**: Keep secure copy (password manager)

---

## Support & Resources

### Documentation

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Docker Docs](https://docs.docker.com)

### Project Documentation

- `replit.md` - Complete project overview
- `replit-documentation/00-START-HERE.md` - Quick start guide
- `IMPORT_COMPLETE.md` - Latest import status
- `README.md` - User-facing documentation

---

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server (port 5000)
npm run build            # Build for production
npm run start            # Start production server
npm run typecheck        # Check TypeScript errors

# Database
npm run setup            # Create tables + seed 653 products
npm run db:studio        # Open Drizzle Studio GUI
npm run db:seed          # Reseed database

# Docker
docker build -t partspoa .          # Build image
docker run -p 5000:5000 partspoa    # Run container
docker-compose up -d                # Start with docker-compose

# Deployment
vercel                   # Deploy to Vercel
git push origin main     # Auto-deploy to Render (if configured)
```

---

**Deployment Status**: ✅ Ready for Production  
**Last Updated**: October 23, 2025  
**Maintained By**: PartsPOA Development Team

For deployment support, check the documentation above or contact your platform's support team.

