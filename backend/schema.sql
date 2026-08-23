CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  uid TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  "discountPercent" NUMERIC DEFAULT 0,
  category TEXT DEFAULT 'tshirt',
  colors TEXT[] DEFAULT ARRAY['Black', 'Blue'],
  sizes TEXT[] DEFAULT ARRAY['S', 'M', 'L', 'XL'],
  image TEXT DEFAULT '/images/might1.png',
  description TEXT DEFAULT 'Quality product available on SHOP.CO',
  "userId" TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO products (id, name, price, "discountPercent", category, colors, sizes, image, description)
VALUES
  ('1', 'T-SHIRT WITH TAPE DETAILS', 120, 0, 'tshirt', ARRAY['Black', 'Orange'], ARRAY['S', 'M', 'L'], '/images/might1.png', 'This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.'),
  ('2', 'SKINNY FIT JEANS', 240, 20, 'jeans', ARRAY['Blue'], ARRAY['S', 'M', 'L', 'XL'], '/images/might2.png', 'Comfortable and stylish skinny fit jeans made with premium stretch denim.'),
  ('3', 'CHECKERED SHIRT', 180, 0, 'shirt', ARRAY['Red', 'Blue'], ARRAY['M', 'L', 'XL'], '/images/might3.png', 'Classic checkered pattern button-down shirt made with 100% breathable cotton.'),
  ('4', 'SLEEVE STRIPED T-SHIRT', 130, 30, 'tshirt', ARRAY['Orange', 'Black'], ARRAY['S', 'M', 'L', 'XXL'], '/images/might4.png', 'Casual t-shirt with signature striped sleeve detailing for a sporty everyday look.'),
  ('5', 'VERTICAL STRIPED SHIRT', 212, 20, 'shirt', ARRAY['Green'], ARRAY['M', 'L', 'XL'], '/images/sell1.png', 'Elegant vertical striped relaxed-fit shirt suitable for casual and semi-formal outings.'),
  ('6', 'COURAGE GRAPHIC T-SHIRT', 145, 0, 'tshirt', ARRAY['Orange', 'Yellow'], ARRAY['S', 'M', 'L'], '/images/sell2.png', 'Bold front graphic print t-shirt featuring contemporary typography and oversized fit.'),
  ('7', 'LOOSE FIT BERMUDA SHORTS', 80, 0, 'short', ARRAY['Blue'], ARRAY['S', 'M', 'L', 'XL'], '/images/sell3.png', 'Relaxed Bermuda shorts designed for summer comfort with durable washed denim.'),
  ('8', 'FADED SKINNY JEANS', 210, 0, 'jeans', ARRAY['Black', 'Blue'], ARRAY['M', 'L', 'XL'], '/images/sell4.png', 'Modern faded finish skinny jeans with reinforced stitching and five-pocket design.')
ON CONFLICT (id) DO NOTHING;
