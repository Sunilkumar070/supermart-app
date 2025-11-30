const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingType: {
    type: String,
    enum: ['flight', 'hotel', 'package'],
    required: true
  },
  bookingNumber: {
    type: String,
    unique: true,
    required: true
  },
  flightDetails: {
    airline: String,
    flightNumber: String,
    from: String,
    to: String,
    departureDate: Date,
    returnDate: Date,
    class: String,
    passengers: Number
  },
  hotelDetails: {
    name: String,
    location: String,
    checkIn: Date,
    checkOut: Date,
    rooms: Number,
    guests: Number,
    roomType: String
  },
  amount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  bookingStatus: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Travel', travelSchema);