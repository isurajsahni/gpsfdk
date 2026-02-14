// Validate required env vars in production
const required = ['MONGODB_URI', 'JWT_SECRET'];
if (process.env.NODE_ENV === 'production') {
  for (const key of required) {
    if (!process.env[key]) {
      console.error(`Missing required env: ${key}`);
      process.exit(1);
    }
  }
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-me',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || '',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || '',
  SHIPROCKET_EMAIL: process.env.SHIPROCKET_EMAIL || '',
  SHIPROCKET_PASSWORD: process.env.SHIPROCKET_PASSWORD || '',
};
