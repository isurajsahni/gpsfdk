const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/auth');
const { uploadMultiple } = require('../middleware/upload');

// Public
router.get('/', productController.getProducts);
// Admin routes before :slugOrId so /admin/all is not captured as slug
router.get('/admin/all', protect, adminOnly, productController.adminGetProducts);
router.get('/admin/one/:id', protect, adminOnly, productController.adminGetProduct);
router.post('/', protect, adminOnly, productController.adminCreateProduct);
router.put('/:id', protect, adminOnly, productController.adminUpdateProduct);
router.delete('/:id', protect, adminOnly, productController.adminDeleteProduct);
router.post('/:id/images', protect, adminOnly, uploadMultiple, productController.adminUploadImages);

router.get('/:slugOrId', productController.getProductBySlugOrId);

module.exports = router;
