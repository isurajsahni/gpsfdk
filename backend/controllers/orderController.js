const Order = require('../models/Order');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const { generateOrderId } = require('../utils/orderId');

// @route   POST /api/orders (create order after payment success — or create pending then confirm)
exports.createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, couponCode } = req.body;
    if (!items?.length || !shippingAddress) {
      return res.status(400).json({ success: false, message: 'Items and shipping address required' });
    }

    let subtotal = 0;
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(400).json({ success: false, message: `Product not found: ${item.productId}` });
      const variation = product.variations?.find(
        (v) =>
          v.material === item.material && v.frame === item.frame && v.size === item.size
      );
      if (!variation || variation.price === undefined) {
        return res.status(400).json({ success: false, message: 'Invalid variation' });
      }
      const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
      const price = variation.price;
      subtotal += price * qty;
      const firstImage = product.images && product.images[0];
      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: qty,
        price,
        variation: { material: variation.material, frame: variation.frame, size: variation.size },
        image: firstImage,
      });
    }

    let discount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        isActive: true,
        $or: [{ validFrom: { $lte: new Date() } }, { validFrom: null }],
        $or: [{ validTo: { $gte: new Date() } }, { validTo: null }],
      });
      if (coupon) {
        const usedOk = !coupon.usageLimit || coupon.usedCount < coupon.usageLimit;
        const minOk = coupon.minOrderAmount <= subtotal;
        if (usedOk && minOk) {
          if (coupon.type === 'percent') {
            discount = Math.min((subtotal * coupon.value) / 100, coupon.maxDiscount || subtotal);
          } else {
            discount = Math.min(coupon.value, subtotal);
          }
        }
      }
    }

    const shippingCharge = subtotal >= 999 ? 0 : 99; // free above 999
    const total = Math.max(0, subtotal - discount + shippingCharge);

    const order = await Order.create({
      user: req.user?.id,
      orderId: generateOrderId(),
      items: orderItems,
      shippingAddress: {
        name: shippingAddress.name,
        phone: shippingAddress.phone,
        addressLine1: shippingAddress.addressLine1,
        addressLine2: shippingAddress.addressLine2 || '',
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
      },
      subtotal,
      shippingCharge,
      discount,
      total,
      status: 'pending',
      paymentStatus: 'pending',
      coupon: couponCode || undefined,
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// @route   GET /api/orders/:id (user: own order; admin: any)
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product', 'name images');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    const isAdmin = req.user?.role === 'admin';
    if (!isAdmin && order.user?.toString() !== req.user?.id?.toString()) {
      return res.status(403).json({ success: false, message: 'Not allowed' });
    }
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// ——————— ADMIN ———————

// @route   GET /api/orders/admin/list
exports.adminGetOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = status ? { status } : {};
    const skip = (Math.max(1, parseInt(page, 10)) - 1) * (parseInt(limit, 10) || 20);
    const limitNum = parseInt(limit, 10) || 20;
    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).populate('user', 'name email'),
      Order.countDocuments(query),
    ]);
    res.json({ success: true, orders, total, page: parseInt(page, 10), pages: Math.ceil(total / limitNum) });
  } catch (err) {
    next(err);
  }
};

// @route   PUT /api/orders/:id/status
exports.adminUpdateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name email');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};
