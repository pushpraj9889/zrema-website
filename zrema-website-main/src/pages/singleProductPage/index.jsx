import { useEffect, useState, useRef } from "react";
import {
  Heart,
  Share2,
  ChevronRight,
  Ruler,
  ShoppingBag,
  ArrowRight,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { addTocartAction } from "../../redux/actions";
import QazmiCart from "../../components/cat";
import { useDispatch } from "react-redux";
import axios from "axios";
import SizeChart from "../../components/sizecart";
import calculateMrp from "../../utils/commonFunctions";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [carouselCurrentIndex, setCarouselCurrentIndex] = useState(0);

  // Scroll to top when component mounts or when id changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  // Additional scroll to top when product data loads
  useEffect(() => {
    if (product && !isLoading) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 100);
    }
  }, [product, isLoading]);

  // Function to prevent right-click context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  // Function to prevent drag start
  const handleDragStart = (e) => {
    e.preventDefault();
    return false;
  };

  // Function to prevent keyboard shortcuts for saving images
  const handleKeyDown = (e) => {
    // Prevent Ctrl+S, Ctrl+A, F12, etc.
    if (
      (e.ctrlKey && (e.keyCode === 83 || e.keyCode === 65)) || // Ctrl+S, Ctrl+A
      e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
      (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
      (e.ctrlKey && e.keyCode === 85) // Ctrl+U
    ) {
      e.preventDefault();
      return false;
    }
  };

  useEffect(() => {
    // Add global event listeners to prevent keyboard shortcuts
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Create infinite carousel images
  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      // Create triple array for infinite scroll effect
      const tripleImages = [
        ...product.images,
        ...product.images,
        ...product.images,
      ];
      setCarouselImages(tripleImages);
      // Start from the middle set
      setCarouselCurrentIndex(product.images.length);
    }
  }, [product]);

  // Auto-scroll functionality for carousel - only after product loads
  useEffect(() => {
    if (!isAutoScrolling || carouselImages.length === 0 || !product) return;

    const interval = setInterval(() => {
      setCarouselCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        // Reset to beginning of middle set when reaching end of second set
        if (newIndex >= product.images.length * 2) {
          return product.images.length;
        }
        return newIndex;
      });
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling, carouselImages, product?.images?.length, product]);

  // Sync main image with carousel auto-scroll
  useEffect(() => {
    if (carouselImages.length > 0 && product?.images) {
      const actualImageIndex = carouselCurrentIndex % product.images.length;
      setCurrentImage(actualImageIndex);
    }
  }, [carouselCurrentIndex, carouselImages, product?.images]);

  // Auto-scroll carousel container to keep current image in view
  useEffect(() => {
    if (carouselRef.current && carouselImages.length > 0) {
      const container = carouselRef.current;
      const itemWidth = 112; // Width of each carousel item (28 * 4 = 112px for md size)
      const gap = 12; // Gap between items
      const totalItemWidth = itemWidth + gap;

      const scrollPosition = carouselCurrentIndex * totalItemWidth;

      // Prevent scrolling during initial load
      if (product && !isLoading) {
        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [carouselCurrentIndex, carouselImages, product, isLoading]);

  // Handle manual carousel navigation
  const scrollCarousel = (direction) => {
    setIsAutoScrolling(false);

    setCarouselCurrentIndex((prevIndex) => {
      if (direction === "left") {
        return prevIndex > 0 ? prevIndex - 1 : carouselImages.length - 1;
      } else {
        return prevIndex < carouselImages.length - 1 ? prevIndex + 1 : 0;
      }
    });

    // Resume auto-scroll after 5 seconds
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  // Handle direct image selection
  const handleImageSelect = (imageIndex) => {
    setIsAutoScrolling(false);
    setCurrentImage(imageIndex);

    // Find the corresponding carousel index (prefer middle set)
    const middleSetStart = product.images.length;
    setCarouselCurrentIndex(middleSetStart + imageIndex);

    // Resume auto-scroll after 5 seconds
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  const getProductById = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.zrema.com/product/${id}`);

      if (response?.data) {
        setProduct(response.data);
        // Set defaults when product loads
        if (response.data.colors && response.data.colors.length > 0) {
          setSelectedColor(response.data.colors[0]);
        }
        if (response.data.size && response.data.size.length > 0) {
          setSelectedSize(response.data.size[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setError("Failed to load product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const productToAdd = {
      ...product,
      selectedSize,
      selectedColor,
    };

    dispatch(addTocartAction(productToAdd));
    setIsCartOpen(true);
  };

  const buyitNow = () => {
    console.log("buyitnow");
    dispatch(addTocartAction(product));
    navigate("/CheckoutPage");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-500" />
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center text-center max-w-md">
          <div className="mb-4 text-red-500">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            onClick={getProductById}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-gray-600">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center text-sm font-medium">
          <a href="/" className="text-gray-500 hover:text-gray-900">
            Home
          </a>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />
          <a href="/category" className="text-gray-500 hover:text-gray-900">
            Collection
          </a>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="w-full lg:w-3/5 xl:w-1/2">
            <div className="lg:sticky lg:top-24">
              <div className="lg:flex lg:gap-4">
                {/* Thumbnails - Visible on larger screens */}
                {product.images && product.images.length > 1 && (
                  <div className="hidden lg:flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                    {product.images.map((image, index) => (
                      <div key={`thumb-${index}`} className="relative">
                        <button
                          className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                            currentImage === index
                              ? "border-green-500"
                              : "border-transparent hover:border-gray-300"
                          }`}
                          onClick={() => handleImageSelect(index)}
                        >
                          <img
                            src={image}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            className="w-full h-full object-cover pointer-events-none select-none"
                            onContextMenu={handleContextMenu}
                            onDragStart={handleDragStart}
                            draggable={false}
                            style={{
                              userSelect: "none",
                              WebkitUserSelect: "none",
                              MozUserSelect: "none",
                              msUserSelect: "none",
                              WebkitTouchCallout: "none",
                              WebkitUserDrag: "none",
                              KhtmlUserSelect: "none",
                            }}
                          />
                        </button>
                        {/* Invisible overlay for thumbnails */}
                        <div
                          className="absolute inset-0 z-[1] cursor-pointer"
                          onClick={() => handleImageSelect(index)}
                          onContextMenu={handleContextMenu}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Main Image */}
                <div className="relative rounded-lg overflow-hidden bg-gray-100 w-full">
                  {product.images && product.images.length > 0 ? (
                    <div className="relative">
                      <div className="relative overflow-hidden">
                        <img
                          key={`main-${currentImage}`}
                          src={product.images[currentImage]}
                          alt={product.name}
                          className="w-full h-full object-contain aspect-square pointer-events-none select-none transition-opacity duration-500 ease-in-out"
                          onContextMenu={handleContextMenu}
                          onDragStart={handleDragStart}
                          draggable={false}
                          style={{
                            userSelect: "none",
                            WebkitUserSelect: "none",
                            MozUserSelect: "none",
                            msUserSelect: "none",
                            WebkitTouchCallout: "none",
                            WebkitUserDrag: "none",
                            KhtmlUserSelect: "none",
                          }}
                        />
                      </div>
                      {/* Invisible overlay for main image */}
                      <div
                        className="absolute inset-0 z-[1]"
                        onContextMenu={handleContextMenu}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-96 bg-gray-100">
                      <p className="text-gray-500">No image available</p>
                    </div>
                  )}

                  {/* Sale badge */}
                  {product.onSale && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-medium rounded-md z-[2]">
                      Sale
                    </div>
                  )}

                  {/* Image counter */}
                  {product.images && product.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 text-sm rounded-md z-[2]">
                      {currentImage + 1} / {product.images.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Infinite Scroll Carousel - Positioned at bottom */}
              {product.images && product.images.length > 1 && (
                <div className="mt-6 relative">
                  {/* Carousel Navigation Buttons */}
                  <button
                    onClick={() => scrollCarousel("left")}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                    aria-label="Previous images"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>

                  <button
                    onClick={() => scrollCarousel("right")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                    aria-label="Next images"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>

                  {/* Carousel Container */}
                  <div
                    ref={carouselRef}
                    className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                    onMouseEnter={() => setIsAutoScrolling(false)}
                    onMouseLeave={() => setIsAutoScrolling(true)}
                  >
                    {carouselImages.map((image, index) => {
                      const originalIndex = index % product.images.length;
                      const isActive = currentImage === originalIndex;

                      return (
                        <div
                          key={`carousel-${index}`}
                          className="relative flex-shrink-0"
                        >
                          <button
                            className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                              isActive
                                ? "border-green-500 ring-2 ring-green-200 shadow-lg"
                                : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                            }`}
                            onClick={() => handleImageSelect(originalIndex)}
                          >
                            <img
                              src={image}
                              alt={`${product.name} view ${originalIndex + 1}`}
                              className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-300 hover:scale-105"
                              onContextMenu={handleContextMenu}
                              onDragStart={handleDragStart}
                              draggable={false}
                              style={{
                                userSelect: "none",
                                WebkitUserSelect: "none",
                                MozUserSelect: "none",
                                msUserSelect: "none",
                                WebkitTouchCallout: "none",
                                WebkitUserDrag: "none",
                                KhtmlUserSelect: "none",
                              }}
                            />
                            {/* Active indicator */}
                            {isActive && (
                              <div className="absolute inset-0 border-2 border-green-500 rounded-lg pointer-events-none" />
                            )}
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300" />
                          </button>
                          {/* Invisible overlay for carousel items */}
                          <div
                            className="absolute inset-0 z-[1] cursor-pointer"
                            onClick={() => handleImageSelect(originalIndex)}
                            onContextMenu={handleContextMenu}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Auto-scroll controls and indicator */}
                  <div className="flex justify-center items-center mt-4 gap-4">
                    <button
                      onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                      className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors px-3 py-1 rounded-full hover:bg-gray-100"
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isAutoScrolling
                            ? "bg-green-500 animate-pulse"
                            : "bg-gray-300"
                        }`}
                      />
                      <span>{isAutoScrolling ? "Auto-playing" : "Paused"}</span>
                    </button>

                    {/* Dots indicator */}
                    <div className="flex gap-1">
                      {product.images.map((_, index) => (
                        <button
                          key={`dot-${index}`}
                          onClick={() => handleImageSelect(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentImage === index
                              ? "bg-green-500 scale-125"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-2/5 xl:w-1/2 lg:mt-0">
            <h1 className="text-[18px] sm:text-xl font-bold text-gray-700 mb-2">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline mb-2">
              <p className="text-xl font-bold text-gray-700">
                ₹{calculateMrp(product.mrp, product.discount)}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-1"></div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900">Color</h3>
                  <span className="text-sm text-gray-600">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-green-500 border-white"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Fabric */}
            {product.fabric && (
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-3">Fabric</h3>
                <div className="inline-block bg-gray-100 px-4 py-2 rounded-md text-gray-800">
                  {product.fabric}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.size && product.size.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900">Size</h3>
                  <button
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setShowSizeChart(true)}
                  >
                    <Ruler className="w-4 h-4 mr-1" />
                    <span>Size guide</span>
                  </button>
                </div>
                {showSizeChart && (
                  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="relative w-full max-w-4xl mx-auto bg-white p-4 rounded-md shadow-lg">
                      <SizeChart
                        showSizeChart={showSizeChart}
                        setShowSizeChart={setShowSizeChart}
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      className={`min-w-12 h-12 px-4 flex items-center justify-center rounded-md transition-all ${
                        selectedSize === size
                          ? "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:outline-none text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SKU */}
            {product.product_code && (
              <div className="mb-8">
                <p className="text-sm text-gray-600">
                  SKU:{" "}
                  <span className="font-medium">{product.product_code}</span>
                </p>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="mt-2">
                <h3 className="font-medium text-gray-900 mb-1">Description</h3>
                <div className="prose prose-sm text-gray-700">
                  {product.description.split("\n").map((line, index) => {
                    const isHighlightLine = line.includes(
                      "Product Highlights:"
                    );

                    return (
                      <p
                        key={index}
                        className={
                          isHighlightLine ? "text-black font-semibold" : ""
                        }
                      >
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="space-y-4 mt-8">
              <button
                onClick={addToCart}
                type="button"
                className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2 mt-6 mr-8 flex items-center justify-center w-full"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to cart
              </button>

              <button
                className="w-full py-3 border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium rounded-md flex items-center justify-center transition-colors"
                onClick={buyitNow}
              >
                <span>Buy it now</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <QazmiCart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      )}

      {/* Enhanced CSS for preventing image downloads and carousel styling */}
      <style jsx>{`
        /* Additional protection styles */
        img {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-user-drag: none;
          -webkit-touch-callout: none;
          pointer-events: none;
        }

        /* Disable image context menu on mobile */
        img::-webkit-image-inner-element {
          -webkit-touch-callout: none;
        }

        /* Disable text selection */
        .select-none {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Hide scrollbar for carousel */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Smooth scrolling for carousel */
        .scroll-smooth {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for thumbnail container */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f7fafc;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f7fafc;
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }

        /* Fade in animation for main image transitions */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        /* Ensure page starts at top on mobile */
        html {
          scroll-behavior: smooth;
        }

        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}
