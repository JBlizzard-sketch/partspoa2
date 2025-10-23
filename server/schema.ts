import { pgTable, uuid, text, decimal, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  image_url: text('image_url'),
  parent_id: uuid('parent_id'),
  display_order: integer('display_order').default(0),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  category_id: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  compare_at_price: decimal('compare_at_price', { precision: 10, scale: 2 }),
  stock_quantity: integer('stock_quantity').default(0),
  condition: text('condition').default('new'),
  sku: text('sku').unique(),
  images: jsonb('images').default([]),
  is_featured: boolean('is_featured').default(false),
  is_hot_deal: boolean('is_hot_deal').default(false),
  is_best_seller: boolean('is_best_seller').default(false),
  rating: decimal('rating', { precision: 3, scale: 2 }),
  review_count: integer('review_count').default(0),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull().unique(),
  full_name: text('full_name'),
  phone: text('phone'),
  avatar_url: text('avatar_url'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const cart_items = pgTable('cart_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  product_id: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  quantity: integer('quantity').default(1),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const wishlist = pgTable('wishlist', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  product_id: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  product_id: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  status: text('status').default('pending'),
  total_amount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  shipping_address: jsonb('shipping_address'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type User = typeof users.$inferSelect;
export type CartItem = typeof cart_items.$inferSelect;
export type Wishlist = typeof wishlist.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Order = typeof orders.$inferSelect;
