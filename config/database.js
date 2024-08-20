const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/hrms';

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
