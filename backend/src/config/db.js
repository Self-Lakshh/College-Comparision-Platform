import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('✗ MONGO_URI is not defined in .env');
    process.exit(1);
  }

  const options = {
    // Limits concurrent connections; Atlas M0 allows 500, we cap at 10 to be safe
    maxPoolSize: 10,
    // Fail fast if Atlas unreachable, don't hang the process
    serverSelectionTimeoutMS: 5000,
    // Kill sockets idle longer than 45s
    socketTimeoutMS: 45000,
    // Force IPv4, avoids DNS resolution bugs on certain EC2 AMIs
    family: 4,
  };

  try {
    const conn = await mongoose.connect(uri, options);
    console.log(`✓ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`✗ MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }

  // Listen to mongoose.connection events
  mongoose.connection.on('disconnected', () => {
    console.warn('⚠ MongoDB disconnected (Atlas M0 sleeps after 60min inactivity)');
  });

  mongoose.connection.on('reconnected', () => {
    console.info('✓ MongoDB reconnected');
  });

  mongoose.connection.on('error', (err) => {
    console.error(`✗ MongoDB error: ${err.message}`);
    process.exit(1);
  });
};

export default connectDB;
