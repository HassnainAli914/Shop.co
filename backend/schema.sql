-- ==========================================================
-- E-COMMERCE & DASHBOARD UNIFIED SUPABASE SQL MIGRATION
-- Run this in your Supabase SQL Editor (No RLS enabled)
-- ==========================================================

-- 1. USERS / AUTH TABLE
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  uid TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS name TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE products ADD COLUMN IF NOT EXISTS sku TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS cost_price NUMERIC DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS "discountPercent" NUMERIC DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'tshirt';
ALTER TABLE products ADD COLUMN IF NOT EXISTS rating NUMERIC DEFAULT 4.5;
ALTER TABLE products ADD COLUMN IF NOT EXISTS reviews INT DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'In Stock';
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock INT DEFAULT 50;
ALTER TABLE products ADD COLUMN IF NOT EXISTS colors TEXT[] DEFAULT ARRAY['Black', 'Blue'];
ALTER TABLE products ADD COLUMN IF NOT EXISTS sizes TEXT[] DEFAULT ARRAY['S', 'M', 'L', 'XL'];
ALTER TABLE products ADD COLUMN IF NOT EXISTS image TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS "userId" TEXT;

-- 3. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE customers ADD COLUMN IF NOT EXISTS user_name TEXT DEFAULT '';
ALTER TABLE customers ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';
ALTER TABLE customers ADD COLUMN IF NOT EXISTS location TEXT DEFAULT '';
ALTER TABLE customers ADD COLUMN IF NOT EXISTS orders_count INT DEFAULT 0;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS spent NUMERIC DEFAULT 0;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS avatar TEXT DEFAULT '';
ALTER TABLE customers ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Active';
ALTER TABLE customers ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'Customer';
ALTER TABLE customers ADD COLUMN IF NOT EXISTS address TEXT DEFAULT '';
ALTER TABLE customers ADD COLUMN IF NOT EXISTS city TEXT DEFAULT '';
ALTER TABLE customers ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'United States';
ALTER TABLE customers ADD COLUMN IF NOT EXISTS pin_code TEXT DEFAULT '';

-- 4. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_number TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  total NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_name TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS avatar TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS branch TEXT DEFAULT 'USA';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_type TEXT DEFAULT 'Card';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS quantity INT DEFAULT 1;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_date TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Pending';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS subtotal NUMERIC DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_fee NUMERIC DEFAULT 20.00;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax NUMERIC DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS address TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS city TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'United States';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS pin_code TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS state TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS card_number TEXT DEFAULT '************';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS exp_date TEXT DEFAULT '12/29';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS cvv TEXT DEFAULT '***';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS items JSONB DEFAULT '[]'::jsonb;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS activity JSONB DEFAULT '[]'::jsonb;

