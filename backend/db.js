const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
require('dotenv').config();

const DB_PATH = process.env.DB_PATH || './database.db';

// Remove existing database
if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
  console.log('Existing database removed');
}

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error creating database:', err);
    process.exit(1);
  }
  console.log('Connected to new SQLite database');
});

const schema = `
-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    short_desc TEXT NOT NULL,
    long_desc TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
`;

const seedData = `
INSERT INTO products (name, category, short_desc, long_desc, price, image_url) VALUES
('Wireless Headphones Pro', 'Electronics', 'Premium noise-canceling headphones', 'Experience studio-quality sound with our flagship wireless headphones. Features active noise cancellation, 30-hour battery life, and premium comfort padding for all-day wear.', 299.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'),
('Smart Watch Ultra', 'Electronics', 'Fitness tracking smartwatch', 'Track your health and fitness goals with precision. Built-in GPS, heart rate monitoring, sleep tracking, and water resistance up to 50m. Compatible with iOS and Android.', 399.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'),
('Leather Messenger Bag', 'Fashion', 'Handcrafted genuine leather bag', 'Timeless design meets modern functionality. This premium leather messenger bag features multiple compartments, adjustable strap, and ages beautifully over time.', 189.99, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400'),
('Ergonomic Office Chair', 'Furniture', 'Premium adjustable office chair', 'Transform your workspace with ultimate comfort. Features lumbar support, breathable mesh back, adjustable armrests, and 360-degree swivel. Perfect for long work sessions.', 449.99, 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400'),
('Portable Bluetooth Speaker', 'Electronics', 'Waterproof outdoor speaker', 'Take your music anywhere with this rugged, waterproof speaker. 20-hour battery life, 360-degree sound, and connects to multiple devices. Perfect for outdoor adventures.', 129.99, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'),
('Minimalist Wallet', 'Fashion', 'Slim RFID-blocking wallet', 'Carry less, live more. This minimalist wallet holds 8-12 cards plus cash, blocks RFID theft, and fits comfortably in any pocket. Available in premium leather or carbon fiber.', 49.99, 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400'),
('Standing Desk Converter', 'Furniture', 'Adjustable sit-stand desk', 'Improve your health and productivity. This desk converter easily adjusts between sitting and standing positions, supports dual monitors, and requires no assembly.', 279.99, 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400'),
('Wireless Keyboard & Mouse', 'Electronics', 'Ergonomic wireless combo', 'Work comfortably and efficiently with this ergonomic keyboard and mouse set. Quiet keys, precision tracking, and 12-month battery life. Compatible with Windows and Mac.', 79.99, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'),
('Designer Sunglasses', 'Fashion', 'UV protection polarized lenses', 'Style meets protection. These designer sunglasses feature polarized lenses with 100% UV protection, durable frames, and come with a premium case and cleaning cloth.', 159.99, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400'),
('Modern Table Lamp', 'Furniture', 'LED dimmable desk lamp', 'Illuminate your space with style. This modern lamp features touch-sensitive dimming, adjustable color temperature, and energy-efficient LED technology. Perfect for any desk or bedside table.', 89.99, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400'),
('Yoga Mat Premium', 'Sports', 'Eco-friendly non-slip yoga mat', 'Practice with confidence on this premium yoga mat. Made from eco-friendly materials, features excellent grip, extra cushioning, and comes with a carrying strap.', 69.99, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400'),
('Coffee Maker Deluxe', 'Home', 'Programmable drip coffee maker', 'Wake up to fresh coffee every morning. This programmable coffee maker brews up to 12 cups, features auto-shutoff, and includes a reusable filter. Perfect for coffee lovers.', 119.99, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400');
`;

db.serialize(() => {
  // Execute schema
  db.exec(schema, (err) => {
    if (err) {
      console.error('Error creating schema:', err);
      process.exit(1);
    }
    console.log('Schema created successfully');
  });

  // Insert seed data
  db.exec(seedData, (err) => {
    if (err) {
      console.error('Error seeding data:', err);
      process.exit(1);
    }
    console.log('Seed data inserted successfully');
  });
});

db.close((err) => {
  if (err) {
    console.error('Error closing database:', err);
    process.exit(1);
  }
  console.log('Database initialized successfully!');
});