# 🏗️ SuperMart Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        SUPERMART                             │
│          E-commerce + Quick Commerce + Travel + Fintech      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  • Web App (React/Next.js)                                   │
│  • Mobile App (React Native/Flutter)                         │
│  • Admin Dashboard                                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ REST API
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND LAYER                           │
│                   (Node.js + Express)                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Auth Service │  │ Product Svc  │  │ Order Svc    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Wallet Svc   │  │ Travel Svc   │  │ Delivery Svc │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  • MongoDB (Primary Database)                                │
│    - Users Collection                                        │
│    - Products Collection                                     │
│    - Orders Collection                                       │
│    - Travel Bookings Collection                              │
│  • Redis (Cache - Optional)                                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                          │
├─────────────────────────────────────────────────────────────┤
│  • Razorpay (Payments)                                       │
│  • SMS Gateway (OTP)                                         │
│  • Email Service (Notifications)                             │
│  • Maps API (Delivery Tracking)                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Module Architecture

### 1. E-Commerce Module
```
Products → Cart → Checkout → Payment → Order → Delivery
```

**Features:**
- Product catalog with categories
- Search & filters
- Shopping cart
- Multiple payment methods
- Order tracking
- Reviews & ratings

### 2. Quick Commerce Module
```
Location Check → Quick Products → Express Checkout → 10-min Delivery
```

**Features:**
- Location-based inventory
- Hyperlocal fulfillment
- Real-time tracking
- 10-minute delivery zones

### 3. Travel Module
```
Search (Flights/Hotels) → Select → Book → Payment → Confirmation
```

**Features:**
- Flight search & booking
- Hotel reservations
- Package deals
- Booking management

### 4. Fintech Module
```
Wallet → Add Money → Transactions → Payments → History
```

**Features:**
- Digital wallet
- UPI payments
- Transaction history
- Cashback & rewards

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String (unique),
  password: String (hashed),
  wallet: {
    balance: Number,
    transactions: [{
      type: 'credit' | 'debit',
      amount: Number,
      description: String,
      date: Date
    }]
  },
  addresses: [{
    type: 'home' | 'work' | 'other',
    street: String,
    city: String,
    state: String,
    pincode: String,
    isDefault: Boolean
  }],
  orders: [ObjectId],
  createdAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  mrp: Number,
  discount: Number,
  category: String,
  subcategory: String,
  brand: String,
  images: [String],
  stock: Number,
  isQuickCommerce: Boolean,
  deliveryTime: String,
  ratings: {
    average: Number,
    count: Number
  },
  reviews: [{
    user: ObjectId,
    rating: Number,
    comment: String,
    date: Date
  }],
  isActive: Boolean,
  createdAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId,
  orderNumber: String (unique),
  items: [{
    product: ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  totalAmount: Number,
  discount: Number,
  deliveryCharges: Number,
  finalAmount: Number,
  paymentMethod: 'wallet' | 'upi' | 'card' | 'cod',
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded',
  orderStatus: 'placed' | 'confirmed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled',
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  isQuickCommerce: Boolean,
  estimatedDelivery: Date,
  deliveredAt: Date,
  tracking: [{
    status: String,
    message: String,
    timestamp: Date
  }],
  createdAt: Date
}
```

### Travel Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId,
  bookingType: 'flight' | 'hotel' | 'package',
  bookingNumber: String (unique),
  flightDetails: {
    airline: String,
    flightNumber: String,
    from: String,
    to: String,
    departureDate: Date,
    returnDate: Date,
    class: String,
    passengers: Number
  },
  hotelDetails: {
    name: String,
    location: String,
    checkIn: Date,
    checkOut: Date,
    rooms: Number,
    guests: Number,
    roomType: String
  },
  amount: Number,
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded',
  bookingStatus: 'confirmed' | 'cancelled' | 'completed',
  createdAt: Date
}
```

---

## 🔐 Security Features

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Token expiration (30 days)
- Secure password requirements

### API Security
- Helmet.js for HTTP headers
- CORS configuration
- Input validation
- Rate limiting (to be added)

### Data Security
- Encrypted passwords
- Secure environment variables
- HTTPS only in production
- MongoDB connection encryption

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         RAILWAY                              │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │   SuperMart Backend  │  │   MongoDB Database   │        │
│  │   (Node.js App)      │◄─┤   (Managed Service)  │        │
│  │   Port: 5000         │  │   Port: 27017        │        │
│  └──────────────────────┘  └──────────────────────┘        │
│           │                                                  │
│           │ HTTPS                                            │
│           ▼                                                  │
│  ┌──────────────────────┐                                   │
│  │   Public URL         │                                   │
│  │   your-app.railway   │                                   │
│  └──────────────────────┘                                   │
└─────────────────────────────────────────────────────────────┘
                    │
                    ▼ API Calls
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND APPS                             │
├─────────────────────────────────────────────────────────────┤
│  • Web (Vercel/Netlify)                                      │
│  • Mobile (App Store/Play Store)                             │
│  • Admin Dashboard                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 API Flow Examples

### User Registration Flow
```
1. User submits registration form
2. Backend validates input
3. Password is hashed
4. User saved to MongoDB
5. JWT token generated
6. Token returned to client
7. Client stores token
8. Subsequent requests use token
```

### Order Creation Flow
```
1. User adds items to cart
2. User proceeds to checkout
3. Delivery address selected
4. Payment method chosen
5. Order created in database
6. Payment processed
7. Inventory updated
8. Order confirmation sent
9. Delivery partner assigned
10. Real-time tracking enabled
```

### Quick Commerce Flow
```
1. User location detected
2. Check quick commerce availability
3. Show nearby products
4. User places order
5. Nearest warehouse assigned
6. Delivery partner dispatched
7. Real-time tracking
8. Delivery in 10 minutes
```

---

## 🔄 Future Enhancements

### Phase 2
- [ ] Real-time notifications (WebSocket)
- [ ] Advanced search (Elasticsearch)
- [ ] Recommendation engine
- [ ] Admin dashboard
- [ ] Analytics & reporting

### Phase 3
- [ ] Multi-vendor support
- [ ] Subscription services
- [ ] Loyalty program
- [ ] Referral system
- [ ] Social features

### Phase 4
- [ ] AI-powered recommendations
- [ ] Voice ordering
- [ ] AR product preview
- [ ] Blockchain payments
- [ ] International expansion

---

## 📈 Scalability Considerations

### Current Setup (MVP)
- Single server deployment
- MongoDB single instance
- Handles ~1000 concurrent users

### Scale to 10K Users
- Load balancer
- Multiple app instances
- MongoDB replica set
- Redis caching
- CDN for static assets

### Scale to 100K+ Users
- Microservices architecture
- Kubernetes orchestration
- MongoDB sharding
- Message queue (RabbitMQ/Kafka)
- Separate services for each module

---

**This architecture is production-ready and can scale from MVP to millions of users!** 🚀