-- 5. CHAT CONTACTS TABLE
CREATE TABLE IF NOT EXISTS chat_contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT DEFAULT '',
  time TEXT DEFAULT '',
  unread INT DEFAULT 0,
  status TEXT DEFAULT 'online',
  last_seen TEXT DEFAULT 'online',
  avatar TEXT DEFAULT '',
  is_group BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CHAT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  contact_id TEXT REFERENCES chat_contacts(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  text TEXT NOT NULL,
  time TEXT NOT NULL,
  is_mine BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================================
-- DISABLE ROW LEVEL SECURITY (RLS) FOR DIRECT ACCESS
-- ==========================================================
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE chat_contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages DISABLE ROW LEVEL SECURITY;

-- ==========================================================
-- PUSH ALL PRODUCTS TO SUPABASE DATABASE
-- ==========================================================

INSERT INTO products (id, name, sku, price, cost_price, "discountPercent", category, rating, reviews, status, stock, colors, sizes, image, description)
VALUES
('prod_1', 'T-shirt with Tape Details', 'SKU-892110', 120.00, 70.00, 0, 'tshirt', 4.5, 45, 'In Stock', 60, ARRAY['Black', 'White', 'Navy'], ARRAY['S', 'M', 'L', 'XL'], 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80', 'Classic cotton crewneck t-shirt with signature tape details on sleeves.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image = EXCLUDED.image;

INSERT INTO products (id, name, sku, price, cost_price, "discountPercent", category, rating, reviews, status, stock, colors, sizes, image, description)
VALUES
('prod_2', 'Skinny Fit Jeans', 'SKU-892111', 240.00, 140.00, 20, 'jeans', 4.5, 78, 'In Stock', 35, ARRAY['Blue', 'Black', 'Dark Indigo'], ARRAY['30', '32', '34', '36'], 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80', 'Premium stretch denim skinny fit jeans with comfortable waistline.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image = EXCLUDED.image;

INSERT INTO products (id, name, sku, price, cost_price, "discountPercent", category, rating, reviews, status, stock, colors, sizes, image, description)
VALUES
('prod_3', 'Checkered Shirt', 'SKU-892112', 180.00, 100.00, 0, 'shirt', 4.5, 32, 'In Stock', 25, ARRAY['Red/Black', 'Blue/White'], ARRAY['M', 'L', 'XL'], 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80', 'Casual button-down flannel checkered shirt perfect for daily wear.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image = EXCLUDED.image;

INSERT INTO products (id, name, sku, price, cost_price, "discountPercent", category, rating, reviews, status, stock, colors, sizes, image, description)
VALUES
('prod_4', 'Sleeve Striped T-shirt', 'SKU-892113', 130.00, 75.00, 30, 'tshirt', 4.5, 56, 'In Stock', 40, ARRAY['White', 'Navy'], ARRAY['S', 'M', 'L'], 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=80', 'Comfortable striped sleeve t-shirt crafted from breathable combed cotton.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image = EXCLUDED.image;

INSERT INTO products (id, name, sku, price, cost_price, "discountPercent", category, rating, reviews, status, stock, colors, sizes, image, description)
VALUES
('prod_5', 'Vertical Striped Shirt', 'SKU-892114', 212.00, 120.00, 20, 'shirt', 5.0, 92, 'In Stock', 20, ARRAY['Green/White', 'Navy/White'], ARRAY['S', 'M', 'L', 'XL'], 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=80', 'Lightweight vertical striped linen shirt designed for summer breeze.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image = EXCLUDED.image;

INSERT INTO products (id, name, sku, price, cost_price, "discountPercent", category, rating, reviews, status, stock, colors, sizes, image, description)
VALUES
('prod_6', 'Courage Graphic T-shirt', 'SKU-892115', 145.00, 80.00, 0, 'tshirt', 4.0, 24, 'In Stock', 50, ARRAY['Orange', 'Black'], ARRAY['M', 'L', 'XL'], 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=80', 'Bold graphic tee made with high-density screen print and pre-shrunk cotton.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image = EXCLUDED.image;

INSERT INTO products (id, name, sku, price, cost_price, "discountPercent", category, rating, reviews, status, stock, colors, sizes, image, description)
VALUES
('prod_7', 'Loose Fit Bermuda Shorts', 'SKU-892116', 80.00, 45.00, 0, 'shorts', 3.0, 18, 'In Stock', 30, ARRAY['Beige', 'Khaki', 'Olive'], ARRAY['30', '32', '34'], 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=80', 'Relaxed fit cotton twill bermuda shorts with deep utility pockets.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image = EXCLUDED.image;

INSERT INTO products (id, name, sku, price, cost_price, "discountPercent", category, rating, reviews, status, stock, colors, sizes, image, description)
VALUES
('prod_8', 'Faded Skinny Jeans', 'SKU-892117', 210.00, 115.00, 0, 'jeans', 4.5, 63, 'In Stock', 22, ARRAY['Light Wash', 'Medium Wash'], ARRAY['30', '32', '34'], 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500&auto=format&fit=crop&q=80', 'Vintage-inspired washed skinny denim with authentic whisker detailing.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image = EXCLUDED.image;

INSERT INTO products (id, name, sku, price, cost_price, "discountPercent", category, rating, reviews, status, stock, colors, sizes, image, description)
VALUES
('098256BH', 'Apple iPhone 14 Pro', '098256BH', 999.00, 750.00, 10, 'Electronics', 4.9, 128, 'In Stock', 45, ARRAY['Deep Purple', 'Space Black', 'Gold'], ARRAY['128GB', '256GB', '512GB'], 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80', 'The groundbreaking 48MP camera for mind-blowing detail. Dynamic Island, a magical new way to interact with iPhone.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image = EXCLUDED.image;

INSERT INTO products (id, name, sku, price, cost_price, "discountPercent", category, rating, reviews, status, stock, colors, sizes, image, description)
VALUES
('098336NT', 'Samsung Galaxy S23 Ultra', '098336NT', 1199.00, 900.00, 15, 'Electronics', 4.8, 96, 'In Stock', 30, ARRAY['Phantom Black', 'Cream', 'Green'], ARRAY['256GB', '512GB'], 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop&q=80', 'Capture life in epic detail with our 200MP camera and built-in S Pen.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image = EXCLUDED.image;

INSERT INTO products (id, name, sku, price, cost_price, "discountPercent", category, rating, reviews, status, stock, colors, sizes, image, description)
VALUES
('098256BX', 'Air Max 90', '098256BX', 150.00, 95.00, 0, 'tshirt', 4.7, 54, 'In Stock', 18, ARRAY['White', 'Red', 'Black'], ARRAY['8', '9', '10', '11'], 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80', 'Iconic Waffle outsole, stitched overlays and classic TPU accents.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image = EXCLUDED.image;

INSERT INTO products (id, name, sku, price, cost_price, "discountPercent", category, rating, reviews, status, stock, colors, sizes, image, description)
VALUES
('098368NT', 'HOVR Phantom Running Shoes', '098368NT', 140.00, 85.00, 5, 'tshirt', 4.5, 42, 'In Stock', 25, ARRAY['Black', 'Grey'], ARRAY['8', '9', '10'], 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=80', 'Zero gravity feel to maintain energy return that helps eliminate impact.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  image = EXCLUDED.image;
