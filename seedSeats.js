const mongoose = require('mongoose');
const Seat = require('./models/seat');
require('dotenv').config();

const connectDB = require('./config/db');

const sampleSeats = [
  { seatNumber: 'A1', location: 'Front Office', status: 'available' },
  { seatNumber: 'A2', location: 'Front Office', status: 'available' },
  { seatNumber: 'A3', location: 'Front Office', status: 'available' },
  { seatNumber: 'A4', location: 'Front Office', status: 'available' },
  { seatNumber: 'A5', location: 'Front Office', status: 'available' },
  { seatNumber: 'B1', location: 'Back Office', status: 'available' },
  { seatNumber: 'B2', location: 'Back Office', status: 'available' },
  { seatNumber: 'B3', location: 'Back Office', status: 'available' },
  { seatNumber: 'B4', location: 'Back Office', status: 'available' },
  { seatNumber: 'B5', location: 'Back Office', status: 'available' },
  { seatNumber: 'C1', location: 'Conference Area', status: 'available' },
  { seatNumber: 'C2', location: 'Conference Area', status: 'available' },
  { seatNumber: 'C3', location: 'Conference Area', status: 'available' },
  { seatNumber: 'C4', location: 'Conference Area', status: 'available' },
  { seatNumber: 'C5', location: 'Conference Area', status: 'available' },
];

const seedSeats = async () => {
  try {
    await connectDB();
    
    // Clear existing seats
    await Seat.deleteMany({});
    
    // Insert sample seats
    await Seat.insertMany(sampleSeats);
    
    console.log('✅ Sample seats added successfully!');
    console.log(`📊 Added ${sampleSeats.length} seats to the database`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding seats:', error);
    process.exit(1);
  }
};

seedSeats(); 