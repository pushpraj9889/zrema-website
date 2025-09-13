import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Desktop banners
import desktopBanner1 from "../assets/images/desktop1.jpg";
import desktopBanner2 from "../assets/images/desktop2.jpg";
import desktopBanner3 from "../assets/images/desktop3.jpg";
import desktopBanner4 from "../assets/images/desktop4.png";


// Mobile banners
import mobileBanner1 from "../assets/images/Banner 1 Mobail.png";
import mobileBanner2 from "../assets/images/Banner 2 Mobail.png";
import mobileBanner3 from "../assets/images/Banner 4 Mobail.png";
import mobileBanner4 from "../assets/images/Banner 5 Mobails.png";

const PremiumBannerCarousel = () => {
  const navigate = useNavigate();

  const desktopBanners = [
    {
      id: 1,
      src: desktopBanner1,
      alt: "Long Kurtis Banner",
      title: "LONG KURTIS",
      subtitle: "Latest Collection 2025",
            link: "/Collections/Chikankari",
      // link: "/Collections/LONG KURTIS",
    },
    {
      id: 2,
      src: desktopBanner2,
      alt: "Chikankari Banner",
      title: "CHIKANKARI",
      subtitle: "Elegant & Traditional",
      link: "/Collections/Chikankari",
    },
    {
      id: 3,
      src: desktopBanner3,
      alt: "Special Offers Banner",
      title: "SPECIAL OFFERS",
      subtitle: "Grab Them Before They're Gone!",
      link: "/Collections/LONG KURTIS",
    },
      {
      id: 4,
      src: desktopBanner4,
      alt: "Special Offers Banner",
      title: "SPECIAL OFFERS",
      subtitle: "Grab Them Before They're Gone!",
      link: "/Collections",
    },
  ];

  const mobileBanners = [
    {
      id: 1,
      src: mobileBanner1,
      alt: "Mobile Kurtis Banner",
      title: "LONG KURTIS",
      subtitle: "Trendy Styles",
            link: "/Collections/Chikankari",
      // link: "/Collections/LONG KURTIS",
    },
    {
      id: 2,
      src: mobileBanner2,
      alt: "Mobile Chikankari Banner",
      title: "CHIKANKARI",
      subtitle: "Handcrafted Elegance",
      link: "/Collections/Chikankari",
    },
    {
      id: 3,
      src: mobileBanner3,
      alt: "Mobile Special Offers Banner",
      title: "SPECIAL OFFERS",
      subtitle: "Don’t Miss Out!",
      link: "/Collections/LONG KURTIS",
    },
     {
      id: 4,
      src: mobileBanner4,
      alt: "Mobile Special Offers Banner",
      title: "SPECIAL OFFERS",
      subtitle: "Don’t Miss Out!",
      link: "/Collections",
    },
    
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for mobile/desktop
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const banners = isMobile ? mobileBanners : desktopBanners;

  // Auto-play
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, banners.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const goToPrevious = () =>
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  const goToNext = () =>
    setCurrentSlide((prev) => (prev + 1) % banners.length);

  const handleBannerClick = (link) => navigate(link);

  return (
    <section className="relative py-4 sm:py-6 md:py-10 bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          {/* Slides */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="w-full flex-shrink-0 relative cursor-pointer group"
                onClick={() => handleBannerClick(banner.link)}
              >
                <img
                  src={banner.src}
                  alt={banner.alt}
                  className={`w-full ${
                    isMobile
                      ? "h-[300px] sm:h-[350px]"
                      : "h-[400px] sm:h-[500px] md:h-[550px]"
                  } object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700`}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl">
                  <h2 className="text-white text-lg sm:text-2xl md:text-4xl font-extrabold mb-1 sm:mb-2 text-center">
                    {banner.title}
                  </h2>
                  <p className="text-white/90 text-xs sm:text-sm md:text-lg text-center">
                    {banner.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-transform hover:scale-110 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-transform hover:scale-110 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-amber-400 shadow-lg scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 overflow-hidden rounded-b-xl">
            <div
              key={currentSlide} // reset animation on slide change
              className="h-full bg-amber-400 animate-progress"
            />
          </div>
        </div>

        {/* Slide Counter */}
        <div className="flex justify-center items-center mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-600 font-medium">
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
          animation: progress 5s linear forwards;
        }
      `}</style>
    </section>
  );
};

export default PremiumBannerCarousel;
