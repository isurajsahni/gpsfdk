import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Banner1 from "../../assets/img/poster1.webp";
import Banner2 from "../../assets/img/poster2.webp";
import Banner3 from "../../assets/img/poster3.webp";

const banners = [
  { img: Banner1, link: "/#" },
  { img: Banner2, link: "/#" },
  { img: Banner3, link: "/#" },
];

export const Banner = () => {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Adjust height based on active image
  const handleImageLoad = (e) => {
    if (containerRef.current) {
      containerRef.current.style.height = `${e.target.offsetHeight}px`;
    }
  };

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden">
      {banners.map((banner, index) => (
        <Link
          key={index}
          to={banner.link}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}
          `}
        >
          <img
            src={banner.img}
            alt="Banner"
            onLoad={index === current ? handleImageLoad : undefined}
            className="w-full h-auto object-contain"
          />
        </Link>
      ))}
    </section>
  );
};
