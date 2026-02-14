const Product = require('../models/Product');
const { sortProductImages } = require('../utils/sortProductImages');

// Helper: ensure images are sorted front first, back second
function productToJson(product) {
  const obj = product.toObject ? product.toObject() : product;
  if (obj.images && obj.images.length) {
    obj.images = sortProductImages(obj.images);
  }
  return obj;
}

// @route   GET /api/products (public: list with filters, pagination)
exports.getProducts = async (req, res, next) => {
  try {
    const { category, featured, page = 1, limit = 12, search, minPrice, maxPrice } = req.query;
    const query = { isVisible: true };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (search) query.name = new RegExp(search, 'i');
    const skip = (Math.max(1, parseInt(page, 10)) - 1) * Math.min(50, Math.max(1, parseInt(limit, 10)));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));

    const [products, total] = await Promise.all([
      Product.find(query).sort({ sortOrder: 1, createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      Product.countDocuments(query),
    ]);

    const sorted = products.map((p) => productToJson(p));
    res.json({ success: true, products: sorted, total, page: parseInt(page, 10), pages: Math.ceil(total / limitNum) });
  } catch (err) {
    next(err);
  }
};

// @route   GET /api/products/:slugOrId (public: single product)
exports.getProductBySlugOrId = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    const isId = /^[a-fA-F0-9]{24}$/.test(slugOrId);
    const product = isId
      ? await Product.findOne({ _id: slugOrId, isVisible: true })
      : await Product.findOne({ slug: slugOrId, isVisible: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product: productToJson(product) });
  } catch (err) {
    next(err);
  }
};

// ——————— ADMIN ———————

// @route   GET /api/products/admin/one/:id
exports.adminGetProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product: productToJson(product) });
  } catch (err) {
    next(err);
  }
};

// @route   GET /api/products/admin/all
exports.adminGetProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, category } = req.query;
    const query = category ? { category } : {};
    const skip = (Math.max(1, parseInt(page, 10)) - 1) * Math.min(100, parseInt(limit, 10) || 20);
    const limitNum = Math.min(100, parseInt(limit, 10) || 20);
    const [products, total] = await Promise.all([
      Product.find(query).sort({ sortOrder: 1, createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      Product.countDocuments(query),
    ]);
    res.json({ success: true, products: products.map(productToJson), total, page: parseInt(page, 10), pages: Math.ceil(total / limitNum) });
  } catch (err) {
    next(err);
  }
};

// @route   POST /api/products
exports.adminCreateProduct = async (req, res, next) => {
  try {
    const { name, description, category, images, variations, isVisible, featured, sortOrder } = req.body;
    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'Name and category required' });
    }
    const slug = (name + '-' + Date.now()).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const product = await Product.create({
      name,
      slug,
      description: description || '',
      category,
      images: Array.isArray(images) ? images : [],
      variations: Array.isArray(variations) ? variations : [],
      isVisible: isVisible !== false,
      featured: !!featured,
      sortOrder: parseInt(sortOrder, 10) || 0,
    });
    res.status(201).json({ success: true, product: productToJson(product) });
  } catch (err) {
    next(err);
  }
};

// @route   PUT /api/products/:id
exports.adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    const { name, description, category, images, variations, isVisible, featured, sortOrder } = req.body;
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (category !== undefined) product.category = category;
    if (Array.isArray(images)) product.images = images;
    if (Array.isArray(variations)) product.variations = variations;
    if (typeof isVisible === 'boolean') product.isVisible = isVisible;
    if (typeof featured === 'boolean') product.featured = featured;
    if (sortOrder !== undefined) product.sortOrder = parseInt(sortOrder, 10) || 0;
    await product.save();
    res.json({ success: true, product: productToJson(product) });
  } catch (err) {
    next(err);
  }
};

// @route   DELETE /api/products/:id
exports.adminDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

// @route   POST /api/products/:id/images (multipart)
exports.adminUploadImages = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    if (!req.files?.length) return res.status(400).json({ success: false, message: 'No files uploaded' });
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    const paths = req.files.map((f) => `${baseUrl}/uploads/${f.filename}`);
    product.images = [...(product.images || []), ...paths];
    await product.save();
    res.json({ success: true, product: productToJson(product), added: paths.length });
  } catch (err) {
    next(err);
  }
};
