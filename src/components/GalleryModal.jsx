import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function GalleryModal({ isOpen, images, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const [isLocked, setIsLocked] = useState(false);

  if (!isOpen || !images) return null;

  const handleNavigation = (direction) => {
    if (isLocked || !swiperRef.current) return;

    setIsLocked(true);
    if (direction === "next") {
      swiperRef.current.slideNext();
    } else {
      swiperRef.current.slidePrev();
    }

    // 1 second lockout to allow animation to finish
    setTimeout(() => {
      setIsLocked(false);
    }, 1000);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0f172a]/95 backdrop-blur-md flex flex-col items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white z-[100] p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <X size={24} />
      </button>

      <div className="w-full h-full flex flex-col items-center justify-center">
        <Swiper
          modules={[Navigation, EffectFade]}
          effect="fade"
          loop={true}
          speed={800}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          // Centering the slides themselves
          className="w-full h-full flex items-center justify-center"
        >
          {images.map((src, i) => (
            <SwiperSlide
              key={i}
              className="flex items-center justify-center h-full w-full"
            >
              {/* Image centering within slide */}
              <div className="flex items-center justify-center w-full h-full p-4 md:p-12">
                <img
                  src={src}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl pointer-events-none"
                  alt="Gallery"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation - Locked during transitions */}
        <button
          onClick={() => handleNavigation("prev")}
          className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 text-white p-5 rounded-full z-50 transition-all border border-white/10 ${isLocked ? "opacity-20 cursor-not-allowed" : "hover:bg-white/20 active:scale-95"}`}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleNavigation("next")}
          className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 text-white p-5 rounded-full z-50 transition-all border border-white/10 ${isLocked ? "opacity-20 cursor-not-allowed" : "hover:bg-white/20 active:scale-95"}`}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Gallery Counter */}
      <div className="absolute bottom-8 px-5 py-2 bg-black/40 text-white rounded-full text-xs font-bold tracking-widest border border-white/10 z-50">
        {activeIndex + 1} / {images.length}
      </div>
    </div>
  );
}
