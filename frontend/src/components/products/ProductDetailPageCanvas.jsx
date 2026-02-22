import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import WallCanvaSlider from "./WallCanvaSlider";

export const ProductDetailPageCanvas = () => {

 const product = {
  name: "Eclipse",
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

  /* ---------------- PRODUCT IMAGES ---------------- */

  const images = [
    "https://picsum.photos/700/900?random=101",
    "https://picsum.photos/700/900?random=102",
  ];

  const [activeImage, setActiveImage] = useState(images[0]);
  const [animateImage, setAnimateImage] = useState(false);

  const changeImage = (img) => {
    if (img === activeImage) return;

    setAnimateImage(true);

    setTimeout(() => {
      setActiveImage(img);
      setAnimateImage(false);
    }, 180);
  };

  /* ---------------- VARIATIONS ---------------- */

  const variations = [
    { material:"Poster", frame:"Soft board", size:"A4", price:599 },
    { material:"Poster", frame:"Soft board", size:"A3", price:999 },
    { material:"Poster", frame:"Sticker", size:"A3", price:299 },
    { material:"Poster", frame:"Sticker", size:"A4", price:149 },
    { material:"Poster", frame:"Paper", size:"A3", price:199 },
    { material:"Poster", frame:"Paper", size:"A4", price:99 },

    { material:"Canvas", frame:"Rolled", size:"12 x 18", price:999 },
    { material:"Canvas", frame:"Rolled", size:"18 x 24", price:1499 },
    { material:"Canvas", frame:"Rolled", size:"24 x 36", price:2899 },
    { material:"Canvas", frame:"Rolled", size:"30 x 48", price:4199 },
    { material:"Canvas", frame:"Rolled", size:"36 x 60", price:5999 },

    { material:"Canvas", frame:"Stretched", size:"12 x 18", price:1499 },
    { material:"Canvas", frame:"Stretched", size:"18 x 24", price:2499 },
    { material:"Canvas", frame:"Stretched", size:"24 x 36", price:3699 },
    { material:"Canvas", frame:"Stretched", size:"30 x 48", price:5999 },
    { material:"Canvas", frame:"Stretched", size:"36 x 60", price:7999 },
  ];

  /* ---------------- DEFAULT STATE ---------------- */

  const [material, setMaterial] = useState("Canvas");
  const [frame, setFrame] = useState("Rolled");
  const [size, setSize] = useState("12 x 18");
  const [qty, setQty] = useState(1);

  const [animatePrice, setAnimatePrice] = useState(false);
  const [animateTab, setAnimateTab] = useState(false);

  /* ---------------- FILTER OPTIONS ---------------- */

  const materials = [...new Set(variations.map(v => v.material))];

  const frames = useMemo(() => {
    return [...new Set(
      variations
        .filter(v => v.material === material)
        .map(v => v.frame)
    )];
  }, [material]);

  const sizes = useMemo(() => {
    return [...new Set(
      variations
        .filter(v => v.material === material && v.frame === frame)
        .map(v => v.size)
    )];
  }, [material, frame]);

  /* Auto-fix invalid combos */

  useEffect(() => {
    if (!frames.includes(frame)) {
      setFrame(frames[0]);
    }
  }, [frames]);

  useEffect(() => {
    if (!sizes.includes(size)) {
      setSize(sizes[0]);
    }
  }, [sizes]);

  /* ---------------- PRICE ---------------- */

  const selectedVariation = variations.find(
    v =>
      v.material === material &&
      v.frame === frame &&
      v.size === size
  );

  const price = selectedVariation?.price ?? 0;

  useEffect(() => {
    setAnimatePrice(true);
    const t = setTimeout(() => setAnimatePrice(false), 200);
    return () => clearTimeout(t);
  }, [price]);

  /* Smooth material switch */

  const handleMaterialChange = (mat) => {
    if (mat === material) return;

    setAnimateTab(true);

    setTimeout(() => {
      setMaterial(mat);
      setAnimateTab(false);
    }, 180);
  };

  const optionStyle =
    "px-5 py-2 rounded-full border transition-all duration-200";

  /* ================================================= */

  return (
    <section className="bg-black min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <p className="text-gray-400 mb-10">
          <Link to="/" className="hover:text-gpsfdk-orange transition">
            Home
          </Link>{" "}
          /{" "}
          <span className="text-gpsfdk-gold">{product.name}</span>
        </p>

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ================= IMAGE GALLERY ================= */}

          <div className="flex gap-4">

            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              {images.map((img) => (
                <img
                  key={img}
                  src={img}
                  alt="thumbnail"
                  onClick={() => changeImage(img)}
                  className={`w-20 h-24 object-cover cursor-pointer rounded-lg border-2 transition-all duration-300
                  ${
                    activeImage === img
                      ? "border-gpsfdk-orange scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="overflow-hidden rounded-2xl border border-gpsfdk-gold/30 w-full bg-black">
              <img
                src={activeImage}
                alt="product"
                className={`w-full object-cover transition-all duration-500 ease-out
                ${
                  animateImage
                    ? "opacity-0 scale-105"
                    : "opacity-100 scale-100"
                }`}
              />
            </div>

          </div>

          {/* ================= PRODUCT DETAILS ================= */}

          <div>
            <h1 className="text-5xl text-gpsfdk-gold font-semibold mb-6">
              {product.name}
            </h1>

            {/* MATERIAL */}
            <p className="text-gray-400 mb-2 font-semibold">
              MATERIAL OPTIONS
            </p>

            <div className="flex gap-3 flex-wrap mb-6">
              {materials.map(mat => (
                <button
                  key={mat}
                  onClick={() => handleMaterialChange(mat)}
                  className={`${optionStyle} ${
                    material === mat
                      ? "bg-gpsfdk-orange border-gpsfdk-orange text-white"
                      : "border-gpsfdk-orange text-gpsfdk-orange hover:bg-gpsfdk-orange hover:text-white"
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>

            {/* Animated container */}
            <div
              className={`transition-all duration-200 ${
                animateTab
                  ? "opacity-0 translate-y-2"
                  : "opacity-100 translate-y-0"
              }`}
            >

              {/* FRAME */}
              <p className="text-gray-400 mb-2 font-semibold">
                FRAME OPTIONS
              </p>

              <div className="flex gap-3 flex-wrap mb-6">
                {frames.map(f => (
                  <button
                    key={f}
                    onClick={() => setFrame(f)}
                    className={`${optionStyle} ${
                      frame === f
                        ? "bg-gpsfdk-orange border-gpsfdk-orange text-white"
                        : "border-gpsfdk-orange text-gpsfdk-orange hover:bg-gpsfdk-orange hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* SIZE */}
              <p className="text-gray-400 mb-2 font-semibold">
                SIZE OPTIONS
              </p>

              <div className="flex gap-3 flex-wrap mb-8">
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`${optionStyle} ${
                      size === s
                        ? "bg-gpsfdk-orange border-gpsfdk-orange text-white"
                        : "border-gpsfdk-orange text-gpsfdk-orange hover:bg-gpsfdk-orange hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

            </div>

            {/* PRICE */}
            <p
              className={`text-3xl text-gpsfdk-green font-bold mb-6 transition-all duration-200 ${
                animatePrice ? "opacity-40 scale-95" : ""
              }`}
            >
              ₹{price}
            </p>

            {/* QTY + CART */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center border border-gpsfdk-orange rounded-lg">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 text-white hover:bg-gpsfdk-orange"
                >
                  -
                </button>

                <span className="px-6 text-white">{qty}</span>

                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2 text-white hover:bg-gpsfdk-orange"
                >
                  +
                </button>
              </div>

              <Link
                to="/cart"
                className="flex-1 bg-gpsfdk-orange hover:bg-gpsfdk-green transition px-8 py-3 font-semibold text-white rounded-lg shadow-lg text-center"
              >
                ADD TO CART
              </Link>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-gpsfdk-green hover:bg-gpsfdk-orange transition py-4 font-semibold text-white rounded-lg shadow-lg text-center"
            >
              BUY NOW
            </Link>

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
        {product.description.intro.title}
      </h4>
      <p>{product.description.intro.content}</p>
    </div>

    {/* Highlights */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-3">
        Product Highlights
      </h4>
      <ul className="space-y-2 list-disc list-inside marker:text-gpsfdk-orange">
        {product.description.highlights.map((item, index) => (
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
        {product.description.included.map((item, index) => (
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
        {product.description.care.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

  </div>
</div>

    </section>
  );
};