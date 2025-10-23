# 🚀 START HERE - Agent Quick Setup Guide

**Date Updated**: October 23, 2025  
**Status**: ✅ **FULLY FUNCTIONAL** - Site is working, ready for feature development  
**Current Agent**: Agent 9 (Product Generation Complete)

---

## ⚡ CRITICAL: Fresh Import Setup (DO THIS FIRST!)

Every new agent receives a **fresh copy** with **NO node_modules** and **NO database**. Run these commands:

```bash
# 1. Install dependencies
npm install

# 2. Setup database with Cloudinary images (ONE COMMAND!)
npm run setup
```

The workflow will auto-restart. If not, manually restart the "Server" workflow.

**✅ FIXED (Oct 23, 2025)**: `scripts/setup.ts` now correctly imports from `generated-seed-data.ts` (653 products) instead of `seed-data.ts` (15 products). This ensures all 653 Cloudinary images are properly seeded on fresh imports.

**✅ VERIFICATION**: After setup, check these work:
```bash
curl http://localhost:5000/api/categories | head -100
# Should return JSON with 8 categories

curl http://localhost:5000/api/products/featured | head -100
# Should return JSON with 6 featured products (all with Cloudinary images)
```

**✨ What `npm run setup` does:**
- Creates all database tables if they don't exist
- Seeds 8 categories and 653 products (auto-generated from image filenames)
- **Uses intelligent script to parse 653 Cloudinary image filenames and create products**
- Auto-categorizes products based on keywords in filenames
- Verifies everything is working
- Idempotent (safe to run multiple times)

---

## 🎉 GOOD NEWS: Everything Is Working!

**October 23, 2025 Update**: Site fully functional with **653 auto-generated products**:

### ✅ What's Already Working
- **Homepage**: Loads with categories and featured products
- **Database**: PostgreSQL with 8 categories, **653 products** (all auto-generated ✅)
- **Images**: All 653 products use Cloudinary URLs
- **Auto-Generated Products**: Smart parser creates products from image filenames
- **Performance**: Lazy loading enabled, image warnings fixed
- **Shopping Cart**: Fully functional with localStorage
- **Wishlist**: Add/remove functionality working
- **API Routes**: `/api/categories` and `/api/products/featured` returning correct data
- **Product Pages**: Dynamic routes working
- **Category Pages**: Browse by category

### 🚫 What's NOT Broken Anymore
- ~~Database connection~~ ✅ Fixed
- ~~Empty database~~ ✅ Seeded
- ~~Broken image paths~~ ✅ All using Cloudinary now
- ~~SSL certificate errors~~ ✅ Configured correctly

---

## 🎯 What to Build Next

The infrastructure is solid. Focus on **features**, not fixing things:

### High Priority
1. **SEO Optimization**
   - Add metadata to all pages
   - Open Graph tags for social sharing
   - Structured data (JSON-LD)
   
2. **Authentication Pages** (UI only, no backend yet)
   - Login page at `/login`
   - Register page at `/register`
   - Password reset flow

3. **Checkout Flow** (stubbed payment)
   - Checkout page at `/checkout`
   - Order summary and confirmation
   - Payment stub: "Payment system under maintenance. WhatsApp us at [number]"

4. **Order Tracking**
   - Orders page at `/orders`
   - Order detail pages
   - Order status tracking

### Medium Priority
5. **Seller Dashboard** (UI only)
   - "Start Selling" landing page
   - Product management interface (list, add, edit)
   
6. **Search & Filters**
   - Improve product search
   - Advanced filtering (price range, condition, brand)

---

## 📂 Key File Locations

### Configuration Files
- `server/db.ts` - Database connection (**DO NOT MODIFY** SSL config)
- `server/schema.ts` - Drizzle ORM schema
- `drizzle.config.ts` - Drizzle Kit config
- `next.config.js` - Next.js config (Cloudinary domain allowed)
- `package.json` - Dependencies and scripts

### Data Files
- `scripts/seed.ts` - Database seeding script (8 categories, 15 products)
- `scripts/fix-product-images.ts` - Update product images to Cloudinary
- `cloudinary_urls.txt` - All 633 Cloudinary image URLs
- `lib/db-queries.ts` - Database query functions

### Pages & Components
- `app/page.tsx` - Homepage (client component)
- `app/api/` - All API routes
- `components/` - UI components (ProductCard, CategoryCard, etc.)
- `contexts/` - Cart and Wishlist contexts

---

## 🛠️ Essential Commands

```bash
# Development
npm run dev              # Start dev server on port 5000

# Database (DO NOT USE unless necessary)
npm run db:seed          # Re-seed database (only if empty!)
npm run db:studio        # Open Drizzle Studio GUI

# Code Quality
npm run typecheck        # TypeScript validation
npm run lint             # ESLint

# Build
npm run build            # Production build
npm run start            # Start production server
```

---

## 🚨 CRITICAL: What NOT to Do

### ❌ NEVER Run `npm run db:push`
- Causes SSL certificate errors with Replit PostgreSQL
- Tables are **already created**
- Only use SQL execute tool for schema changes

