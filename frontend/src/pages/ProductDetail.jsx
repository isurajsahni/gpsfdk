import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { productApi } from '../services/api';
import { useCart } from '../context/CartContext';
import { sortProductImages } from '../utils/sortProductImages';

export default function ProductDetail() {
  const { slugOrId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [material, setMaterial] = useState('');
  const [frame, setFrame] = useState('');
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    productApi
      .getProduct(slugOrId)
      .then((r) => {
        const p = r.product;
        setProduct(p);
        const images = sortProductImages(p.images || []);
        setActiveImage(images[0] || '');
        const mats = [...new Set((p.variations || []).map((v) => v.material))];
        const frames = [...new Set((p.variations || []).filter((v) => v.material === mats[0]).map((v) => v.frame))];
        const sizes = [...new Set((p.variations || []).filter((v) => v.material === mats[0] && v.frame === frames[0]).map((v) => v.size))];
        setMaterial(mats[0] || '');
        setFrame(frames[0] || '');
        setSize(sizes[0] || '');
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slugOrId]);

  if (loading) {
    return (
      <section className="min-h-[60vh] bg-black flex items-center justify-center">
        <div className="text-gpsfdk-gold">Loading...</div>
      </section>
    );
  }
  if (!product) {
    return (
      <section className="min-h-[60vh] bg-black flex items-center justify-center">
        <p className="text-gray-400">Product not found.</p>
        <Link to="/products" className="text-gpsfdk-orange ml-2">View all products</Link>
      </section>
    );
  }

  const images = sortProductImages(product.images || []);
  const variations = product.variations || [];
  const materials = [...new Set(variations.map((v) => v.material))];
  const frames = variations.filter((v) => v.material === material).map((v) => v.frame);
  const framesUnique = [...new Set(frames)];
  const sizes = variations.filter((v) => v.material === material && v.frame === frame).map((v) => v.size);
  const sizesUnique = [...new Set(sizes)];
  const selectedVariation = variations.find((v) => v.material === material && v.frame === frame && v.size === size);
  const price = selectedVariation?.price ?? 0;

  const handleAddToCart = () => {
    if (!selectedVariation) return;
    addItem({
      productId: product._id,
      name: product.name,
      price: selectedVariation.price,
      quantity: qty,
      material: selectedVariation.material,
      frame: selectedVariation.frame,
      size: selectedVariation.size,
      image: images[0],
    });
  };

  const optionStyle = 'px-5 py-2 rounded-full border transition-all duration-200';

  return (
    <section className="bg-black min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-gray-400 mb-10">
          <Link to="/" className="hover:text-gpsfdk-orange transition">Home</Link>
          {' / '}
          <Link to="/products" className="hover:text-gpsfdk-orange transition">Products</Link>
          {' / '}
          <span className="text-gpsfdk-gold">{product.name}</span>
        </p>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="order-1 sm:order-2 w-full overflow-hidden rounded-2xl border border-gpsfdk-gold/30 bg-black">
              <img
                src={activeImage || images[0]}
                alt={product.name}
                className="w-full object-cover aspect-[2/3]"
              />
            </div>
            <div className="order-2 sm:order-1 flex gap-4 sm:flex-col overflow-x-auto sm:overflow-visible">
              {images.map((img) => (
                <img
                  key={img}
                  src={img}
                  alt=""
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-24 flex-shrink-0 object-cover cursor-pointer rounded-lg border-2 transition-all ${
                    activeImage === img ? 'border-gpsfdk-orange scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-5xl text-gpsfdk-gold font-semibold mb-6">{product.name}</h1>

            <p className="text-gray-400 mb-2 font-semibold">MATERIAL OPTIONS</p>
            <div className="flex gap-3 flex-wrap mb-6">
              {materials.map((m) => (
                <button
                  key={m}
                  onClick={() => setMaterial(m)}
                  className={`${optionStyle} ${
                    material === m ? 'bg-gpsfdk-orange border-gpsfdk-orange text-white' : 'border-gpsfdk-orange text-gpsfdk-orange hover:bg-gpsfdk-orange hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <p className="text-gray-400 mb-2 font-semibold">FRAME OPTIONS</p>
            <div className="flex gap-3 flex-wrap mb-6">
              {framesUnique.map((f) => (
                <button
                  key={f}
                  onClick={() => setFrame(f)}
                  className={`${optionStyle} ${
                    frame === f ? 'bg-gpsfdk-orange border-gpsfdk-orange text-white' : 'border-gpsfdk-orange text-gpsfdk-orange hover:bg-gpsfdk-orange hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <p className="text-gray-400 mb-2 font-semibold">SIZE OPTIONS</p>
            <div className="flex gap-3 flex-wrap mb-8">
              {sizesUnique.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`${optionStyle} ${
                    size === s ? 'bg-gpsfdk-orange border-gpsfdk-orange text-white' : 'border-gpsfdk-orange text-gpsfdk-orange hover:bg-gpsfdk-orange hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <p className="text-3xl text-gpsfdk-green font-bold mb-6">₹{price}</p>

            <div className="flex gap-4 mb-4">
              <div className="flex items-center border border-gpsfdk-orange rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 text-white hover:bg-gpsfdk-orange">−</button>
                <span className="px-4 text-white">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-2 text-white hover:bg-gpsfdk-orange">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gpsfdk-orange hover:bg-gpsfdk-green transition px-8 py-3 font-semibold text-white rounded-lg"
              >
                ADD TO CART
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                if (!selectedVariation) return;
                addItem({
                  productId: product._id,
                  name: product.name,
                  price: selectedVariation.price,
                  quantity: qty,
                  material: selectedVariation.material,
                  frame: selectedVariation.frame,
                  size: selectedVariation.size,
                  image: images[0],
                });
                navigate('/checkout');
              }}
              className="block w-full bg-gpsfdk-green hover:bg-gpsfdk-orange transition py-4 font-semibold text-white rounded-lg text-center"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
