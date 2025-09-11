import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.png";

const ResponsiveBannerCarousel = () => {
  const banners = [
    { id: 1, src: banner1, alt: "Zrema banner 1", title: "Premium Collection" },
    { id: 2, src: banner2, alt: "Zrema banner 2", title: "New Arrivals" },
    { id: 3, src: banner3, alt: "Zrema banner 3", title: "Special Offers" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, banners.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const goToPrevious = () =>
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  const goToNext = () =>
    setCurrentSlide((prev) => (prev + 1) % banners.length);

  return (
    <section className="bg-amber-50 py-0 md:py-8">
      <div className="container mx-auto px-0 md:px-4">
        <div className="flex justify-center">
          {/* Carousel container */}
          <div
            className="relative w-full max-w-7xl overflow-hidden rounded-xl shadow-lg"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {/* Slides */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className="w-full flex-shrink-0 relative aspect-[16/6] sm:aspect-[16/7] md:aspect-[16/5] lg:aspect-[16/6]"
                >
                  <img
                    src={banner.src}
                    alt={banner.alt}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-white text-lg sm:text-2xl md:text-3xl font-bold text-center px-4">
                      {banner.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-transform hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-transform hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-white shadow-md scale-110"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 overflow-hidden">
              <div
                key={currentSlide} // reset animation each slide
                className="h-full bg-amber-400 animate-progress"
              />
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="flex justify-center items-center mt-4 text-sm text-gray-600">
          {currentSlide + 1} / {banners.length}
        </div>
      </div>

      {/* Tailwind custom animation */}
      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 4s linear forwards;
        }
      `}</style>
    </section>
  );
};

export default ResponsiveBannerCarousel;
