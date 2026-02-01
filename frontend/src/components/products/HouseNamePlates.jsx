import React, { useRef, useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const HouseNamePlates = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const HouseNamePlatesFeatured = [
  {
    _id: 1,
    name: "Canvas Print 1",
    image: [{ url: "https://picsum.photos/400/400", altText: "Canvas Print 1" }],
    price: "$29.99",
  },
  {
    _id: 2,
    name: "Canvas Print 2",
    image: [{ url: "https://picsum.photos/400/400", altText: "Canvas Print 2" }],
    price: "$29.99",
  },
  {
    _id: 3,
    name: "Canvas Print 3",
    image: [{ url: "https://picsum.photos/400/400", altText: "Canvas Print 3" }],
    price: "$29.99",
  },
  {
    _id: 4,
    name: "Canvas Print 4",
    image: [{ url: "https://picsum.photos/400/400", altText: "Canvas Print 4" }],
    price: "$29.99",
  },
  {
    _id: 5,
    name: "Canvas Print 5",
    image: [{ url: "https://picsum.photos/400/400", altText: "Canvas Print 5" }],
    price: "$29.99",
  },
  {
    _id: 6,
    name: "Canvas Print 6",
    image: [{ url: "https://picsum.photos/400/400", altText: "Canvas Print 6" }],
    price: "$29.99",
  },
  {
    _id: 7,
    name: "Canvas Print 7",
    image: [{ url: "https://picsum.photos/400/400", altText: "Canvas Print 7" }],
    price: "$29.99",
  },
  {
    _id: 8,
    name: "Canvas Print 8",
    image: [{ url: "https://picsum.photos/400/400", altText: "Canvas Print 8" }],
    price: "$29.99",
  },
  {
    _id: 9,
    name: "Canvas Print 9",
    image: [{ url: "https://picsum.photos/400/400", altText: "Canvas Print 9" }],
    price: "$29.99",
  },
  {
    _id: 10,
    name: "Canvas Print 10",
    image: [{ url: "https://picsum.photos/400/400", altText: "Canvas Print 10" }],
    price: "$29.99",
  },
];

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const handleMouseDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.scrollBehavior = "auto";
    el.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    const el = scrollRef.current;
    if (!el || !isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 3) hasDragged.current = true;
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = false;
    el.style.cursor = "grab";
    el.style.scrollBehavior = "smooth";
    el.style.userSelect = "";
    setTimeout(() => { hasDragged.current = false; }, 0);
  };

  const handleMouseLeave = () => {
    if (isDragging.current) handleMouseUp();
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.style.cursor = "grab";
    const moveHandler = (e) => handleMouseMove(e);
    const upHandler = () => handleMouseUp();
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", upHandler);
    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", upHandler);
    };
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.3;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-black py-20 px-4 border-t border-gpsfdk-gold">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-6 flex-wrap">
        <p className="text-3xl md:text-5xl text-gpsfdk-gold font-semibold">House Nameplates</p>

        <button className="hidden sm:block group inline-flex items-center gap-2 px-12 py-3 rounded-md bg-gradient-to-r from-gpsfdk-green to-gpsfdk-orange text-white font-semibold text-base shadow-lg transition-all duration-300 hover:scale-105">
          View All <span className="text-lg transition-transform group-hover:translate-x-1">›</span>
        </button>
      </div>

      <div className="relative max-w-7xl mx-auto mt-4">
        <div
          ref={scrollRef}
          className="overflow-x-auto flex gap-8 py-6 scrollbar-hide snap-x snap-mandatory select-none cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          style={{ scrollBehavior: "smooth" }}
        >
          {HouseNamePlatesFeatured.map((product) => (
            <div
              key={product._id}
              className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] xl:min-w-[22%] snap-start group relative rounded-lg overflow-hidden hover:scale-[1.03] transition-transform"
            >
              <img
                src={product.image[0]?.url}
                alt={product.image[0]?.altText || product.name}
                className="w-full aspect-[2/2.5] object-cover"
              />
            <div className="absolute inset-0 bg-black/60 text-white p-8 
                flex flex-col justify-end
                translate-y-full group-hover:translate-y-0
                transition-transform duration-500 ease-out">
  <Link
    to={`/product/${product._id}`}
    className="flex flex-col items-center w-full"
    onClick={(e) => hasDragged.current && e.preventDefault()}
  >
    <h4 className="font-medium text-gpsfdk-gold text-lg">{product.name}</h4>
    <p className="font-semibold">{product.price}</p>

    <div className="mt-2 inline-block bg-gpsfdk-orange hover:bg-gpsfdk-green py-2 px-8 text-center w-full">
      Shop Now
    </div>
  </Link>
</div>

            </div>
          ))}
        </div>
<div className="flex relative items-center">
   <button className="sm:hidden group inline-flex items-center gap-2 px-12 py-3 rounded-md bg-gradient-to-r from-gpsfdk-green to-gpsfdk-orange text-white font-semibold text-base shadow-lg transition-all duration-300 hover:scale-105">
          View All <span className="text-lg transition-transform group-hover:translate-x-1">›</span>
        </button>

        <div className="absolute right-0 sm:-bottom-10 flex gap-3">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-10 h-10 rounded-full bg-gpsfdk-gold/80 hover:bg-gpsfdk-gold text-white flex items-center justify-center disabled:opacity-40 transition-opacity"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-full bg-gpsfdk-gold/80 hover:bg-gpsfdk-gold text-white flex items-center justify-center disabled:opacity-40 transition-opacity"
          >
            <FiChevronRight size={20} />
          </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HouseNamePlates;