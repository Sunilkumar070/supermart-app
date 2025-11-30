const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  mrp: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['electronics', 'fashion', 'grocery', 'home', 'beauty', 'sports', 'books', 'toys']
  },
  subcategory: String,
  brand: String,
  images: [String],
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  isQuickCommerce: {
    type: Boolean,
    default: false
  },
  deliveryTime: {
    type: String,
    default: '2-3 days'
  },
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  specifications: mongoose.Schema.Types.Mixed,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);