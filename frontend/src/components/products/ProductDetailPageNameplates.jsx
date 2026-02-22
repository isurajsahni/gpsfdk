import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import HouseNamePlates from './HouseNamePlates';

export const ProductDetailPageNameplates = () => {
 const SelectedProduct = {
  name: "Lord Ganesha",
  images: [
    "https://picsum.photos/900/700?random=101",
    "https://picsum.photos/900/700?random=102",
    "https://picsum.photos/900/700?random=103",
  ],
  description: {
    intro: {
      title: "Affordable Elegance, Built To Last",
      content:
        "Bring home style and durability at an affordable price! Our Value-Packed Vinyl Nameplates reflect our belief that everyone has the Right To Luxury, offering a sleek, elegant look without compromise.",
    },
    highlights: [
      "Premium house nameplate at an affordable price – designed for every home.",
      "Built on a durable acrylic base with a matte vinyl finish for a smooth, elegant look.",
      "Weather-resistant and long-lasting – perfect for outdoor use.",
      "Lightweight yet sturdy, making it easy to install.",
      "Perfect for those searching for custom vinyl nameplates that combine luxury and value.",
    ],
    included: [
      "1 × Value-Packed Vinyl Nameplate",
      "1 × Hanging Kit For Easy Installation",
      "1 × GPS Family Certificate",
    ],
    care: [
      "Clean directly using a soft damp cloth.",
      "Avoid washing or rinsing with water.",
      "Do not use harsh chemicals; simply wipe gently for a long-lasting finish.",
    ],
  },
};

  /* IMAGE SWITCH */
  const [activeImage, setActiveImage] = useState(
    SelectedProduct.images[0]
  );
  const [animateImage, setAnimateImage] = useState(false);

  const changeImage = (img) => {
    if (img === activeImage) return;

    setAnimateImage(true);
    setTimeout(() => {
      setActiveImage(img);
      setAnimateImage(false);
    }, 150);
  };

  /* VARIATIONS */
  const variations = [
    { color: "Black & Gold", size: "15” Wide", price: 1999 },
    { color: "Black & Gold", size: "18” Wide", price: 2499 },
    { color: "Black & Silver", size: "15” Wide", price: 1999 },
    { color: "Black & Silver", size: "18” Wide", price: 2499 },
  ];

  const [selectedColor, setSelectedColor] = useState("Black & Gold");
  const [selectedSize, setSelectedSize] = useState("15” Wide");

  const selectedVariation =
    variations.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    ) || variations[0];

  /* CUSTOM NAME */
  const [customName, setCustomName] = useState("");

  /* QUANTITY */
  const [qty, setQty] = useState(1);

  /* BUTTON STATE */
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (!customName.trim()) {
      toast.error("Please enter your name", { duration: 1000 });
      return;
    }

    setIsAdding(true);

    // Simulate API/cart call
    setTimeout(() => {
      toast.success("Added to cart!", { duration: 1000 });
      setIsAdding(false);
    }, 600);
  };

  return (
    <section className="bg-black min-h-screen py-16 px-4 text-white">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <p className="text-gray-400 mb-10">
          <Link to="/" className="hover:text-gpsfdk-orange transition">
            Home
          </Link>{" "}
          / <span className="text-gpsfdk-gold">{SelectedProduct.name}</span>
        </p>

        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT IMAGE */}
          <div>
            <div className="bg-[#111] rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
              <img
                src={activeImage}
                alt="product"
                className={`w-full h-[520px] object-cover transition-all duration-300 ${
                  animateImage
                    ? "scale-95 opacity-0"
                    : "scale-100 opacity-100"
                }`}
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-5">
              {SelectedProduct.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumbnail"
                  onClick={() => changeImage(img)}
                  className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition ${
                    activeImage === img
                      ? "border-gpsfdk-orange"
                      : "border-gray-700 hover:border-gpsfdk-gold"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h1 className="text-4xl font-semibold mb-6 text-gpsfdk-gold">
              {SelectedProduct.name}
            </h1>

            {/* SIZE */}
            <p className="text-gray-300 mb-2 tracking-wide">
              SELECT DIMENSION :-
            </p>

            <div className="flex gap-3 mb-6">
              {["15” Wide", "18” Wide"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2 rounded-full border transition ${
                    selectedSize === size
                      ? "bg-gpsfdk-orange border-gpsfdk-orange"
                      : "border-gray-600 hover:border-gpsfdk-orange"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* COLORS */}
            <p className="text-gray-300 mb-2 tracking-wide">
              COLORS
            </p>

            <div className="flex gap-3 mb-6 flex-wrap">
              {["Black & Gold", "Black & Silver"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-6 py-2 rounded-full border transition ${
                    selectedColor === color
                      ? "bg-gpsfdk-orange border-gpsfdk-orange"
                      : "border-gray-600 hover:border-gpsfdk-orange"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>

            {/* NAME INPUT */}
            <input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-transparent border border-gray-600 rounded-full px-6 py-3 mb-6 outline-none focus:border-gpsfdk-orange"
            />

            {/* PRICE */}
            <h2 className="text-3xl text-gpsfdk-green font-semibold mb-6">
              ₹{selectedVariation.price.toLocaleString()}
            </h2>

            {/* QTY + CART */}
            <div className="flex gap-4 mb-5">

              <div className="flex items-center border border-gray-600 rounded-full">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 text-xl hover:text-gpsfdk-orange"
                >
                  -
                </button>

                <span className="px-4">{qty}</span>

                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2 text-xl hover:text-gpsfdk-orange"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-gpsfdk-orange hover:opacity-90 transition rounded-full py-3 font-semibold disabled:opacity-50"
              >
                {isAdding ? "ADDING..." : "ADD TO CART"}
              </button>
            </div>

            {/* BUY NOW */}
            <button className="w-full bg-gpsfdk-green hover:opacity-90 transition rounded-full py-4 font-semibold text-lg">
              BUY NOW
            </button>

          </div>
        </div>
      </div>
    <div className="max-w-7xl mx-auto py-16">
  <h3 className="text-2xl font-semibold mt-16 mb-4 text-gpsfdk-gold">
    Product Description
  </h3>

  <div className="text-gray-300 leading-relaxed max-w-3xl space-y-6">

    {/* Intro */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-2">
        {SelectedProduct.description.intro.title}
      </h4>
      <p>
        {SelectedProduct.description.intro.content}
      </p>
    </div>

    {/* Highlights */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-3">
        Product Highlights
      </h4>
      <ul className="space-y-2 list-disc list-inside marker:text-gpsfdk-orange">
        {SelectedProduct.description.highlights.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    {/* Included */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-3">
        What’s Included In The Box
      </h4>
      <ul className="space-y-2 list-disc list-inside marker:text-gpsfdk-green">
        {SelectedProduct.description.included.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    {/* Care */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-3">
        Care & Handling
      </h4>
      <ul className="space-y-2 list-disc list-inside marker:text-red-400">
        {SelectedProduct.description.care.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

  </div>
</div>
    </section>
  );
};