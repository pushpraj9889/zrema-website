import { useEffect, useState, useRef, useCallback } from "react";
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
  const thumbnailsRef = useRef(null);
  const mainImageRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Scroll to top when component mounts or when id changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  // Additional scroll to top when product data loads
  useEffect(() => {
    if (product && !isLoading) {
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 100);
    }
  }, [product, isLoading]);

  // Prevent context menu & drag on images
  const handleContextMenu = (e) => e.preventDefault();
  const handleDragStart = (e) => e.preventDefault();

  const getProductById = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.zrema.com/product/${id}`);
      if (response?.data) {
        setProduct(response.data);
        if (response.data.colors?.length > 0) {
          setSelectedColor(response.data.colors[0]);
        }
        if (response.data.size?.length > 0) {
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

  // Smooth scroll to thumbnail
  const scrollToThumbnail = useCallback((index) => {
    if (thumbnailsRef.current && !isScrolling) {
      const thumbnailElements = thumbnailsRef.current.querySelectorAll('[data-thumbnail]');
      const targetThumbnail = thumbnailElements[index];
      
      if (targetThumbnail) {
        const container = thumbnailsRef.current;
        const containerRect = container.getBoundingClientRect();
        const thumbnailRect = targetThumbnail.getBoundingClientRect();
        
        // Calculate scroll position to center the thumbnail
        const scrollTop = container.scrollTop + thumbnailRect.top - containerRect.top - 
          (containerRect.height / 2) + (thumbnailRect.height / 2);
        
        container.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }

    // Scroll bottom carousel
    if (carouselRef.current) {
      const carouselElements = carouselRef.current.querySelectorAll('[data-carousel]');
      const targetCarousel = carouselElements[index];
      
      if (targetCarousel) {
        const container = carouselRef.current;
        const containerRect = container.getBoundingClientRect();
        const carouselRect = targetCarousel.getBoundingClientRect();
        
        const scrollLeft = container.scrollLeft + carouselRect.left - containerRect.left - 
          (containerRect.width / 2) + (carouselRect.width / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [isScrolling]);

  // Handle wheel scroll on main image
  const handleImageScroll = useCallback((e) => {
    if (!product?.images || product.images.length <= 1) return;
    
    e.preventDefault();
    
    if (isScrolling) return;
    
    setIsScrolling(true);
    
    const delta = e.deltaY;
    const threshold = 50;
    
    if (Math.abs(delta) > threshold) {
      setCurrentImage(prev => {
        let newIndex;
        if (delta > 0) {
          // Scroll down - next image
          newIndex = prev < product.images.length - 1 ? prev + 1 : 0;
        } else {
          // Scroll up - previous image
          newIndex = prev > 0 ? prev - 1 : product.images.length - 1;
        }
        
        // Scroll thumbnails to match
        setTimeout(() => scrollToThumbnail(newIndex), 0);
        
        return newIndex;
      });
    }
    
    // Reset scrolling flag after animation
    setTimeout(() => setIsScrolling(false), 300);
  }, [product?.images, isScrolling, scrollToThumbnail]);

  // Add wheel event listener to main image
  useEffect(() => {
    const imageContainer = mainImageRef.current;
    if (imageContainer) {
      imageContainer.addEventListener('wheel', handleImageScroll, { passive: false });
      return () => imageContainer.removeEventListener('wheel', handleImageScroll);
    }
  }, [handleImageScroll]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!product?.images || product.images.length <= 1) return;
      
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        scrollCarousel('left');
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        scrollCarousel('right');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [product?.images]);

  const addToCart = () => {
    if (!product) return;
    const productToAdd = { ...product, selectedSize, selectedColor };
    dispatch(addTocartAction(productToAdd));
    setIsCartOpen(true);
  };

  const buyitNow = () => {
    dispatch(addTocartAction(product));
    navigate("/CheckoutPage");
  };

  const scrollCarousel = (direction) => {
    if (!product?.images || isScrolling) return;
    
    setIsScrolling(true);
    
    setCurrentImage((prev) => {
      let newIndex;
      if (direction === "left") {
        newIndex = prev > 0 ? prev - 1 : product.images.length - 1;
      } else {
        newIndex = prev < product.images.length - 1 ? prev + 1 : 0;
      }
      
      // Scroll thumbnails to match
      setTimeout(() => scrollToThumbnail(newIndex), 0);
      
      return newIndex;
    });
    
    setTimeout(() => setIsScrolling(false), 300);
  };

  const handleImageSelect = (index) => {
    if (isScrolling) return;
    
    setCurrentImage(index);
    scrollToThumbnail(index);
  };

  // Touch/swipe handling for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      scrollCarousel('right');
    } else if (isRightSwipe) {
      scrollCarousel('left');
    }
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
                {/* Thumbnails */}
                {product.images?.length > 1 && (
                  <div 
                    ref={thumbnailsRef}
                    className="hidden lg:flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  >
                    {product.images.map((image, index) => (
                      <div key={`thumb-${index}`} className="relative">
                        <button
                          data-thumbnail
                          className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                            currentImage === index
                              ? "border-green-500 ring-2 ring-green-200"
                              : "border-transparent hover:border-gray-300"
                          }`}
                          onClick={() => handleImageSelect(index)}
                        >
                          <img
                            src={image}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            className="w-full h-full object-cover select-none"
                            onContextMenu={handleContextMenu}
                            onDragStart={handleDragStart}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Main Image */}
                <div 
                  ref={mainImageRef}
                  className="relative rounded-lg overflow-hidden bg-gray-100 w-full cursor-pointer select-none"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {product.images?.length > 0 ? (
                    <div className="relative">
                      <img
                        src={product.images[currentImage]}
                        alt={product.name}
                        className="w-full h-full object-contain aspect-square select-none transition-opacity duration-300"
                        onContextMenu={handleContextMenu}
                        onDragStart={handleDragStart}
                      />
                      
                      {/* Scroll hint overlay */}
                      {product.images.length > 1 && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                            Scroll or use arrow keys to browse
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-96 bg-gray-100">
                      <p className="text-gray-500">No image available</p>
                    </div>
                  )}

                  {/* Sale badge */}
                  {product.onSale && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-medium rounded-md">
                      Sale
                    </div>
                  )}

                  {/* Image counter */}
                  {product.images?.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 text-sm rounded-md backdrop-blur-sm">
                      {currentImage + 1} / {product.images.length}
                    </div>
                  )}

                  {/* Nav buttons */}
                  {product.images?.length > 1 && (
                    <>
                      <button
                        onClick={() => scrollCarousel("left")}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                        disabled={isScrolling}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => scrollCarousel("right")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                        disabled={isScrolling}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom carousel */}
              {product.images?.length > 1 && (
                <div
                  ref={carouselRef}
                  className="flex gap-3 overflow-x-auto scrollbar-hide mt-6 pb-2"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {product.images.map((image, index) => (
                    <button
                      key={`carousel-${index}`}
                      data-carousel
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                        currentImage === index
                          ? "border-green-500 ring-2 ring-green-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleImageSelect(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover select-none"
                        onContextMenu={handleContextMenu}
                        onDragStart={handleDragStart}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-2/5 xl:w-1/2 lg:mt-0">
            <h1 className="text-xl font-bold text-gray-700 mb-2">
              {product.name}
            </h1>

            <div className="flex items-baseline mb-2">
              <p className="text-xl font-bold text-gray-700">
                ₹{calculateMrp(product.mrp, product.discount)}
              </p>
            </div>

            <div className="border-t border-gray-200 my-1"></div>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900">Color</h3>
                  <span className="text-sm text-gray-600">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-green-500 border-white shadow-lg"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
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

            {/* Sizes */}
            {product.size?.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900">Size</h3>
                  <button
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setShowSizeChart(true)}
                  >
                    <Ruler className="w-4 h-4 mr-1" /> Size guide
                  </button>
                </div>
                {showSizeChart && (
                  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="w-full max-w-4xl bg-white p-4 rounded-md">
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
                      className={`min-w-12 h-12 px-4 flex items-center justify-center rounded-md transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-pink-500 text-white shadow-lg"
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

            {product.product_code && (
              <p className="text-sm text-gray-600 mb-8">
                SKU: <span className="font-medium">{product.product_code}</span>
              </p>
            )}

            <div className="space-y-4 mt-8">
              <button
                onClick={addToCart}
                className="w-full text-white bg-pink-500 hover:bg-pink-600 py-3 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <ShoppingBag className="w-5 h-5 mr-2" /> Add to cart
              </button>
              <button
                onClick={buyitNow}
                className="w-full py-3 border border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                Buy it now <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>

            {product.description && (
              <div className="mt-2">
                <h3 className="font-medium text-gray-900 mb-1">Description</h3>
                <div className="prose prose-sm text-gray-700">
                  {product.description.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isCartOpen && <QazmiCart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { 
          display: none; 
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </div>
  );
}