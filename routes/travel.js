const express = require('express');
const router = express.Router();
const Travel = require('../models/Travel');

// Search flights (mock data)
router.get('/flights/search', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    
    const mockFlights = [
      {
        airline: 'IndiGo',
        flightNumber: '6E-123',
        from,
        to,
        departureTime: '06:00 AM',
        arrivalTime: '08:30 AM',
        duration: '2h 30m',
        price: 4500,
        class: 'Economy'
      },
      {
        airline: 'Air India',
        flightNumber: 'AI-456',
        from,
        to,
        departureTime: '10:00 AM',
        arrivalTime: '12:45 PM',
        duration: '2h 45m',
        price: 5200,
        class: 'Economy'
      },
      {
        airline: 'SpiceJet',
        flightNumber: 'SG-789',
        from,
        to,
        departureTime: '02:00 PM',
        arrivalTime: '04:20 PM',
        duration: '2h 20m',
        price: 4200,
        class: 'Economy'
      }
    ];
    
    res.json({ flights: mockFlights });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search hotels (mock data)
router.get('/hotels/search', async (req, res) => {
  try {
    const { location, checkIn, checkOut } = req.query;
    
    const mockHotels = [
      {
        name: 'Taj Hotel',
        location,
        rating: 4.5,
        price: 8000,
        amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'],
        image: 'https://via.placeholder.com/300x200'
      },
      {
        name: 'Oberoi Grand',
        location,
        rating: 4.8,
        price: 12000,
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar'],
        image: 'https://via.placeholder.com/300x200'
      },
      {
        name: 'Lemon Tree Hotel',
        location,
        rating: 4.0,
        price: 5000,
        amenities: ['WiFi', 'Restaurant', 'Parking'],
        image: 'https://via.placeholder.com/300x200'
      }
    ];
    
    res.json({ hotels: mockHotels });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Book travel
router.post('/book', async (req, res) => {
  try {
    const { userId, bookingType, details, amount } = req.body;
    
    const bookingNumber = bookingType.toUpperCase() + Date.now();
    
    const booking = new Travel({
      user: userId,
      bookingType,
      bookingNumber,
      amount,
      paymentStatus: 'completed',
      ...(bookingType === 'flight' && { flightDetails: details }),
      ...(bookingType === 'hotel' && { hotelDetails: details })
    });
    
    await booking.save();
    
    res.status(201).json({
      message: 'Booking confirmed',
      booking
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user bookings
router.get('/bookings/:userId', async (req, res) => {
  try {
    const bookings = await Travel.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json({ bookings, count: bookings.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;