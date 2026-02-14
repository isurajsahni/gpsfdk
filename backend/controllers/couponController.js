const Coupon = require('../models/Coupon');

// @route   POST /api/coupons/validate (public or user)
exports.validate = async (req, res, next) => {
  try {
    const { code, subtotal } = req.body;
    if (!code?.trim()) {
      return res.status(400).json({ success: false, message: 'Code required' });
    }
    const now = new Date();
    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
      isActive: true,
      $and: [
        { $or: [{ validFrom: { $lte: now } }, { validFrom: null }] },
        { $or: [{ validTo: { $gte: now } }, { validTo: null }] },
      ],
    });
    if (!coupon) {
      return res.json({ success: false, message: 'Invalid or expired coupon' });
    }
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.json({ success: false, message: 'Coupon usage limit reached' });
    }
    const orderAmount = Math.max(0, parseFloat(subtotal) || 0);
    if (coupon.minOrderAmount > orderAmount) {
      return res.json({
        success: false,
        message: `Minimum order amount is ₹${coupon.minOrderAmount}`,
      });
    }
    let discount = 0;
    if (coupon.type === 'percent') {
      discount = Math.min((orderAmount * coupon.value) / 100, coupon.maxDiscount || orderAmount);
    } else {
      discount = Math.min(coupon.value, orderAmount);
    }
    res.json({
      success: true,
      discount: Math.round(discount),
      type: coupon.type,
      value: coupon.value,
    });
  } catch (err) {
    next(err);
  }
};

// ——————— ADMIN ———————

// @route   GET /api/coupons/admin/list
exports.adminList = async (req, res, next) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.json({ success: true, coupons });
  } catch (err) {
    next(err);
  }
};

// @route   POST /api/coupons/admin
exports.adminCreate = async (req, res, next) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ success: true, coupon });
  } catch (err) {
    next(err);
  }
};

// @route   PUT /api/coupons/admin/:id
exports.adminUpdate = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!coupon) return res.status(404).json({ success: false, message: 'Coupon not found' });
    res.json({ success: true, coupon });
  } catch (err) {
    next(err);
  }
};

// @route   DELETE /api/coupons/admin/:id
exports.adminDelete = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return res.status(404).json({ success: false, message: 'Coupon not found' });
    res.json({ success: true, message: 'Coupon deleted' });
  } catch (err) {
    next(err);
  }
};
