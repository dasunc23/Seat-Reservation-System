const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Add bcrypt for password hashing
const User = require('./models/user');
require('dotenv').config();

const connectDB = require('./config/db');

const createAdmin = async () => {
  try {
    // Set default MongoDB URI if not provided
    if (!process.env.MONGO_URI) {
      process.env.MONGO_URI = 'mongodb://localhost:27017/seatReservation';
      console.log('Using default MongoDB URI:', process.env.MONGO_URI);
    }
    
    // Set default JWT_SECRET if not provided
    if (!process.env.JWT_SECRET) {
      process.env.JWT_SECRET = 'your_jwt_secret_key_here_change_in_production';
      console.log('Using default JWT_SECRET');
    }
    
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@office.com' });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('Email: admin@office.com');
      console.log('Password: admin123');
      console.log('Role: admin');
      
      // Verify password for existing admin
      const isValid = await bcrypt.compare('admin123', existingAdmin.password);
      console.log('Password verification:', isValid ? '✅ Success' : '❌ Failed');
      
      return process.exit(0);
    }

    // Create admin user (password will be automatically hashed by the pre-save hook)
    const adminUser = new User({
      name: 'System Admin',
      email: 'admin@office.com',
      password: 'admin123', // Plain password - will be hashed by pre-save hook
      role: 'admin'
    });
    
    await adminUser.save();
    
    // After saving, verify the password
    const createdAdmin = await User.findOne({ email: 'admin@office.com' });
    console.log('Created admin:', createdAdmin);

    // Verify password
    const isValid = await bcrypt.compare('admin123', createdAdmin.password);
    console.log('Password verification:', isValid ? '✅ Success' : '❌ Failed');
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@office.com');
    console.log('🔑 Password: admin123');
    console.log('👑 Role: admin');
    console.log('');
    console.log('🚀 You can now login as admin and add seats!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();