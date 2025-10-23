# PartsPOA - Automotive Parts Marketplace

[![Next.js](https://img.shields.io/badge/Next.js-13.5.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A modern, mobile-first e-commerce platform for buying and selling automotive parts in Kenya. Built with Next.js 13, TypeScript, and PostgreSQL.

## ✨ Features

- 🔍 **Smart Search**: Find parts across categories with full-text search
- 🛒 **Shopping Cart**: Add products, manage quantities, persist with localStorage
- ❤️ **Wishlist**: Save favorite products for later
- 📦 **8 Categories**: Engine, Body, Electrical, Suspension, Brakes, Interior, Exterior, Maintenance
- 🖼️ **CDN Images**: Fast loading with Cloudinary (633+ product images)
- 📱 **Mobile-First**: Optimized for Kenyan market
- ⚡ **Fast**: Server-side rendering with Next.js 13 App Router
- 🎨 **Modern UI**: shadcn/ui components with Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd partspoa

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials

# Seed database with sample data
# Note: Database tables are already created in Replit environment
# Only run seeding if your database is empty
npm run db:seed

# Start development server
npm run dev
```

Visit [http://localhost:5000](http://localhost:5000) to see the application.

## 📦 Tech Stack

### Frontend
- **Framework**: Next.js 13.5.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context API

### Backend
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **API**: Next.js API Routes
- **Image Storage**: Cloudinary CDN

## 📁 Project Structure

```
partspoa/
├── app/                    # Next.js 13 App Router
│   ├── api/               # API routes
│   ├── cart/              # Shopping cart page
│   ├── categories/        # Category pages
│   ├── products/          # Product pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── CategoryCard.tsx
│   ├── ProductCard.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── contexts/             # React contexts
│   ├── CartContext.tsx
│   └── WishlistContext.tsx
├── lib/                  # Utilities
│   ├── db-queries.ts
│   ├── types.ts
│   └── utils.ts
├── server/               # Backend
│   ├── db.ts            # Database connection
│   └── schema.ts        # Database schema
└── scripts/             # Utility scripts
    ├── seed.ts          # Database seeding
    └── fix-product-images.ts
```

## 🗄️ Database Schema

### Tables
- **categories**: Product categories with hierarchical structure
- **products**: Product catalog with pricing, inventory, images
- **users**: User accounts (ready for authentication)
- **cart_items**: Shopping cart items
- **wishlist**: User wishlists
- **reviews**: Product reviews and ratings
- **orders**: Order management

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 5000)
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:seed          # Seed database with sample data
npm run db:studio        # Open Drizzle Studio

# Code Quality
npm run typecheck        # Run TypeScript checks
npm run lint             # Run ESLint
```

## 🌐 Deployment

### Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL=postgresql://...
PGHOST=your-db-host
PGPORT=5432
PGUSER=your-db-user
PGPASSWORD=your-db-password
PGDATABASE=your-db-name

# Cloudinary (optional, for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

### Deploy to Render

```bash
# Build command
npm run build

# Start command
npm run start
```

### Docker Deployment

```bash
# Build image
docker build -t partspoa .

# Run container
docker run -p 5000:5000 --env-file .env partspoa
```

## 🎨 UI Components

Built with [shadcn/ui](https://ui.shadcn.com/), featuring:
- Buttons, Cards, Badges
- Forms (Input, Select, Textarea)
- Dialogs, Dropdowns, Modals
- Carousels, Tabs, Accordions
- Toast notifications

All components are customizable and built on Radix UI primitives.

## 📸 Screenshots

### Homepage
- Hero section with search
- Featured products
- Category cards
- Hot deals and best sellers

### Product Pages
- Image gallery with zoom
- Product details and specifications
- Add to cart/wishlist
- Related products

### Shopping Cart
- Line items with quantity controls
- Price calculations
- Proceed to checkout

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [Cloudinary](https://cloudinary.com/) - Image CDN

## 📧 Support

For support, email support@partspoa.com or open an issue on GitHub.

---

**Built with ❤️ for the Kenyan automotive community**
