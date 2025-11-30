const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

// Create order
router.post('/create', async (req, res) => {
  try {
    const { userId, items, totalAmount, paymentMethod, deliveryAddress, isQuickCommerce } = req.body;
    
    const orderNumber = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
    
    const deliveryCharges = isQuickCommerce ? 0 : (totalAmount > 500 ? 0 : 40);
    const finalAmount = totalAmount + deliveryCharges;
    
    const estimatedDelivery = new Date();
    if (isQuickCommerce) {
      estimatedDelivery.setMinutes(estimatedDelivery.getMinutes() + 10);
    } else {
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
    }
    
    const order = new Order({
      user: userId,
      orderNumber,
      items,
      totalAmount,
      deliveryCharges,
      finalAmount,
      paymentMethod,
      deliveryAddress,
      isQuickCommerce,
      estimatedDelivery,
      paymentStatus: 'completed',
      tracking: [{
        status: 'placed',
        message: 'Order placed successfully'
      }]
    });
    
    await order.save();
    
    await User.findByIdAndUpdate(userId, {
      $push: { orders: order._id }
    });
    
    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('items.product');
    res.json({ orders, count: orders.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('items.product');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
router.patch('/:orderId/status', async (req, res) => {
  try {
    const { status, message } = req.body;
    const order = await Order.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    order.orderStatus = status;
    order.tracking.push({
      status,
      message: message || `Order ${status}`
    });
    
    if (status === 'delivered') {
      order.deliveredAt = new Date();
    }
    
    await order.save();
    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;