const express = require('express');
const router = express.Router();
const { getSeats, getAvailableSeats } = require('../controller/seatController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getSeats);
router.get('/availability', protect, getAvailableSeats);

module.exports = router;