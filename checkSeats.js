const mongoose = require('mongoose');
const Seat = require('./models/seat');
require('dotenv').config();

const connectDB = require('./config/db');

const checkSeats = async () => {
  try {
    await connectDB();
    
    const seats = await Seat.find({});
    console.log('📊 Total seats in database:', seats.length);
    
    if (seats.length === 0) {
      console.log('❌ No seats found! Running seed script...');
      const seedSeats = require('./seedSeats');
      await seedSeats();
    } else {
      console.log('✅ Seats found:');
      seats.forEach(seat => {
        console.log(`  - ${seat.seatNumber} (${seat.location}) - ${seat.status}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking seats:', error);
    process.exit(1);
  }
};

checkSeats(); 