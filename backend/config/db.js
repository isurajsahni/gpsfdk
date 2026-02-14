const mongoose = require('mongoose');

const connectDB = async () => {
  let uri = process.env.MONGODB_URI;
  const isDev = process.env.NODE_ENV !== 'production';

  if (!uri || typeof uri !== 'string') {
    if (isDev) {
      console.log('MONGODB_URI not set. Starting in-memory MongoDB for development...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const memServer = await MongoMemoryServer.create();
      uri = memServer.getUri();
    } else {
      console.error('MONGODB_URI must be set in .env');
      process.exit(1);
    }
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    if (isDev && (err.message.includes('ECONNREFUSED') || err.message.includes('MongoServerSelectionError'))) {
      console.log('Local MongoDB not running. Starting in-memory MongoDB for development...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const memServer = await MongoMemoryServer.create();
      uri = memServer.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB connected (in-memory): ${conn.connection.host}`);
      return;
    }
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
