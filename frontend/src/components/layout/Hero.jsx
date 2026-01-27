import React from "react";
import HeroVideo from "../../assets/videos/herogpsfdkvideo.mp4";
import HeroVideoMb from "../../assets/videos/mobile-compressed.mp4";

export const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* ✅ Desktop / Tablet Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={HeroVideo} type="video/mp4" />
      </video>

      {/* ✅ Mobile Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover block md:hidden"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={HeroVideoMb} type="video/mp4" />
      </video>

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-white">
        {/* Hero content */}
      </div>

    </section>
  );
};
