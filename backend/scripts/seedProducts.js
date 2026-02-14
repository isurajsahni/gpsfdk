/**
 * Run: node scripts/seedProducts.js
 * Seeds or updates demo products using images from frontend/public/product/
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const sampleProducts = require('./demoProductsData');

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Set MONGODB_URI in backend/.env');
    process.exit(1);
  }
  await mongoose.connect(uri);
  for (const p of sampleProducts) {
    const existing = await Product.findOne({ slug: p.slug });
    if (existing) {
      await Product.updateOne({ slug: p.slug }, { $set: p });
      console.log('Updated:', p.slug);
    } else {
      await Product.create(p);
      console.log('Created:', p.slug);
    }
  }
  console.log('Demo products done. Images use /product/* from frontend public folder.');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
