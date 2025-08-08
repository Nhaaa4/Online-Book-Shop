# Book Online Shop API

A comprehensive RESTful API for an online bookstore built with Node.js, Express.js, Sequelize ORM, and PostgreSQL. This API provides complete functionality for book management, user authentication, order processing, reviews, and address management.

## 🚀 Features

- **User Authentication & Authorization** with JWT tokens and role-based permissions
- **Book Management** with categories, authors, and reviews
- **Order Processing** with cash and Stripe payment integration
- **Review System** with ratings and distribution analytics
- **Address Management** for shipping (Province, District, Commune, Village hierarchy)
- **Stock Management** with quantity validation
- **Comprehensive Error Handling** and validation

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Payment Processing**: Stripe
- **Validation**: validator.js
- **CORS**: Cross-Origin Resource Sharing enabled

## 📋 Prerequisites

- Node.js (v14+)
- PostgreSQL database
- Stripe account (for payment processing)

## 🔧 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
DB_NAME=your_database_name
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Run database migrations and seeders
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

5. Start the server
```bash
# Development
npm run dev

# Production
npm start
```

The server will run on `http://localhost:3000`

## 📚 API Endpoints Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
Include the JWT token in the request headers:
```
token: your_jwt_token_here
```

**Legend:**
- 🔒 = Requires authentication token
- 👑 = Requires specific permissions

---

## 👤 User Management Endpoints

### 1. Register User
```http
POST /api/users/register
```

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phone_number": "0123456789"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login User
```http
POST /api/users/login
```

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Get User Profile 🔒
```http
GET /api/users/profile
```

**Headers:** `token: jwt_token`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone_number": "0123456789",
    "joinDate": "2024-01-15T10:30:00.000Z",
    "totalOrders": 5,
    "totalSpent": 129.99,
    "role": "customer"
  }
}
```

### 4. Update User Profile 🔒
```http
PUT /api/users/profile
```

**Headers:** `token: jwt_token`

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Smith",
  "phone_number": "0987654321"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

### 5. Get Number of Customers 🔒👑
```http
GET /api/users/number
```

**Headers:** `token: jwt_token` (requires `select.user` permission)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "count": 150
  }
}
```

### 6. Get All Users 🔒👑
```http
GET /api/users
```

**Headers:** `token: jwt_token` (admin only)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "phone_number": "0123456789",
      "role": "customer",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

## 📖 Book Management Endpoints

### 1. Get All Books
```http
GET /api/books
```

**Query Parameters (Optional):**
- `category`: Filter by category ID
- `search`: Search in title/author
- `limit`: Number of results (default: 50)
- `offset`: Pagination offset

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Learning JavaScript",
      "isbn": "9781234567897",
      "description": "A comprehensive guide to modern JavaScript development",
      "price": "19.99",
      "stock_quantity": 10,
      "image_url": "https://example.com/image.jpg",
      "averageRating": "4.5",
      "totalReviews": "25",
      "Author": {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe"
      },
      "Category": {
        "id": 1,
        "category_name": "Programming"
      }
    }
  ]
}
```

### 2. Get Book by ID
```http
GET /api/books/:id
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Learning JavaScript",
    "isbn": "9781234567897",
    "description": "A comprehensive guide to modern JavaScript development covering ES6+, async programming, DOM manipulation, and modern frameworks.",
    "price": "19.99",
    "stock_quantity": 10,
    "image_url": "https://example.com/image.jpg",
    "Author": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe"
    },
    "Category": {
      "id": 1,
      "category_name": "Programming"
    },
    "rating": "4.5",
    "totalReviews": 25,
    "ratingDistribution": [
      {
        "rating": 5,
        "total": 15,
        "percentage": 60
      },
      {
        "rating": 4,
        "total": 8,
        "percentage": 32
      },
      {
        "rating": 3,
        "total": 2,
        "percentage": 8
      }
    ]
  }
}
```

### 3. Create Book 🔒👑
```http
POST /api/books
```

**Headers:** `token: jwt_token` (admin only)

**Request Body:**
```json
{
  "title": "Advanced React Patterns",
  "isbn": "9781234567890",
  "description": "Master advanced React patterns and techniques",
  "price": 29.99,
  "stock_quantity": 50,
  "image_url": "https://example.com/react-book.jpg",
  "author_id": 1,
  "category_id": 1
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 2,
    "title": "Advanced React Patterns",
    "isbn": "9781234567890",
    "description": "Master advanced React patterns and techniques",
    "price": "29.99",
    "stock_quantity": 50,
    "image_url": "https://example.com/react-book.jpg",
    "author_id": 1,
    "category_id": 1
  }
}
```

### 4. Update Book 🔒👑
```http
PUT /api/books/:id
```

**Headers:** `token: jwt_token` (admin only)

**Request Body:**
```json
{
  "title": "Advanced React Patterns (2nd Edition)",
  "price": 34.99,
  "stock_quantity": 75
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Book updated successfully"
}
```

### 5. Delete Book 🔒👑
```http
DELETE /api/books/:id
```

**Headers:** `token: jwt_token` (admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

### 6. Get All Categories
```http
GET /api/books/categories
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "category_name": "Programming",
      "description": "Books about coding and software development"
    },
    {
      "id": 2,
      "category_name": "Data Science",
      "description": "Books about data analysis and machine learning"
    }
  ]
}
```

### 7. Get All Authors
```http
GET /api/books/authors
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "biography": "Experienced software developer and author"
    },
    {
      "id": 2,
      "first_name": "Jane",
      "last_name": "Smith",
      "biography": "Data scientist and AI researcher"
    }
  ]
}
```

### 8. Get Number of Books
```http
GET /api/books/number
```

**Response (200):**
```json
{
  "success": true,
  "data": 50
}
```

---

## 🛒 Order Management Endpoints

### 1. Place Order (Cash Payment) 🔒
```http
POST /api/orders/place-order
```

**Headers:** `token: jwt_token`

**Request Body:**
```json
{
  "items": {
    "1": 2,
    "2": 1
  },
  "totalAmount": 65.97,
  "village_id": 123
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "orderId": 1
}
```

### 2. Place Order (Stripe Payment) 🔒
```http
POST /api/orders/place-order-stripe
```

**Headers:** `token: jwt_token`

**Request Body:**
```json
{
  "items": {
    "1": 2,
    "2": 1
  },
  "amount": 65.97,
  "village_id": 123
}
```

**Response (200):**
```json
{
  "success": true,
  "session_url": "https://checkout.stripe.com/pay/cs_test_123...",
  "orderId": 1
}
```

### 3. Verify Stripe Payment 🔒
```http
POST /api/orders/verify-payment?orderId=123&success=true
```

**Headers:** `token: jwt_token`

**Response (200):**
```json
{
  "success": true,
  "message": "Payment verified successfully"
}
```

### 4. Get Order History 🔒
```http
GET /api/orders/history
```

**Headers:** `token: jwt_token`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "order_id": "ORD-001",
      "date": "2024-01-15T10:30:00.000Z",
      "order_status": "pending",
      "total": "65.97",
      "payment_status": false,
      "payment_method": "cash",
      "items": [
        {
          "title": "Learning JavaScript",
          "author": "John Doe",
          "price": "19.99",
          "quantity": 2,
          "image_url": "https://example.com/image.jpg"
        },
        {
          "title": "React Fundamentals",
          "author": "Jane Smith",
          "price": "25.99",
          "quantity": 1,
          "image_url": "https://example.com/react.jpg"
        }
      ]
    }
  ]
}
```

