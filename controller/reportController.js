const Reservation = require('../models/reservayion');
const Seat = require('../models/seat');
const { startOfDay, endOfDay, eachDayOfInterval, format } = require('date-fns');

// @desc    Get seat utilization report
// @route   GET /api/admin/reports/utilization
const getUtilizationReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Get all seats
    const seats = await Seat.find({});
    const totalSeats = seats.length;
    
    // Get all reservations in date range
    const reservations = await Reservation.find({
      date: { $gte: start, $lte: end },
      status: 'active'
    });
    
    // Calculate daily utilization
    const dateRange = eachDayOfInterval({ start, end });
    
    const report = dateRange.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const dailyReservations = reservations.filter(r => 
        r.date.toDateString() === date.toDateString()
      );
      
      return {
        date: dateStr,
        totalSeats,
        reservedSeats: dailyReservations.length,
        utilization: (dailyReservations.length / totalSeats) * 100
      };
    });
    
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get all reservations (admin)
// @route   GET /api/admin/reservations
const getAllReservations = async (req, res) => {
  try {
    const { date } = req.query;
    
    let query = {};
    
    if (date) {
      const selectedDate = new Date(date);
      query.date = {
        $gte: startOfDay(selectedDate),
        $lte: endOfDay(selectedDate)
      };
    }
    
    const reservations = await Reservation.find(query)
      .populate('intern', 'name email')
      .populate('seat', 'seatNumber location')
      .sort({ date: -1 });
    
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getUtilizationReport, getAllReservations };