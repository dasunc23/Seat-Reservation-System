const express = require('express');
const router = express.Router();
const { 
  createReservation, 
  getUserReservations, 
  cancelReservation 
} = require('../controller/reservationController');
const { protect, internOnly } = require('../middleware/auth');

router.post('/', protect, internOnly, createReservation);
router.get('/my', protect, internOnly, getUserReservations);
router.patch('/:id/cancel', protect, internOnly, cancelReservation);

module.exports = router;