### 5. Get All Orders 🔒👑
```http
GET /api/orders
```

**Headers:** `token: jwt_token` (admin only)

**Query Parameters (Optional):**
- `status`: Filter by order status
- `payment_method`: Filter by payment method
- `limit`: Number of results
- `offset`: Pagination offset

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "order_id": "ORD-001",
      "user_id": 1,
      "order_status": "pending",
      "total_amount": "65.97",
      "payment_status": false,
      "payment_method": "cash",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "User": {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com"
      }
    }
  ]
}
```

### 6. Update Order Status 🔒👑
```http
PUT /api/orders/:id/status
```

**Headers:** `token: jwt_token` (admin only)

**Request Body:**
```json
{
  "status": "shipped"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Order status updated successfully"
}
```

### 7. Get Number of Orders
```http
GET /api/orders/number
```

**Response (200):**
```json
{
  "success": true,
  "data": 75
}
```

---

## ⭐ Review Management Endpoints

### 1. Add Review 🔒
```http
POST /api/reviews
```

**Headers:** `token: jwt_token`

**Request Body:**
```json
{
  "book_id": 1,
  "rating": 5,
  "comment": "Excellent book for learning JavaScript! Highly recommended."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Review added successfully",
  "data": {
    "id": 1,
    "book_id": 1,
    "user_id": 1,
    "rating": 5,
    "comment": "Excellent book for learning JavaScript! Highly recommended.",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Get Reviews by Book
```http
GET /api/reviews/:bookId
```

**Query Parameters (Optional):**
- `limit`: Number of reviews (default: 20)
- `offset`: Pagination offset

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "rating": 5,
      "comment": "Excellent book for learning JavaScript!",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "User": {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe"
      }
    },
    {
      "id": 2,
      "rating": 4,
      "comment": "Good book, well structured content.",
      "createdAt": "2024-01-14T15:20:00.000Z",
      "User": {
        "id": 2,
        "first_name": "Jane",
        "last_name": "Smith"
      }
    }
  ]
}
```

### 3. Get User's Reviews 🔒
```http
GET /api/reviews/my-reviews
```

**Headers:** `token: jwt_token`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "rating": 5,
      "comment": "Great book!",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "Book": {
        "id": 1,
        "title": "Learning JavaScript",
        "image_url": "https://example.com/image.jpg",
        "Author": {
          "first_name": "John",
          "last_name": "Doe"
        }
      }
    }
  ]
}
```

### 4. Update Review 🔒
```http
PUT /api/reviews/:id
```

**Headers:** `token: jwt_token`

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Updated review: Still a good book!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Review updated successfully"
}
```

### 5. Delete Review 🔒
```http
DELETE /api/reviews/:id
```

**Headers:** `token: jwt_token`

**Response (200):**
```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

