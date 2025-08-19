const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['available', 'unavailable'], 
    default: 'available' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Seat', seatSchema);