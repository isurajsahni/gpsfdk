const mongoose = require('mongoose');

// Variation: material, frame, size, price, stock
const variationSchema = new mongoose.Schema({
  material: { type: String, required: true, trim: true },
  frame: { type: String, required: true, trim: true },
  size: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true, lowercase: true },
    description: { type: String, trim: true },
    category: {
      type: String,
      enum: ['wall-canvas', 'house-nameplates', 'watch-buy'],
      required: true,
    },
    // Image paths (front first, then back — sort in utils when needed)
    images: [{ type: String, trim: true }],
    variations: [variationSchema],
    isVisible: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ category: 1, isVisible: 1 });

module.exports = mongoose.model('Product', productSchema);
