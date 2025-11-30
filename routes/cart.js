const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// In-memory cart (for demo - use Redis or DB in production)
const carts = new Map();

// Get cart
router.get('/:userId', async (req, res) => {
  try {
    const cart = carts.get(req.params.userId) || { items: [], total: 0 };
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add to cart
router.post('/:userId/add', async (req, res) => {
  try {
    const { productId, name, price, quantity, image } = req.body;
    const userId = req.params.userId;
    
    let cart = carts.get(userId) || { items: [], total: 0 };
    
    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, quantity, image });
    }
    
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    carts.set(userId, cart);
    
    res.json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from cart
router.delete('/:userId/remove/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    let cart = carts.get(userId) || { items: [], total: 0 };
    
    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    carts.set(userId, cart);
    
    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear cart
router.delete('/:userId/clear', async (req, res) => {
  try {
    carts.delete(req.params.userId);
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;