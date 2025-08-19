const mongoose = require('mongoose');
const { startOfDay, endOfDay } = require('date-fns');

const reservationSchema = new mongoose.Schema({
  intern: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  seat: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Seat', 
    required: true 
  },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ['active', 'cancelled'],
    default: 'active'
  }
}, { timestamps: true });

// Prevent duplicate reservations per intern per day
reservationSchema.index({ intern: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Reservation', reservationSchema);