const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/create', protect, adminOnly, shippingController.createShipment);
router.get('/track/:orderId', shippingController.trackOrder);

module.exports = router;
