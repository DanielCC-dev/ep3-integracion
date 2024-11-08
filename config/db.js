const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/authAPI');
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    process.exit(1); // Finaliza el proceso en caso de error
  }
};

module.exports = connectDB;
