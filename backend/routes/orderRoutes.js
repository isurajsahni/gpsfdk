const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');
const { optionalAuth } = require('../middleware/optionalAuth');

// Create order (guest or logged-in; optionalAuth attaches user if token present)
router.post('/', optionalAuth, orderController.createOrder);

// User: get own order
router.get('/:id', protect, orderController.getOrder);

// Admin
router.get('/admin/list', protect, adminOnly, orderController.adminGetOrders);
router.put('/:id/status', protect, adminOnly, orderController.adminUpdateOrderStatus);

module.exports = router;
