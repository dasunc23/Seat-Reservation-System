const Reservation = require('../models/reservayion');
const Seat = require('../models/seat');
const User = require('../models/user');
const { startOfDay, endOfDay, addHours } = require('date-fns');

// @desc    Create a new reservation
// @route   POST /api/reservations
const createReservation = async (req, res) => {
  try {
    const { seatId, date } = req.body;
    const userId = req.user._id;

    // Validate booking time (1 hour in advance)
    const minBookingTime = addHours(new Date(), 1);
    const bookingDate = new Date(date);
    
    if (bookingDate < minBookingTime) {
      return res.status(400).json({ error: 'Must book at least 1 hour in advance' });
    }

    // Check for existing reservation for this user on this date
    const existingReservation = await Reservation.findOne({
      intern: userId,
      date: { 
        $gte: startOfDay(bookingDate),
        $lte: endOfDay(bookingDate)
      },
      status: 'active'
    });

    if (existingReservation) {
      return res.status(400).json({ error: 'You can only reserve one seat per day' });
    }

    // Check seat availability
    const seat = await Seat.findById(seatId);
    if (!seat || seat.status !== 'available') {
      return res.status(400).json({ error: 'Seat not available' });
    }

    // Create reservation
    const reservation = new Reservation({
      intern: userId,
      seat: seatId,
      date: bookingDate,
      status: 'active'
    });

    await reservation.save();
    
    // Populate seat details in response
    const populatedReservation = await Reservation.findById(reservation._id)
      .populate('seat', 'seatNumber location');
    
    res.status(201).json(populatedReservation);
    
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'You already have a reservation for this date' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get user's reservations
// @route   GET /api/reservations/my
const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ intern: req.user._id })
      .populate('seat', 'seatNumber location')
      .sort({ date: -1 });
      
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Cancel a reservation
// @route   PATCH /api/reservations/:id/cancel
const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    
    // Ensure user owns the reservation
    if (reservation.intern.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    
    // Can't cancel past reservations
    if (new Date(reservation.date) < new Date()) {
      return res.status(400).json({ error: 'Cannot cancel past reservations' });
    }
    
    reservation.status = 'cancelled';
    await reservation.save();
    
    res.json({ message: 'Reservation cancelled' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createReservation, getUserReservations, cancelReservation };