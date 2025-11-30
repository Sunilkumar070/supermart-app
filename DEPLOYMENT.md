# 🚀 SuperMart Deployment Guide

## Quick Deploy to Railway (Recommended)

### Step 1: Deploy Backend

1. **Go to Railway**: https://railway.app
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose**: `Sunilkumar070/supermart-app`
5. **Railway will auto-detect** the Node.js app

### Step 2: Add MongoDB Database

1. In your Railway project, click **"+ New"**
2. Select **"Database" → "Add MongoDB"**
3. Railway will automatically create a MongoDB instance
4. Copy the `MONGO_URL` from the MongoDB service

### Step 3: Configure Environment Variables

In your Railway project settings, add these variables:

```
MONGODB_URI=<paste_your_mongodb_url_here>
JWT_SECRET=supermart_secret_key_2024
PORT=5000
NODE_ENV=production
```

### Step 4: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Your API will be live at: `https://your-app.railway.app`

---

## Alternative: Deploy to Other Platforms

### Render.com

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repo: `Sunilkumar070/supermart-app`
4. Add environment variables
5. Deploy

### Heroku

```bash
heroku create supermart-app
heroku addons:create mongolab
git push heroku main
```

### DigitalOcean App Platform

1. Go to DigitalOcean
2. Create new App
3. Connect GitHub repo
4. Add MongoDB database
5. Deploy

---

## Testing Your Deployment

Once deployed, test your API:

```bash
# Health check
curl https://your-app.railway.app/

# Register user
curl -X POST https://your-app.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"9876543210","password":"password123"}'
```

---

## Next Steps

### 1. Add Sample Products

Use MongoDB Compass or the MongoDB shell to add sample products:

```javascript
db.products.insertMany([
  {
    name: "iPhone 15 Pro",
    description: "Latest Apple smartphone",
    price: 129900,
    mrp: 134900,
    discount: 5,
    category: "electronics",
    brand: "Apple",
    stock: 50,
    isQuickCommerce: false,
    deliveryTime: "2-3 days",
    isActive: true
  },
  {
    name: "Fresh Milk 1L",
    description: "Farm fresh full cream milk",
    price: 60,
    mrp: 65,
    discount: 8,
    category: "grocery",
    brand: "Amul",
    stock: 200,
    isQuickCommerce: true,
    deliveryTime: "10 minutes",
    isActive: true
  }
])
```

### 2. Build Frontend

Create a frontend using:
- **React/Next.js** for web
- **React Native** for mobile
- **Flutter** for cross-platform

Connect to your deployed API endpoint.

### 3. Add Payment Gateway

1. Sign up at https://razorpay.com
2. Get API keys
3. Add to environment variables
4. Uncomment Razorpay code in `routes/payments.js`

---

## Monitoring

Railway provides:
- ✅ Automatic logs
- ✅ Metrics dashboard
- ✅ Deployment history
- ✅ Auto-scaling

Access logs: Railway Dashboard → Your Project → Logs

---

## Troubleshooting

### Build Failed?
- Check Node.js version (requires >=18)
- Verify package.json syntax
- Check Railway logs

### Database Connection Error?
- Verify MONGODB_URI is correct
- Check MongoDB service is running
- Whitelist Railway IPs in MongoDB Atlas

### API Not Responding?
- Check if service is running in Railway dashboard
- Verify PORT environment variable
- Check application logs

---

## Support

Need help? 
- Check Railway docs: https://docs.railway.app
- MongoDB docs: https://docs.mongodb.com
- Open GitHub issue: https://github.com/Sunilkumar070/supermart-app/issues

---

**Your SuperMart backend is ready to power your super app! 🎉**