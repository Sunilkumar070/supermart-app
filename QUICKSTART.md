# ⚡ SuperMart Quick Start Guide

Get your SuperMart app running in **5 minutes**!

## 🎯 What You're Building

**SuperMart** - A complete super-app with:
- 🛒 E-commerce marketplace
- ⚡ 10-minute quick commerce
- ✈️ Travel booking (flights & hotels)
- 💰 Digital wallet & payments

---

## 🚀 Deploy to Railway (Easiest Method)

### Step 1: Open Railway
Go to: **https://railway.app/new**

### Step 2: Deploy from GitHub
1. Click **"Deploy from GitHub repo"**
2. Search for: **`Sunilkumar070/supermart-app`**
3. Click **"Deploy Now"**

### Step 3: Add MongoDB
1. In your project, click **"+ New"**
2. Select **"Database" → "MongoDB"**
3. Railway creates it automatically

### Step 4: Configure Environment
1. Click on your **supermart-app service**
2. Go to **"Variables"** tab
3. Click **"+ New Variable"**
4. Add these:

```
MONGODB_URI = mongodb://mongo:27017/supermart
JWT_SECRET = supermart_secret_2024
PORT = 5000
NODE_ENV = production
```

**Important:** For `MONGODB_URI`, use the connection string from your MongoDB service in Railway.

### Step 5: Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your API is live! 🎉

---

## 🧪 Test Your API

### Get Your URL
In Railway dashboard, find your app URL: `https://your-app.railway.app`

### Test Health Check
```bash
curl https://your-app.railway.app/
```

You should see:
```json
{
  "message": "SuperMart API is running",
  "version": "1.0.0",
  "services": {
    "ecommerce": "active",
    "quickCommerce": "active",
    "travel": "active",
    "fintech": "active"
  }
}
```

### Register a User
```bash
curl -X POST https://your-app.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "password": "password123"
  }'
```

---

## 📊 Add Sample Products

### Option 1: Use MongoDB Compass
1. Download MongoDB Compass
2. Connect using your Railway MongoDB URL
3. Select `supermart` database
4. Import sample products from `seeders/products.js`

### Option 2: Run Seeder Script
```bash
# Clone repo locally
git clone https://github.com/Sunilkumar070/supermart-app.git
cd supermart-app

# Install dependencies
npm install

# Set MongoDB URL in .env
echo "MONGODB_URI=your_railway_mongodb_url" > .env

# Run seeder
node seeders/products.js
```

---

## 🎨 Build Frontend

Now that your backend is live, build a frontend:

### React/Next.js Example
```javascript
// config.js
export const API_URL = 'https://your-app.railway.app';

// Register user
const register = async (userData) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Get products
const getProducts = async () => {
  const response = await fetch(`${API_URL}/api/products`);
  return response.json();
};
```

### React Native Example
```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://your-app.railway.app/api'
});

// Login
const login = async (email, password) => {
  const { data } = await API.post('/auth/login', { email, password });
  return data;
};

// Get cart
const getCart = async (userId) => {
  const { data } = await API.get(`/cart/${userId}`);
  return data;
};
```

---

## 📱 Import Postman Collection

1. Open Postman
2. Click **"Import"**
3. Upload `postman_collection.json` from the repo
4. Update `baseUrl` variable with your Railway URL
5. Start testing all APIs!

---

## 🔧 Common Issues

### MongoDB Connection Failed?
- Check if MongoDB service is running in Railway
- Verify `MONGODB_URI` is correct
- Make sure it starts with `mongodb://`

### API Not Responding?
- Check Railway logs for errors
- Verify all environment variables are set
- Ensure PORT is set to 5000

### Build Failed?
- Check Node.js version (requires >=18)
- Verify package.json is valid
- Check Railway build logs

---

## 📚 Next Steps

1. ✅ **API is live** - Backend deployed
2. 📊 **Add products** - Use seeder or MongoDB Compass
3. 🎨 **Build frontend** - React/React Native/Flutter
4. 💳 **Add Razorpay** - Integrate real payments
5. 📱 **Launch app** - Deploy to App Store/Play Store

---

## 🆘 Need Help?

- 📖 Read [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- 🚀 Check [DEPLOYMENT.md](./DEPLOYMENT.md)
- 💬 Open GitHub issue
- 📧 Contact support

---

## 🎉 Congratulations!

Your SuperMart backend is **LIVE** and ready to power your super-app!

**Your API URL:** `https://your-app.railway.app`

Now go build an amazing frontend! 🚀

---

**Built with ❤️ using Bhindi**