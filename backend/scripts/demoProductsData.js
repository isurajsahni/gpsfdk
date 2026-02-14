/**
 * Demo products using images from frontend/public/product/
 * Front image first, then back (per project rules).
 */
module.exports = [
  {
    name: 'Wall Canvas Eclipse',
    slug: 'wall-canvas-eclipse',
    description: 'Premium wall canvas print. Perfect for living rooms and offices.',
    category: 'wall-canvas',
    images: [
      '/product/wallcanvas_front1.jpg',
      '/product/wallcanvas_back1.jpg',
      '/product/wallcanvas_front2.png',
      '/product/wallcanvas_back2.jpg',
    ],
    isVisible: true,
    featured: true,
    variations: [
      { material: 'Poster', frame: 'Soft board', size: 'A4', price: 599, stock: 50 },
      { material: 'Poster', frame: 'Soft board', size: 'A3', price: 999, stock: 50 },
      { material: 'Canvas', frame: 'Rolled', size: '12 x 18', price: 999, stock: 30 },
      { material: 'Canvas', frame: 'Rolled', size: '18 x 24', price: 1499, stock: 30 },
      { material: 'Canvas', frame: 'Stretched', size: '12 x 18', price: 1499, stock: 20 },
      { material: 'Canvas', frame: 'Stretched', size: '18 x 24', price: 2499, stock: 20 },
    ],
  },
  {
    name: 'Wall Canvas Horizon',
    slug: 'wall-canvas-horizon',
    description: 'Stunning wall art with horizon theme. High-quality print.',
    category: 'wall-canvas',
    images: [
      '/product/wallcanvas_front2.png',
      '/product/wallcanvas_back2.jpg',
      '/product/wallcanvas_front3.png',
      '/product/wallcanvas_back3.jpg',
    ],
    isVisible: true,
    featured: true,
    variations: [
      { material: 'Canvas', frame: 'Rolled', size: '12 x 18', price: 999, stock: 25 },
      { material: 'Canvas', frame: 'Rolled', size: '18 x 24', price: 1499, stock: 25 },
      { material: 'Canvas', frame: 'Stretched', size: '18 x 24', price: 2499, stock: 15 },
      { material: 'Canvas', frame: 'Stretched', size: '24 x 36', price: 3699, stock: 10 },
    ],
  },
  {
    name: 'Wall Canvas Classic',
    slug: 'wall-canvas-classic',
    description: 'Classic design wall canvas. Ideal for bedrooms and corridors.',
    category: 'wall-canvas',
    images: [
      '/product/wallcanvas_front3.png',
      '/product/wallcanvas_back3.jpg',
      '/product/wallcanvas_front1.jpg',
      '/product/wallcanvas_back1.jpg',
    ],
    isVisible: true,
    featured: false,
    variations: [
      { material: 'Poster', frame: 'Paper', size: 'A3', price: 199, stock: 40 },
      { material: 'Poster', frame: 'Paper', size: 'A4', price: 99, stock: 60 },
      { material: 'Canvas', frame: 'Rolled', size: '12 x 18', price: 999, stock: 30 },
      { material: 'Canvas', frame: 'Stretched', size: '12 x 18', price: 1499, stock: 20 },
    ],
  },
  {
    name: 'House Nameplate Classic',
    slug: 'house-nameplate-classic',
    description: 'Elegant house nameplate. Durable and weather-resistant.',
    category: 'house-nameplates',
    images: [
      '/product/housenameplate_front1.webp',
      '/product/housenameplate_back1.webp',
      '/product/housenameplate_front2.webp',
      '/product/housenameplate_back2.webp',
    ],
    isVisible: true,
    featured: true,
    variations: [
      { material: 'Metal', frame: 'Standard', size: '6x12 inch', price: 899, stock: 40 },
      { material: 'Metal', frame: 'Premium', size: '8x16 inch', price: 1299, stock: 30 },
    ],
  },
  {
    name: 'House Nameplate Deluxe',
    slug: 'house-nameplate-deluxe',
    description: 'Premium nameplate with refined finish. Makes a great first impression.',
    category: 'house-nameplates',
    images: [
      '/product/housenameplate_front2.webp',
      '/product/housenameplate_back2.webp',
      '/product/housenameplate_front1.webp',
      '/product/housenameplate_back1.webp',
    ],
    isVisible: true,
    featured: true,
    variations: [
      { material: 'Metal', frame: 'Premium', size: '6x12 inch', price: 1099, stock: 35 },
      { material: 'Metal', frame: 'Premium', size: '8x16 inch', price: 1499, stock: 25 },
    ],
  },
  // Watch & Buy – demo product (uses placeholder image until /product/watch_demo.jpg is added)
  {
    name: 'Watch & Buy Demo',
    slug: 'watch-buy-demo',
    description: 'Demo product for Watch & Buy category. Custom designs and quick delivery.',
    category: 'watch-buy',
    images: [
      '/product/wallcanvas_front1.jpg',
      '/product/wallcanvas_back1.jpg',
    ],
    isVisible: true,
    featured: true,
    variations: [
      { material: 'Standard', frame: 'N/A', size: 'One size', price: 499, stock: 100 },
      { material: 'Premium', frame: 'N/A', size: 'One size', price: 799, stock: 50 },
    ],
  },
];
