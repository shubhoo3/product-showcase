const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = process.env.DB_PATH || './database.db';

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// use for the Validation help
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateEnquiry = (data) => {
  const errors = [];
  
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email is required');
  }
  
  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  }
  
  if (!data.product_id || isNaN(data.product_id)) {
    errors.push('Valid product ID is required');
  }
  
  return errors;
};

// API Routes

// GET /api/products - List products with search, filter, and pagination
app.get('/api/products', (req, res) => {
  const { search = '', category = '', page = 1, limit = 9 } = req.query;
  
  const offset = (parseInt(page) - 1) * parseInt(limit);
  
  let query = 'SELECT * FROM products WHERE 1=1';
  let countQuery = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
  const params = [];
  const countParams = [];
  
  if (search) {
    query += ' AND (name LIKE ? OR short_desc LIKE ?)';
    countQuery += ' AND (name LIKE ? OR short_desc LIKE ?)';
    const searchParam = `%${search}%`;
    params.push(searchParam, searchParam);
    countParams.push(searchParam, searchParam);
  }
  
  if (category) {
    query += ' AND category = ?';
    countQuery += ' AND category = ?';
    params.push(category);
    countParams.push(category);
  }
  
  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);
  
  // Get total count
  db.get(countQuery, countParams, (err, countResult) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    // Get products
    db.all(query, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      
      res.json({
        products: rows,
        total: countResult.total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(countResult.total / parseInt(limit))
      });
    });
  });
});

// GET /api/products/:id - Get single product details
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(row);
  });
});

// POST /api/enquiries - Create new enquiry
app.post('/api/enquiries', (req, res) => {
  const { product_id, name, email, phone, message } = req.body;
  
  const errors = validateEnquiry(req.body);
  
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', errors });
  }
  
  // Check if product exists
  db.get('SELECT id FROM products WHERE id = ?', [product_id], (err, product) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Insert enquiry
    const insertQuery = `
      INSERT INTO enquiries (product_id, name, email, phone, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(
      insertQuery,
      [product_id, name.trim(), email.trim(), phone || null, message.trim()],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Database error', details: err.message });
        }
        
        res.status(201).json({
          message: 'Enquiry submitted successfully',
          id: this.lastID
        });
      }
    );
  });
});

// GET /api/enquiries - List all enquiries (admin)
app.get('/api/enquiries', (req, res) => {
  const query = `
    SELECT 
      e.*,
      p.name as product_name
    FROM enquiries e
    LEFT JOIN products p ON e.product_id = p.id
    ORDER BY e.created_at DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    res.json({ enquiries: rows });
  });
});

// GET /api/categories - Get all unique categories
app.get('/api/categories', (req, res) => {
  db.all('SELECT DISTINCT category FROM products ORDER BY category', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    res.json({ categories: rows.map(r => r.category) });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed');
    process.exit(0);
  });
});