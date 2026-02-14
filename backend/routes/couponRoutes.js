const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/validate', couponController.validate);

router.get('/admin/list', protect, adminOnly, couponController.adminList);
router.post('/admin', protect, adminOnly, couponController.adminCreate);
router.put('/admin/:id', protect, adminOnly, couponController.adminUpdate);
router.delete('/admin/:id', protect, adminOnly, couponController.adminDelete);

module.exports = router;