### 6. Get Rating Distribution
```http
GET /api/reviews/:bookId/rating-distribution
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "rating": 5,
      "count": 15,
      "percentage": 60
    },
    {
      "rating": 4,
      "count": 8,
      "percentage": 32
    },
    {
      "rating": 3,
      "count": 2,
      "percentage": 8
    }
  ]
}
```

---

## 📍 Address Management Endpoints

### 1. Get User Address 🔒
```http
GET /api/address/user
```

**Headers:** `token: jwt_token`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "village_id": 123,
    "Village": {
      "id": 123,
      "village_name": "Boeung Keng Kang 1",
      "Commune": {
        "id": 45,
        "commune_name": "Boeung Keng Kang",
        "District": {
          "id": 12,
          "district_name": "Chamkar Mon",
          "Province": {
            "id": 1,
            "province_name": "Phnom Penh"
          }
        }
      }
    }
  }
}
```

### 2. Update User Address 🔒
```http
PUT /api/address/user
```

**Headers:** `token: jwt_token`

**Request Body:**
```json
{
  "village_id": 456
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Address updated successfully"
}
```

### 3. Get Provinces
```http
GET /api/address/provinces
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "province_name": "Phnom Penh"
    },
    {
      "id": 2,
      "province_name": "Siem Reap"
    },
    {
      "id": 3,
      "province_name": "Battambang"
    }
  ]
}
```

### 4. Get Districts
```http
GET /api/address/districts?province_id=1
```

**Query Parameters:**
- `province_id` (required): Province ID

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "district_name": "Chamkar Mon",
      "province_id": 1
    },
    {
      "id": 2,
      "district_name": "Daun Penh",
      "province_id": 1
    }
  ]
}
```

### 5. Get Communes
```http
GET /api/address/communes?district_id=1
```

**Query Parameters:**
- `district_id` (required): District ID

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "commune_name": "Boeung Keng Kang",
      "district_id": 1
    },
    {
      "id": 2,
      "commune_name": "Tonle Bassac",
      "district_id": 1
    }
  ]
}
```

### 6. Get Villages
```http
GET /api/address/villages?commune_id=1
```

**Query Parameters:**
- `commune_id` (required): Commune ID

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "village_name": "Boeung Keng Kang 1",
      "commune_id": 1
    },
    {
      "id": 2,
      "village_name": "Boeung Keng Kang 2",
      "commune_id": 1
    }
  ]
}
```

---

## 📊 Analytics Endpoints 🔒👑

### 1. Get Dashboard Statistics
```http
GET /api/analytics/dashboard
```

**Headers:** `token: jwt_token` (admin only)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalBooks": 75,
    "totalOrders": 230,
    "totalRevenue": "15749.50",
    "monthlyOrders": [
      { "month": "Jan", "orders": 45 },
      { "month": "Feb", "orders": 52 }
    ],
    "topSellingBooks": [
      {
        "id": 1,
        "title": "Learning JavaScript",
        "totalSold": 89
      }
    ]
  }
}
```

### 2. Get Sales Report
```http
GET /api/analytics/sales?period=monthly
```

**Headers:** `token: jwt_token` (admin only)

**Query Parameters:**
- `period`: daily, weekly, monthly, yearly

**Response (200):**
```json
{
  "success": true,
  "data": {
    "period": "monthly",
    "totalRevenue": "15749.50",
    "totalOrders": 230,
    "averageOrderValue": "68.48",
    "breakdown": [
      {
        "date": "2024-01",
        "revenue": "7842.30",
        "orders": 115
      }
    ]
  }
}
```

---

## 🔒 Authentication & Authorization

### Roles & Permissions

The API implements role-based access control:

- **Superadmin (role_id: 1)**: Full system access
- **Customer (role_id: 2)**: Standard user access

### Protected Routes

Routes marked with **🔒** require authentication token.
Routes marked with **👑** require specific permissions.

### Error Responses

**Authentication Error (401):**
```json
{
  "success": false,
  "message": "No token provided"
}
```

**Authorization Error (403):**
```json
{
  "success": false,
  "message": "Permission Access Denied"
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "All fields are required"
}
```

**Not Found Error (404):**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Detailed error message"
}
```

---

## 📊 Database Schema

### Key Models

- **User**: Customer information and authentication
- **Book**: Book catalog with details
- **Author**: Book authors
- **Category**: Book categories
- **Review**: User reviews and ratings
- **Order**: Purchase orders
- **CartItem**: Items in orders
- **Role**: User roles
- **Permission**: System permissions
- **Address Hierarchy**: Province → District → Commune → Village

---

## 🧪 Testing

Use tools like Postman, Insomnia, or cURL to test the API endpoints. Make sure to:

1. Register a user first
2. Login to get the JWT token
3. Include the token in protected route headers
4. Test with valid and invalid data

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Passwords are hashed using bcrypt
- JWT tokens expire based on server configuration
- Stock quantities are validated before order processing
- Stripe integration requires proper webhook setup for production

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the ISC License.
