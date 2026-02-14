const Order = require('../models/Order');
const axios = require('axios');

// Shiprocket: login and create order
async function shiprocketLogin() {
  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;
  if (!email || !password) return null;
  const { data } = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
    email,
    password,
  });
  return data?.token || null;
}

async function createShiprocketOrder(token, order, orderDoc) {
  const address = order.shippingAddress || orderDoc.shippingAddress;
  if (!address?.pincode || !address?.addressLine1 || !address?.city || !address?.state) {
    throw new Error('Incomplete shipping address');
  }
  const payload = {
    order_id: orderDoc.orderId,
    order_date: new Date().toISOString().split('T')[0],
    channel_id: '',
    billing_customer_name: address.name,
    billing_last_name: '',
    billing_address: address.addressLine1 + (address.addressLine2 ? ', ' + address.addressLine2 : ''),
    billing_address_2: '',
    billing_city: address.city,
    billing_state: address.state,
    billing_pincode: address.pincode,
    billing_country: 'India',
    billing_email: orderDoc.user?.email || 'customer@gpsfdk.com',
    billing_phone: address.phone,
    shipping_is_billing: true,
    shipping_customer_name: address.name,
    shipping_last_name: '',
    shipping_address: address.addressLine1 + (address.addressLine2 ? ', ' + address.addressLine2 : ''),
    shipping_address_2: '',
    shipping_city: address.city,
    shipping_state: address.state,
    shipping_pincode: address.pincode,
    shipping_country: 'India',
    shipping_phone: address.phone,
    order_items: orderDoc.items.map((item) => ({
      name: item.name,
      sku: item.product?.toString() || 'SKU',
      units: item.quantity,
      selling_price: item.price,
    })),
    payment_method: 'Prepaid',
    sub_total: orderDoc.subtotal,
    length: 10,
    breadth: 10,
    height: 5,
    weight: 0.5,
    pickup_location: 'primary',
  };

  const { data } = await axios.post(
    'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
    payload,
    { headers: { Authorization: 'Bearer ' + token } }
  );
  return data;
}

// @route   POST /api/shipping/create
// Body: { orderId }
exports.createShipment = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const orderDoc = await Order.findById(orderId).populate('user', 'email');
    if (!orderDoc) return res.status(404).json({ success: false, message: 'Order not found' });
    if (orderDoc.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Order is cancelled' });
    }
    if (orderDoc.shiprocketOrderId) {
      return res.json({ success: true, message: 'Shipment already created', order: orderDoc });
    }

    const token = await shiprocketLogin();
    if (!token) {
      return res.status(503).json({ success: false, message: 'Shipping not configured' });
    }

    const result = await createShiprocketOrder(token, req.body, orderDoc);
    const shipmentId = result?.order_id;
    const tracking = result?.shipment_id
      ? await getTrackingByShipmentId(token, result.shipment_id)
      : null;

    orderDoc.shiprocketOrderId = shipmentId || result?.id;
    if (tracking?.tracking_data?.tracking_number) {
      orderDoc.trackingId = tracking.tracking_data.tracking_number;
      orderDoc.trackingUrl = tracking.tracking_data.tracking_url || null;
    }
    orderDoc.status = 'shipped';
    await orderDoc.save();

    res.json({
      success: true,
      order: orderDoc,
      shipment: result,
      trackingId: orderDoc.trackingId,
      trackingUrl: orderDoc.trackingUrl,
    });
  } catch (err) {
    next(err);
  }
};

async function getTrackingByShipmentId(token, shipmentId) {
  try {
    const { data } = await axios.get(
      `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipmentId}`,
      { headers: { Authorization: 'Bearer ' + token } }
    );
    return data;
  } catch (e) {
    return null;
  }
}

// @route   GET /api/shipping/track/:orderId
exports.trackOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      $or: [{ _id: req.params.orderId }, { orderId: req.params.orderId }],
    }).select('trackingId trackingUrl status');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({
      success: true,
      trackingId: order.trackingId,
      trackingUrl: order.trackingUrl,
      status: order.status,
    });
  } catch (err) {
    next(err);
  }
};
