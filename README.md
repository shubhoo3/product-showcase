# Product Showcase & Enquiry Application
A full-stack e-commerce product showcase application built with React, Node.js, Express, and SQLite. Features product browsing with search/filter capabilities, detailed product views, and a customer enquiry system.

## 🛠 Tech Stack
Frontend:
React 18
Vanilla CSS (Tailwind-inspired utilities)
Fetch API for HTTP requests

Backend:
Node.js
Express.js
SQLite3
CORS middleware
dotenv for environment variables

Database:
SQLite (file-based, no separate server needed)

## 📁 Project Structure
```
product-showcase/
│
├── backend/
│   ├── node_modules/              # Dependencies (auto-generated)
│   ├── server.js                  # Express server with API routes
│   ├── db.js                      # Database initialization script
│   ├── package.json               # Backend dependencies
│   ├── package-lock.json          # Lock file
│   └── database.db                # SQLite database (auto-generated)
│
└── frontend/
    ├── node_modules/              # Dependencies (auto-generated)
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Header.js              # Site header
    │   │   ├── SearchFilter.js        # Search & category filter
    │   │   ├── ProductCard.js         # Product card component
    │   │   ├── ProductGrid.js         # Product grid layout
    │   │   ├── ProductModal.js        # Product details modal
    │   │   ├── EnquiryForm.js         # Customer enquiry form
    │   │   ├── SuccessMessage.js      # Success confirmation
    │   │   └── Pagination.js          # Pagination controls
    │   │
    │   ├── services/
    │   │   └── api.js                 # API service layer
    │   │
    │   ├── App.js                     # Main application component
    │   ├── App.css                    # Component-specific styles
    │   ├── index.js                   # React entry point
    │   └── index.css                  # Global styles & utilities
    │
    ├── package.json                   # Frontend dependencies
    ├── package-lock.json              # Lock file
    ├── .gitignore                     # Git ignore rules

```



## 🚀 Installation & Setup
1. Clone or Download the Project
git clone <repository-url>
cd product-showcase

2. Backend Setup
   mdkir backend
   cd backend
   
   npm init -y
   npm install express sqlite3 cors dotenv
   npm install --save-dev nodemon

   Initialize Database with Sample Data
   create db.js
   npm run db.js -> it will create database.db(sqlite database)

   To Run backend use command:-> npm run dev #backend starts
   
  Expected Output
  ```
  Server running on http://localhost:3001
  Connected to SQLite database
  ```

4. Frontend Setup
   mkdir frontend
   cd frontend
   npx create react app .
   npm install
   npm start
   
   then create a src/components, src/services

   Expected Output
   ```
   Compiled successfully!

    You can now view product-showcase-frontend in the browser.

    Local:            http://localhost:3000
    On Your Network:  http://192.168.x.x:3000

   ```


## Screenshots
<img width="1921" height="982" alt="enquiry_api" src="https://github.com/user-attachments/assets/154a6189-4aad-46f2-b498-ae7b15a81299" />
<img width="1921" height="984" alt="Home_page" src="https://github.com/user-attachments/assets/37c58440-8215-4bba-8d7c-25e1314f0be2" />

## Screen Recording

https://github.com/user-attachments/assets/0d74301b-22e9-4b64-ba02-a229dbd35844
