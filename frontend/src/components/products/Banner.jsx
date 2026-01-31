import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Banner1 from "../../assets/img/poster1.webp";
import Banner2 from "../../assets/img/poster2.webp";
import Banner3 from "../../assets/img/poster3.webp";

const banners = [
  { img: Banner1, link: "/category/wall-canvas" },
  { img: Banner2, link: "/offers" },
  { img: Banner3, link: "/custom-canvas" },
];

// clone slides
const slides = [
  banners[banners.length - 1],
  ...banners,
  banners[0],
];

export const Banner = () => {
  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const sliderRef = useRef(null);

  // auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // handle seamless loop
  useEffect(() => {
    if (!sliderRef.current) return;

    if (index === slides.length - 1) {
      // reached cloned first slide
      setTimeout(() => {
        setTransition(false);
        setIndex(1);
      }, 700);
    }

    if (index === 0) {
      // reached cloned last slide
      setTimeout(() => {
        setTransition(false);
        setIndex(slides.length - 2);
      }, 700);
    }
  }, [index]);

  // re-enable transition after jump
  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => {
        setTransition(true);
      });
    }
  }, [transition]);

  return (
    <section className="w-full overflow-hidden">
      <div
        ref={sliderRef}
        className="flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: transition ? "transform 700ms ease-in-out" : "none",
        }}
      >
        {slides.map((slide, i) => (
          <Link key={i} to={slide.link} className="min-w-full block">
            <img
              src={slide.img}
              alt="Banner"
              className="
                w-full h-auto object-cover md:object-contain"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