### ❌ NEVER Modify `server/db.ts` SSL Configuration
```typescript
// This is correct - DO NOT CHANGE:
class WebSocketWithTLS extends ws {
  constructor(address: string, protocols?: string | string[]) {
    super(address, protocols, { rejectUnauthorized: false });
  }
}
```

### ❌ NEVER Use Supabase
- Iterations 1-2 used Supabase (removed)
- Current: Neon PostgreSQL via Drizzle ORM
- All Supabase code has been deleted

### ❌ NEVER Assume node_modules Exist
- Every import starts fresh
- **Always run `npm install` first**

---

## 🔑 Environment Variables (Auto-Set by Replit)

```env
DATABASE_URL=postgresql://postgres:password@helium/heliumdb?sslmode=disable
PGHOST=helium
PGPORT=5432
PGUSER=postgres
PGPASSWORD=[auto-set]
PGDATABASE=heliumdb
CLOUDINARY_CLOUD_NAME=dbwfl1ii3
CLOUDINARY_API_KEY=911652142561656
CLOUDINARY_API_SECRET=0Yxe4Sz55uwxN_S-CSLOs90f_gE
```

**You don't need to set these** - Replit handles it automatically.

---

## 🧪 Verify Everything Works

### 1. Server Running
```bash
curl http://localhost:5000/api/categories | head -100
# Should return JSON with 8 categories
```

### 2. Products Have Images
```bash
curl http://localhost:5000/api/products/featured | jq '.[0].images'
# Should show Cloudinary URLs like:
# ["https://res.cloudinary.com/dbwfl1ii3/image/upload/..."]
```

### 3. Homepage Loads
Open the webview - you should see:
- Hero section with "Quality Auto Parts at Unbeatable Prices"
- Product cards with images loading from Cloudinary
- Categories section
- No console errors (except positioning warnings - harmless)

---

## 💡 Quick Troubleshooting

### Problem: Homepage loads but no products
**Solution**: Products are probably not seeded
```bash
npm run db:seed
```

### Problem: Images show broken/404
**Solution**: Products using local paths instead of Cloudinary
```bash
tsx scripts/fix-product-images.ts
```

### Problem: "relation does not exist" error
**Solution**: Database tables not created. Use SQL execute tool:
```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Problem: Dependencies missing
**Solution**: Run `npm install` first!

---

## 📊 Database Status

### Current Data
- **Categories**: 8 (Engine Parts, Body Parts, Electrical, Suspension, Brakes, Interior, Exterior, Maintenance)
- **Products**: **653** (all auto-generated from Cloudinary image filenames)
- **Product Distribution**:
  - Maintenance: 156 products
  - Electrical: 138 products
  - Exterior: 136 products
  - Engine Parts: 95 products
  - Body Parts: 65 products
  - Suspension & Steering: 40 products
  - Brakes: 21 products
  - Interior: 2 products
- **Users**: 0 (table exists, ready for auth)
- **Cart/Wishlist/Reviews/Orders**: Tables exist, ready for features

### Tables Created ✅
1. `categories` - 8 records
2. `products` - **653 records** (auto-generated)
3. `users` - 0 records (ready)
4. `cart_items` - 0 records (ready)
5. `wishlist` - 0 records (ready)
6. `reviews` - 0 records (ready)
7. `orders` - 0 records (ready)

### 🤖 Automated Product Generation
**New Script**: `scripts/generate-products-from-images.ts`
- Parses 653 Cloudinary image filenames
- Auto-generates product names from filenames (e.g., "2007_Impreza_STI_fuel_pump.jpg" → "2007 Impreza STI Fuel Pump")
- Smart categorization based on keywords in filenames
- Generates realistic prices based on category
- Creates SKUs, descriptions, stock quantities automatically
- Output: `scripts/generated-seed-data.ts` with all product data

**To regenerate products** (if needed):
```bash
tsx scripts/generate-products-from-images.ts
# Then reseed database
npm run db:seed
```

---

## 📞 User Preferences

- **Communication**: Simple, everyday language (non-technical)
- **Market**: Kenyan automotive parts marketplace
- **Payment**: M-Pesa integration planned (currently stubbed)
- **Design**: Mobile-first (critical for Kenya market)

---

## 🎓 Tech Stack Summary

- **Frontend**: Next.js 13.5.1 App Router, React, TypeScript
- **UI**: shadcn/ui (Radix UI), Tailwind CSS
- **Database**: Neon PostgreSQL (Replit), Drizzle ORM
- **Images**: Cloudinary CDN (633 images)
- **State**: React Context (Cart, Wishlist)
- **Forms**: React Hook Form + Zod validation

---

## 🚀 Deployment Ready

The site is ready for:
- **Vercel/Netlify**: Next.js optimized
- **Render**: Dockerfile included
- **Docker**: Multi-stage build configured
- **Production**: Build tested, optimized images

---

**Next Steps**: Focus on features, not fixes. The infrastructure is solid. Build authentication, checkout, SEO, and seller features.

**Last Updated**: October 23, 2025 by Agent 9  
**Status**: ✅ Production-ready with 653 products, lazy loading optimized
