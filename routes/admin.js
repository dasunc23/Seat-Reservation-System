const express = require('express');
const router = express.Router();
const { 
  getUtilizationReport,
  getAllReservations
} = require('../controller/reportController');
const Seat = require('../models/seat');
const Reservation = require('../models/reservayion');
const { protect, adminOnly } = require('../middleware/auth');

// Seat Management
router.get('/seats', protect, adminOnly, async (req, res) => {
  try {
    const seats = await Seat.find({}).sort({ seatNumber: 1 });
    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/seats', protect, adminOnly, async (req, res) => {
  try {
    const { seatNumber, location } = req.body;
    
    const seat = new Seat({ seatNumber, location });
    await seat.save();
    
    res.status(201).json(seat);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Seat number must be unique' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/seats/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status, location } = req.body;
    const seat = await Seat.findById(req.params.id);
    
    if (!seat) {
      return res.status(404).json({ error: 'Seat not found' });
    }
    
    if (status) seat.status = status;
    if (location) seat.location = location;
    
    await seat.save();
    res.json(seat);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/seats/:id', protect, adminOnly, async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    
    if (!seat) {
      return res.status(404).json({ error: 'Seat not found' });
    }
    
    // Check if seat has active reservations
    const activeReservations = await Reservation.find({
      seat: seat._id,
      status: 'active'
    });
    
    if (activeReservations.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete seat with active reservations' 
      });
    }
    
    await seat.deleteOne();
    res.json({ message: 'Seat removed' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Reports
router.get('/reports/utilization', protect, adminOnly, getUtilizationReport);
router.get('/reservations', protect, adminOnly, getAllReservations);

module.exports = router;