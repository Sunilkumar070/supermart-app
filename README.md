# SuperMart - All-in-One Super App

SuperMart is a comprehensive platform combining E-commerce, Quick Commerce, Travel Booking, and Fintech services - all in one app!

## 🚀 Features

### 🛒 E-Commerce
- Product catalog with multiple categories
- Advanced search and filters
- Shopping cart management
- Order tracking
- Product reviews and ratings

### ⚡ Quick Commerce
- 10-minute delivery in select zones
- Real-time inventory tracking
- Hyperlocal fulfillment
- Live delivery tracking

### ✈️ Travel Booking
- Flight search and booking
- Hotel reservations
- Package deals
- Booking management

### 💰 Fintech/Wallet
- Digital wallet
- UPI payments
- Transaction history
- Cashback and rewards

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payments**: Razorpay (ready to integrate)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Sunilkumar070/supermart-app.git
cd supermart-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the server:
```bash
npm start
```

## 🚀 Deployment to Railway

### One-Click Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/Sunilkumar070/supermart-app)

### Manual Deployment

1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose `Sunilkumar070/supermart-app`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `RAZORPAY_KEY_ID`: Your Razorpay key (optional)
   - `RAZORPAY_KEY_SECRET`: Your Razorpay secret (optional)
6. Click "Deploy"

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/meta/categories` - Get all categories

### Cart
- `GET /api/cart/:userId` - Get user cart
- `POST /api/cart/:userId/add` - Add item to cart
- `DELETE /api/cart/:userId/remove/:productId` - Remove item
- `DELETE /api/cart/:userId/clear` - Clear cart

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:orderId` - Get order details
- `PATCH /api/orders/:orderId/status` - Update order status

### Wallet
- `GET /api/wallet/:userId` - Get wallet balance
- `POST /api/wallet/:userId/add` - Add money
- `POST /api/wallet/:userId/deduct` - Deduct money

### Travel
- `GET /api/travel/flights/search` - Search flights
- `GET /api/travel/hotels/search` - Search hotels
- `POST /api/travel/book` - Book travel
- `GET /api/travel/bookings/:userId` - Get user bookings

### Delivery
- `POST /api/delivery/check-availability` - Check delivery availability
- `GET /api/delivery/track/:orderId` - Track delivery

## 🔧 Configuration

### MongoDB Setup
1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add it to `.env` as `MONGODB_URI`

### Razorpay Setup (Optional)
1. Sign up at [Razorpay](https://razorpay.com)
2. Get your API keys
3. Add them to `.env`

## 📱 Frontend Integration

This backend is ready to integrate with any frontend:
- React/Next.js
- React Native
- Flutter
- Vue.js

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ by SuperMart Team