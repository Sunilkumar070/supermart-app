const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  // Electronics
  {
    name: "iPhone 15 Pro Max",
    description: "Latest Apple flagship with A17 Pro chip, titanium design, and advanced camera system",
    price: 159900,
    mrp: 164900,
    discount: 3,
    category: "electronics",
    subcategory: "smartphones",
    brand: "Apple",
    stock: 25,
    isQuickCommerce: false,
    deliveryTime: "2-3 days",
    ratings: { average: 4.8, count: 1250 },
    isActive: true
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium Android phone with S Pen, 200MP camera, and AI features",
    price: 129999,
    mrp: 139999,
    discount: 7,
    category: "electronics",
    subcategory: "smartphones",
    brand: "Samsung",
    stock: 30,
    isQuickCommerce: false,
    deliveryTime: "2-3 days",
    ratings: { average: 4.7, count: 980 },
    isActive: true
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise cancellation wireless headphones",
    price: 29990,
    mrp: 34990,
    discount: 14,
    category: "electronics",
    subcategory: "audio",
    brand: "Sony",
    stock: 50,
    isQuickCommerce: true,
    deliveryTime: "10 minutes",
    ratings: { average: 4.9, count: 2100 },
    isActive: true
  },
  
  // Grocery - Quick Commerce
  {
    name: "Amul Fresh Milk 1L",
    description: "Farm fresh full cream milk, rich in calcium and protein",
    price: 62,
    mrp: 65,
    discount: 5,
    category: "grocery",
    subcategory: "dairy",
    brand: "Amul",
    stock: 500,
    isQuickCommerce: true,
    deliveryTime: "10 minutes",
    ratings: { average: 4.5, count: 5600 },
    isActive: true
  },
  {
    name: "Britannia Bread 400g",
    description: "Soft and fresh white bread, perfect for breakfast",
    price: 40,
    mrp: 45,
    discount: 11,
    category: "grocery",
    subcategory: "bakery",
    brand: "Britannia",
    stock: 300,
    isQuickCommerce: true,
    deliveryTime: "10 minutes",
    ratings: { average: 4.3, count: 3200 },
    isActive: true
  },
  {
    name: "Maggi Noodles 12 Pack",
    description: "India's favorite 2-minute noodles, masala flavor",
    price: 144,
    mrp: 156,
    discount: 8,
    category: "grocery",
    subcategory: "instant food",
    brand: "Maggi",
    stock: 400,
    isQuickCommerce: true,
    deliveryTime: "10 minutes",
    ratings: { average: 4.6, count: 8900 },
    isActive: true
  },
  
  // Fashion
  {
    name: "Levi's 511 Slim Fit Jeans",
    description: "Classic slim fit jeans in dark blue wash",
    price: 2999,
    mrp: 4999,
    discount: 40,
    category: "fashion",
    subcategory: "men's clothing",
    brand: "Levi's",
    stock: 100,
    isQuickCommerce: false,
    deliveryTime: "2-3 days",
    ratings: { average: 4.4, count: 1560 },
    isActive: true
  },
  {
    name: "Nike Air Max Sneakers",
    description: "Comfortable running shoes with air cushioning",
    price: 7995,
    mrp: 9995,
    discount: 20,
    category: "fashion",
    subcategory: "footwear",
    brand: "Nike",
    stock: 75,
    isQuickCommerce: false,
    deliveryTime: "2-3 days",
    ratings: { average: 4.7, count: 2340 },
    isActive: true
  },
  
  // Home & Kitchen
  {
    name: "Prestige Induction Cooktop",
    description: "1600W induction cooktop with automatic shut-off",
    price: 2499,
    mrp: 3999,
    discount: 38,
    category: "home",
    subcategory: "kitchen appliances",
    brand: "Prestige",
    stock: 40,
    isQuickCommerce: false,
    deliveryTime: "2-3 days",
    ratings: { average: 4.2, count: 890 },
    isActive: true
  },
  {
    name: "Milton Water Bottle 1L",
    description: "Insulated steel water bottle, keeps water cold for 24 hours",
    price: 599,
    mrp: 899,
    discount: 33,
    category: "home",
    subcategory: "kitchen accessories",
    brand: "Milton",
    stock: 200,
    isQuickCommerce: true,
    deliveryTime: "10 minutes",
    ratings: { average: 4.5, count: 4500 },
    isActive: true
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/supermart');
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${sampleProducts.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();