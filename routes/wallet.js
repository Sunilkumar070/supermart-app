const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get wallet balance
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ 
      balance: user.wallet.balance,
      transactions: user.wallet.transactions.slice(-10).reverse()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add money to wallet
router.post('/:userId/add', async (req, res) => {
  try {
    const { amount, description } = req.body;
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.wallet.balance += amount;
    user.wallet.transactions.push({
      type: 'credit',
      amount,
      description: description || 'Money added to wallet'
    });
    
    await user.save();
    res.json({ 
      message: 'Money added successfully',
      balance: user.wallet.balance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deduct from wallet
router.post('/:userId/deduct', async (req, res) => {
  try {
    const { amount, description } = req.body;
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (user.wallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    
    user.wallet.balance -= amount;
    user.wallet.transactions.push({
      type: 'debit',
      amount,
      description: description || 'Payment made'
    });
    
    await user.save();
    res.json({ 
      message: 'Payment successful',
      balance: user.wallet.balance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;