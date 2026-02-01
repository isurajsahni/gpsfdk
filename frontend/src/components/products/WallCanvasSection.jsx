import React from "react";
import { Link } from "react-router-dom";
import leonardImg from "../../assets/img/leonard.png";
import houseNameplateImg from "../../assets/img/housenameplate.png";

export const WallCanvasSection = () => {
  return (
    <section className="py-20 bg-black">
      <h2 className="text-center mb-8 text-3xl md:text-5xl text-gpsfdk-gold font-semibold">Our Products</h2>
      {/* ✅ Controlled container */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-7">
        
        {/* Wall Canvas */}
        <div className="relative overflow-hidden w-full md:w-1/2">
          <img
            src={leonardImg}
            alt="Wall Canvas"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-3 left-3 bg-slate-50/85 p-4 w-fit sm:bottom-8 sm:left-8">
            <h2 className="text-lg font-bold mb-2 sm:text-2xl">Wall Canvas</h2>
            <Link
              to="/products/wall-canvas"
              className="inline-block text-gpsfdk-green hover:text-gpsfdk-orange underline"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* House Nameplates */}
        <div className="relative overflow-hidden w-full md:w-1/2">
          <img
            src={houseNameplateImg}
            alt="House Nameplates"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-3 left-3 bg-slate-50/85 p-4 w-fit sm:bottom-8 sm:left-8">
            <h2 className="text-lg font-bold mb-2 sm:text-2xl">House Nameplates</h2>
            <Link
              to="/products/house-nameplates"
              className="inline-block text-gpsfdk-green hover:text-gpsfdk-orange underline"
            >
              Shop Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
