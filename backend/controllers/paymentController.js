const crypto = require('crypto');
const Order = require('../models/Order');
const Coupon = require('../models/Coupon');

// Razorpay (preferred for India)
function getRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  const Razorpay = require('razorpay');
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

// @route   POST /api/payment/create-order
// Body: { amount (in INR), orderId (our Order._id), receipt optional }
exports.createPaymentOrder = async (req, res, next) => {
  try {
    const { amount, orderId, receipt } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.paymentStatus === 'paid') {
      return res.status(400).json({ success: false, message: 'Order already paid' });
    }
    const amountPaise = Math.round((amount || order.total) * 100); // Razorpay uses paise
    if (amountPaise < 100) return res.status(400).json({ success: false, message: 'Amount too low' });

    const razorpay = getRazorpayInstance();
    if (!razorpay) {
      return res.status(503).json({ success: false, message: 'Payment not configured' });
    }

    const options = {
      amount: amountPaise,
      currency: 'INR',
      receipt: receipt || order.orderId || order._id.toString(),
      notes: { orderId: order._id.toString() },
    };
    const razorpayOrder = await razorpay.orders.create(options);
    await Order.updateOne(
      { _id: orderId },
      { paymentId: razorpayOrder.id }
    );
    res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    next(err);
  }
};

// @route   POST /api/payment/verify
// Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId }
exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return res.status(400).json({ success: false, message: 'Missing payment details' });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: 'paid',
        transactionId: razorpay_payment_id,
        status: 'confirmed',
      },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (order.coupon) {
      await Coupon.updateOne(
        { code: order.coupon.toUpperCase() },
        { $inc: { usedCount: 1 } }
      );
    }

    res.json({ success: true, order, message: 'Payment verified' });
  } catch (err) {
    next(err);
  }
};
