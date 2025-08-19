const Seat = require('../models/seat');
const Reservation = require('../models/reservayion');
const { startOfDay, endOfDay } = require('date-fns');

// @desc    Get all seats
// @route   GET /api/seats
const getSeats = async (req, res) => {
  try {
    const seats = await Seat.find({}).sort({ seatNumber: 1 });
    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get available seats for a date
// @route   GET /api/seats/availability
const getAvailableSeats = async (req, res) => {
  try {
    const { date } = req.query;
    const selectedDate = new Date(date);
    
    // Get all seats
    const allSeats = await Seat.find({});
    
    // Get reservations for the date
    const reservations = await Reservation.find({
      date: {
        $gte: startOfDay(selectedDate),
        $lte: endOfDay(selectedDate)
      },
      status: 'active'
    }).populate('seat');
    
    // Map reserved seat IDs
    const reservedSeatIds = reservations.map(r => r.seat._id.toString());
    
    // Mark seat availability
    const seatsWithAvailability = allSeats.map(seat => ({
      ...seat.toObject(),
      status: reservedSeatIds.includes(seat._id.toString()) ? 'unavailable' : seat.status
    }));
    
    res.json(seatsWithAvailability);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getSeats, getAvailableSeats };