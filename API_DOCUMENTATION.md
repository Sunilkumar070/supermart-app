# 📚 SuperMart API Documentation

Base URL: `https://your-app.railway.app`

## 🔐 Authentication

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## 🛒 Products

### Get All Products
```http
GET /api/products?category=electronics&search=iphone&minPrice=10000&maxPrice=200000&isQuickCommerce=true&sort=price_low
```

**Query Parameters:**
- `category`: Filter by category (electronics, fashion, grocery, home, beauty, sports, books, toys)
- `search`: Search by product name
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `isQuickCommerce`: Filter quick commerce products (true/false)
- `sort`: Sort by (price_low, price_high, rating, newest)

**Response:**
```json
{
  "products": [...],
  "count": 25
}
```

### Get Product by ID
```http
GET /api/products/:id
```

### Get Categories
```http
GET /api/products/meta/categories
```

---

## 🛍️ Shopping Cart

### Get Cart
```http
GET /api/cart/:userId
```

### Add to Cart
```http
POST /api/cart/:userId/add
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439011",
  "name": "iPhone 15 Pro",
  "price": 129900,
  "quantity": 1,
  "image": "https://example.com/image.jpg"
}
```

### Remove from Cart
```http
DELETE /api/cart/:userId/remove/:productId
```

### Clear Cart
```http
DELETE /api/cart/:userId/clear
```

---

## 📦 Orders

### Create Order
```http
POST /api/orders/create
Content-Type: application/json

{
  "userId": "507f1f77bcf86cd799439011",
  "items": [
    {
      "product": "507f1f77bcf86cd799439012",
      "name": "iPhone 15 Pro",
      "price": 129900,
      "quantity": 1,
      "image": "https://example.com/image.jpg"
    }
  ],
  "totalAmount": 129900,
  "paymentMethod": "wallet",
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "isQuickCommerce": false
}
```

**Payment Methods:** `wallet`, `upi`, `card`, `cod`

### Get User Orders
```http
GET /api/orders/user/:userId
```

### Get Order Details
```http
GET /api/orders/:orderId
```

### Update Order Status
```http
PATCH /api/orders/:orderId/status
Content-Type: application/json

{
  "status": "shipped",
  "message": "Order shipped via Blue Dart"
}
```

**Order Statuses:** `placed`, `confirmed`, `packed`, `shipped`, `out_for_delivery`, `delivered`, `cancelled`

---

## 💰 Wallet

### Get Wallet Balance
```http
GET /api/wallet/:userId
```

**Response:**
```json
{
  "balance": 5000,
  "transactions": [
    {
      "type": "credit",
      "amount": 1000,
      "description": "Money added to wallet",
      "date": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Add Money
```http
POST /api/wallet/:userId/add
Content-Type: application/json

{
  "amount": 1000,
  "description": "Added via UPI"
}
```

### Deduct Money
```http
POST /api/wallet/:userId/deduct
Content-Type: application/json

{
  "amount": 500,
  "description": "Payment for order #ORD123"
}
```

---

## ✈️ Travel

### Search Flights
```http
GET /api/travel/flights/search?from=Mumbai&to=Delhi&date=2024-02-15
```

**Response:**
```json
{
  "flights": [
    {
      "airline": "IndiGo",
      "flightNumber": "6E-123",
      "from": "Mumbai",
      "to": "Delhi",
      "departureTime": "06:00 AM",
      "arrivalTime": "08:30 AM",
      "duration": "2h 30m",
      "price": 4500,
      "class": "Economy"
    }
  ]
}
```

### Search Hotels
```http
GET /api/travel/hotels/search?location=Goa&checkIn=2024-02-15&checkOut=2024-02-18
```

### Book Travel
```http
POST /api/travel/book
Content-Type: application/json

{
  "userId": "507f1f77bcf86cd799439011",
  "bookingType": "flight",
  "details": {
    "airline": "IndiGo",
    "flightNumber": "6E-123",
    "from": "Mumbai",
    "to": "Delhi",
    "departureDate": "2024-02-15T06:00:00Z",
    "class": "Economy",
    "passengers": 2
  },
  "amount": 9000
}
```

**Booking Types:** `flight`, `hotel`, `package`

### Get User Bookings
```http
GET /api/travel/bookings/:userId
```

---

## 💳 Payments

### Create Payment Order
```http
POST /api/payments/create-order
Content-Type: application/json

{
  "amount": 1000,
  "currency": "INR"
}
```

### Verify Payment
```http
POST /api/payments/verify
Content-Type: application/json

{
  "orderId": "order_123",
  "paymentId": "pay_456",
  "signature": "signature_789"
}
```

---

## 🚚 Delivery

### Check Delivery Availability
```http
POST /api/delivery/check-availability
Content-Type: application/json

{
  "pincode": "110001"
}
```

**Response:**
```json
{
  "pincode": "110001",
  "quickCommerceAvailable": true,
  "standardDeliveryAvailable": true,
  "estimatedDelivery": "10 minutes"
}
```

### Track Delivery
```http
GET /api/delivery/track/:orderId
```

**Response:**
```json
{
  "orderId": "ORD123",
  "status": "out_for_delivery",
  "currentLocation": "Near delivery address",
  "estimatedArrival": "5 minutes",
  "deliveryPartner": {
    "name": "Rajesh Kumar",
    "phone": "+91-9876543210",
    "vehicle": "Bike"
  }
}
```

---

## 🔍 Error Responses

All endpoints return standard error responses:

```json
{
  "error": "Error message description"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## 📝 Notes

1. **Authentication**: Most endpoints require JWT token in Authorization header: `Bearer <token>`
2. **Rate Limiting**: Currently no rate limiting (add in production)
3. **Pagination**: Not implemented yet (add for large datasets)
4. **File Uploads**: Not implemented (add for product images, profile pictures)

---

## 🧪 Testing with cURL

```bash
# Register
curl -X POST https://your-app.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"9876543210","password":"test123"}'

# Get Products
curl https://your-app.railway.app/api/products?category=electronics

# Add to Cart
curl -X POST https://your-app.railway.app/api/cart/USER_ID/add \
  -H "Content-Type: application/json" \
  -d '{"productId":"PRODUCT_ID","name":"iPhone","price":129900,"quantity":1}'
```

---

**Happy Coding! 🚀**