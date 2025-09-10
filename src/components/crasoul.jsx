import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import banner1 from "../assets/images/1.png";
import banner2 from "../assets/images/2.png";
import banner3 from "../assets/images/3.png";

const ResponsiveBannerCarousel = () => {
  // Banner array with local sources
  const banners = [
    {
      id: 1,
      src: banner1,
      alt: "Zrema banner 1",
      title: "Premium Collection",
    },
    {
      id: 2,
      src: banner2,
      alt: "Zrema banner 2",
      title: "New Arrivals",
    },
    {
      id: 3,
      src: banner3,
      alt: "Zrema banner 3",
      title: "Special Offers",
    },
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

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const handleMouseEnter = () => {
    setIsAutoPlay(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlay(true);
  };

  return (
    <section className="bg-amber-50 py-4 md:py-8">
      <div className="container mx-auto px-0 md:px-4">
        <div className="flex justify-center">
          {/* Carousel container */}
          <div
            className="relative w-full overflow-hidden rounded-lg shadow-lg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Slides container */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {banners.map((banner) => (
                <div key={banner.id} className="w-full flex-shrink-0 relative">
                  <picture>
                    {/* Same image for all breakpoints since local */}
                    <source media="(max-width: 639px)" srcSet={banner.src} />
                    <source
                      media="(min-width: 640px) and (max-width: 1023px)"
                      srcSet={banner.src}
                    />
                    <source media="(min-width: 1024px)" srcSet={banner.src} />
                    {/* Fallback image */}
                    <img
                      src={banner.src}
                      alt={banner.alt}
                      className="w-full h-48 sm:h-64 md:h-80 lg:h-111"
                    />
                  </picture>

                  {/* Overlay content */}
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white text-xl md:text-3xl font-bold text-center px-4">
                      {banner.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === index
                      ? "bg-white shadow-lg"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-20">
              <div
                className="h-full bg-amber-400 transition-all duration-100 ease-out"
                style={{
                  width: isAutoPlay ? "100%" : "0%",
                  animation: isAutoPlay
                    ? "progress 4s linear infinite"
                    : "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Carousel controls (mobile-friendly) */}
        <div className="flex justify-center items-center mt-4 space-x-4">
          <div className="text-sm text-gray-600">
            {currentSlide + 1} of {banners.length}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default ResponsiveBannerCarousel;
