import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const testimonials = [
  {
    id: 1,
    name: "Harsh Bansal",
    text: `Hello everyone! I got this nameplate made from GPS. I often visit Chandigarh, and there I saw some really unique designs... absolutely loved it!`,
    thumbnail:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    video:
      "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    text: `Amazing craftsmanship and super fast delivery. Highly recommended if you want premium looking house nameplates.`,
    thumbnail:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    video:
      "https://www.w3schools.com/html/movie.mp4",
  },
];

const TestimonialVideo = () => {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);

  const next = () =>
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const item = testimonials[current];

  return (
    <section className="bg-black py-20 px-4 border-t border-gpsfdk-gold">
    <div className="relative max-w-6xl mx-auto">
      
      {/* STACKED CARD EFFECT */}
      <div className="relative">
        <div className="absolute inset-0 translate-y-6 bg-emerald-900 rounded-3xl"></div>
        <div className="absolute inset-0 translate-y-3 bg-emerald-700 rounded-3xl"></div>

        {/* MAIN CARD */}
        <div className="relative bg-emerald-800 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">

          {/* LEFT — VIDEO */}
          <div
            onClick={() => setOpen(true)}
            className="relative w-full md:w-[340px] h-[380px] cursor-pointer group"
          >
            <img
              src={item.thumbnail}
              alt="video thumbnail"
              className="w-full h-full object-cover rounded-2xl"
            />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 group-hover:scale-110 transition w-16 h-16 rounded-full flex items-center justify-center shadow-lg text-xl">
                ▶
              </div>
            </div>
          </div>

          {/* RIGHT — TEXT */}
          <div className="flex-1 text-white">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              {item.name}
            </h2>

            <p className="leading-relaxed text-white/90">
              {item.text}
            </p>
          </div>
        </div>
      </div>

      {/* ARROWS */}
      <button
        onClick={prev}
        className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white w-11 h-11 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition"
      >
        <FiChevronLeft size={22} />
      </button>

      <button
        onClick={next}
        className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white w-11 h-11 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition"
      >
        <FiChevronRight size={22} />
      </button>

      {/* VIDEO MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-10 right-10 text-white"
          >
            <FiX size={32} />
          </button>

          <video
            src={item.video}
            controls
            autoPlay
            className="w-full max-w-4xl rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
    </section>
  );
};

export default TestimonialVideo;
