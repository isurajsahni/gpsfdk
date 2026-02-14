const User = require('../models/User');
const Address = require('../models/Address');
const Order = require('../models/Order');

// @route   PUT /api/users/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const fields = {};
    if (name !== undefined) fields.name = name.trim();
    if (phone !== undefined) fields.phone = phone?.trim();
    const user = await User.findByIdAndUpdate(req.user.id, fields, { new: true });
    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone } });
  } catch (err) {
    next(err);
  }
};

// @route   GET /api/users/addresses
exports.getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ user: req.user.id }).sort({ isDefault: -1, createdAt: -1 });
    res.json({ success: true, addresses });
  } catch (err) {
    next(err);
  }
};

// @route   POST /api/users/addresses
exports.addAddress = async (req, res, next) => {
  try {
    const { label, name, phone, addressLine1, addressLine2, city, state, pincode, isDefault } = req.body;
    if (!name || !phone || !addressLine1 || !city || !state || !pincode) {
      return res.status(400).json({ success: false, message: 'Required: name, phone, addressLine1, city, state, pincode' });
    }
    const address = await Address.create({
      user: req.user.id,
      label: label || 'Home',
      name,
      phone,
      addressLine1,
      addressLine2: addressLine2 || '',
      city,
      state,
      pincode,
      isDefault: !!isDefault,
    });
    res.status(201).json({ success: true, address });
  } catch (err) {
    next(err);
  }
};

// @route   PUT /api/users/addresses/:id
exports.updateAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({ _id: req.params.id, user: req.user.id });
    if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
    const { label, name, phone, addressLine1, addressLine2, city, state, pincode, isDefault } = req.body;
    if (label !== undefined) address.label = label;
    if (name !== undefined) address.name = name;
    if (phone !== undefined) address.phone = phone;
    if (addressLine1 !== undefined) address.addressLine1 = addressLine1;
    if (addressLine2 !== undefined) address.addressLine2 = addressLine2;
    if (city !== undefined) address.city = city;
    if (state !== undefined) address.state = state;
    if (pincode !== undefined) address.pincode = pincode;
    if (isDefault !== undefined) address.isDefault = !!isDefault;
    await address.save();
    res.json({ success: true, address });
  } catch (err) {
    next(err);
  }
};

// @route   DELETE /api/users/addresses/:id
exports.deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
    res.json({ success: true, message: 'Address deleted' });
  } catch (err) {
    next(err);
  }
};

// @route   GET /api/users/orders
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name images');
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

// @route   GET /api/users/orders/:id
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id }).populate('items.product', 'name images');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};
