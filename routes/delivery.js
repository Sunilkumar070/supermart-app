const express = require('express');
const router = express.Router();

// Check delivery availability
router.post('/check-availability', async (req, res) => {
  try {
    const { pincode } = req.body;
    
    // Mock quick commerce availability
    const quickCommerceZones = ['110001', '400001', '560001', '700001', '600001'];
    const isQuickCommerceAvailable = quickCommerceZones.includes(pincode);
    
    res.json({
      pincode,
      quickCommerceAvailable: isQuickCommerceAvailable,
      standardDeliveryAvailable: true,
      estimatedDelivery: isQuickCommerceAvailable ? '10 minutes' : '2-3 days'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Track delivery
router.get('/track/:orderId', async (req, res) => {
  try {
    // Mock tracking data
    const tracking = {
      orderId: req.params.orderId,
      status: 'out_for_delivery',
      currentLocation: 'Near delivery address',
      estimatedArrival: '5 minutes',
      deliveryPartner: {
        name: 'Rajesh Kumar',
        phone: '+91-9876543210',
        vehicle: 'Bike'
      }
    };
    
    res.json(tracking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;