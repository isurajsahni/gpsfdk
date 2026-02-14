/**
 * Run: node scripts/seedAdmin.js
 * Creates an admin user if none exists. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env or below.
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gpsfdk.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123';

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  const existing = await User.findOne({ role: 'admin' });
  if (existing) {
    console.log('Admin already exists:', existing.email);
    process.exit(0);
    return;
  }
  await User.create({
    name: 'Admin',
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: 'admin',
  });
  console.log('Admin created:', ADMIN_EMAIL);
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
