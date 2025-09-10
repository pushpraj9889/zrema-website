import { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Clock,
  CheckCircle,
  ShoppingBag,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocartAction } from "../redux/actions";
import QazmiCart from "./cat";
import calculateMrp from "../utils/commonFunctions";

export default function QazmiCartProdcut({
  isOpen,
  setIsOpen,
  productdata,
  onProductChange,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  // Get all products from Redux store
  const allProducts = useSelector((state) => state.products?.products || []);

  const [selectIndex, setSelectIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [productsCarouselIndex, setProductsCarouselIndex] = useState(0);
  const [isProductCarouselTransitioning, setIsProductCarouselTransitioning] =
    useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Auto-play main product images carousel
  useEffect(() => {
    if (!productdata?.images || productdata.images.length <= 1) return;

    const interval = setInterval(() => {
      nextImage();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentImageIndex, productdata?.images]);

  // Auto-play products carousel
  useEffect(() => {
    if (!allProducts || allProducts.length <= 1) return;

    const interval = setInterval(() => {
      nextProduct();
    }, 3000);

    return () => clearInterval(interval);
  }, [productsCarouselIndex, allProducts]);

  // Reset image index when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [productdata]);

  // Check scroll position for navigation buttons
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Handle infinite scroll for image thumbnails
  const handleImageScroll = (direction) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const itemWidth =
      container.querySelector(".thumbnail-item")?.offsetWidth || 64;
    const gap = 8; // gap-2 = 8px
    const scrollAmount = itemWidth + gap;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount * 2, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount * 2, behavior: "smooth" });
    }

    setTimeout(checkScrollPosition, 300);
  };

  // Initialize scroll position check
  useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollPosition();
    }, 100);

    return () => clearTimeout(timer);
  }, [productdata?.images]);

  if (!isOpen) return null;

  const onClick = (index) => {
    setSelectIndex(index);
  };

  const nextImage = () => {
    if (!productdata?.images || productdata.images.length === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) =>
        prev === productdata.images.length - 1 ? 0 : prev + 1
      );
      setIsTransitioning(false);
    }, 150);
  };

  const prevImage = () => {
    if (!productdata?.images || productdata.images.length === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) =>
        prev === 0 ? productdata.images.length - 1 : prev - 1
      );
      setIsTransitioning(false);
    }, 150);
  };

  const handleImageSelect = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsTransitioning(false);
    }, 150);

    // Auto-scroll the selected thumbnail into view
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const thumbnailElement = container.children[index];
      if (thumbnailElement) {
        thumbnailElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  // Products carousel functions
  const nextProduct = () => {
    if (!allProducts || allProducts.length === 0) return;

    setIsProductCarouselTransitioning(true);
    setTimeout(() => {
      setProductsCarouselIndex((prev) =>
        prev === allProducts.length - 1 ? 0 : prev + 1
      );
      setIsProductCarouselTransitioning(false);
    }, 150);
  };

  const prevProduct = () => {
    if (!allProducts || allProducts.length === 0) return;

    setIsProductCarouselTransitioning(true);
    setTimeout(() => {
      setProductsCarouselIndex((prev) =>
        prev === 0 ? allProducts.length - 1 : prev - 1
      );
      setIsProductCarouselTransitioning(false);
    }, 150);
  };

  const handleProductSelect = (product, index) => {
    setIsProductCarouselTransitioning(true);
    setTimeout(() => {
      setProductsCarouselIndex(index);
      setIsProductCarouselTransitioning(false);
      if (onProductChange) {
        onProductChange(product);
      }
    }, 150);
  };

  const addtoCart = () => {
    dispatch(addTocartAction(productdata));
    setIsCartOpen(true);
  };

  const buyitNow = () => {
    dispatch(addTocartAction(productdata));
    navigate("/CheckoutPage");
  };

  // Get visible products for carousel (show 3 at a time)
  const getVisibleProducts = () => {
    if (!allProducts || allProducts.length === 0) return [];

    const visibleCount = 3;
    const extendedProducts = [...allProducts, ...allProducts, ...allProducts];
    const startIndex = productsCarouselIndex;

    return extendedProducts
      .slice(startIndex, startIndex + visibleCount)
      .map((product, idx) => ({
        ...product,
        originalIndex: (startIndex + idx) % allProducts.length,
      }));
  };

  // Create extended array for infinite scroll effect
  const getExtendedImages = () => {
    if (!productdata?.images || productdata.images.length === 0) return [];

    // If only one image, return it
    if (productdata.images.length === 1) return productdata.images;

    // For multiple images, create extended array for infinite scroll
    return [
      ...productdata.images,
      ...productdata.images,
      ...productdata.images,
    ];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 overflow-hidden">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gray-800 bg-opacity-60 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Cart panel */}
        <div className="absolute inset-y-0 right-0 max-w-full flex">
          <div className="relative w-screen max-w-md md:max-w-lg lg:max-w-xl">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-pink-400 to-pink-600 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
                <button
                  className="p-1 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-lg font-medium text-white">
                  Product Details
                </h2>
                <button
                  className="p-1 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-4 py-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {productdata?.name}
                </h3>

                {/* Main Image Container */}
                <div className="mt-3 bg-gray-50 rounded-lg relative">
                  {/* Main image with navigation arrows */}
                  <div className="aspect-square w-full bg-pink-50 flex items-center justify-center rounded-lg overflow-hidden relative group">
                    {productdata?.images && productdata.images.length > 0 ? (
                      <>
                        <img
                          src={productdata.images[currentImageIndex]}
                          alt={`${productdata?.name} - Image ${
                            currentImageIndex + 1
                          }`}
                          className={`object-cover w-full h-full transition-all duration-300 ${
                            isTransitioning
                              ? "opacity-70 scale-105"
                              : "opacity-100 scale-100"
                          }`}
                        />

                        {/* Navigation arrows for main images */}
                        {productdata.images.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </>
                        )}

                        {/* Main image counter */}
                        {productdata.images.length > 1 && (
                          <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                            {currentImageIndex + 1} /{" "}
                            {productdata.images.length}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <ShoppingBag className="h-16 w-16 text-pink-300" />
                      </div>
                    )}
                  </div>

                  {/* Enhanced Image Thumbnails Carousel - Bottom of main image */}
                  {productdata?.images && productdata.images.length > 1 && (
                    <div className="mt-3 relative">
                      {/* Navigation buttons for thumbnails */}
                      <div className="flex items-center justify-between mb-2">
                        <button
                          onClick={() => handleImageScroll("left")}
                          disabled={!canScrollLeft}
                          className={`p-2 rounded-full transition-all z-10 ${
                            canScrollLeft
                              ? "bg-pink-100 hover:bg-pink-200 text-pink-600 shadow-sm"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <ChevronLeft size={16} />
                        </button>

                        <span className="text-xs text-gray-500 font-medium">
                          {currentImageIndex + 1} of {productdata.images.length}{" "}
                          images
                        </span>

                        <button
                          onClick={() => handleImageScroll("right")}
                          disabled={!canScrollRight}
                          className={`p-2 rounded-full transition-all z-10 ${
                            canScrollRight
                              ? "bg-pink-100 hover:bg-pink-200 text-pink-600 shadow-sm"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>

                      {/* Infinite scroll thumbnails container */}
                      <div className="relative bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                        <div
                          ref={scrollContainerRef}
                          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
                          onScroll={checkScrollPosition}
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            WebkitScrollbar: { display: "none" },
                          }}
                        >
                          {getExtendedImages().map((image, idx) => {
                            const actualIndex = idx % productdata.images.length;
                            const isSelected =
                              actualIndex === currentImageIndex;

                            return (
                              <div
                                key={`thumb-${idx}`}
                                onClick={() => handleImageSelect(actualIndex)}
                                className={`thumbnail-item flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                                  isSelected
                                    ? "border-pink-500 shadow-lg ring-2 ring-pink-200 scale-105"
                                    : "border-gray-200 hover:border-pink-300 hover:shadow-md hover:scale-102"
                                }`}
                              >
                                <img
                                  src={image}
                                  alt={`Thumbnail ${actualIndex + 1}`}
                                  className={`object-cover w-full h-full transition-all duration-200 ${
                                    isSelected
                                      ? "opacity-100"
                                      : "opacity-80 hover:opacity-95"
                                  }`}
                                />

                                {/* Selected indicator overlay */}
                                {isSelected && (
                                  <div className="absolute inset-0 bg-pink-500/10 flex items-center justify-center">
                                    <div className="w-3 h-3 bg-pink-500 rounded-full shadow-sm"></div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Fade gradients for scroll indication */}
                        {canScrollLeft && (
                          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
                        )}
                        {canScrollRight && (
                          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
                        )}
                      </div>

                      {/* Enhanced dot indicators */}
                      <div className="flex justify-center mt-3 space-x-1.5">
                        {productdata.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleImageSelect(idx)}
                            className={`transition-all duration-200 rounded-full ${
                              idx === currentImageIndex
                                ? "w-6 h-2 bg-pink-500 shadow-sm"
                                : "w-2 h-2 bg-gray-300 hover:bg-pink-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Price section */}
                <div className="flex items-center mt-4">
                  <span className="text-pink-500 line-through text-sm mr-2">
                    Rs. {Number(productdata.mrp).toFixed(2)}
                  </span>
                  <span className="text-gray-900 font-bold text-xl">
                    Rs.{" "}
                    {calculateMrp(
                      Number(productdata.mrp),
                      Number(productdata.discount)
                    ).toFixed(2)}
                  </span>

                  <span className="ml-2 px-2 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">
                    Save {productdata.discount} %
                  </span>
                </div>

                {/* Fabric section */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Fabric
                  </h4>
                  <div className="inline-block border border-pink-300 rounded-md px-4 py-2 text-sm bg-pink-50 text-pink-700">
                    {productdata?.fabric || "Premium Cotton"}
                  </div>
                </div>

                {/* Size section */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Size
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {productdata?.size?.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => onClick(index)}
                        className={`h-10 min-w-10 px-3 flex items-center justify-center rounded-md transition-all ${
                          selectIndex === index
                            ? "bg-pink-500 text-white shadow-md shadow-pink-200"
                            : "bg-gray-100 text-gray-800 hover:bg-pink-100"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* All Products Section */}
                {allProducts && allProducts.length > 1 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center justify-between">
                      <span>More Products</span>
                      <span className="text-xs text-gray-500">
                        {productsCarouselIndex + 1} / {allProducts.length}
                      </span>
                    </h4>

                    <div className="relative bg-gray-50 rounded-lg p-3">
                      {/* Products carousel navigation */}
                      <div className="flex items-center justify-between mb-3">
                        <button
                          onClick={prevProduct}
                          className="p-2 rounded-full bg-white shadow-sm hover:bg-pink-50 hover:shadow-md text-pink-600 transition-all"
                        >
                          <ChevronLeft size={18} />
                        </button>

                        <span className="text-xs font-medium text-gray-600">
                          Swipe to explore
                        </span>

                        <button
                          onClick={nextProduct}
                          className="p-2 rounded-full bg-white shadow-sm hover:bg-pink-50 hover:shadow-md text-pink-600 transition-all"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      {/* Products grid */}
                      <div className="grid grid-cols-3 gap-2">
                        {getVisibleProducts().map((product, idx) => {
                          const isCurrentProduct =
                            product.id === productdata?.id;

                          return (
                            <div
                              key={`${product.originalIndex}-${idx}`}
                              onClick={() =>
                                handleProductSelect(
                                  product,
                                  product.originalIndex
                                )
                              }
                              className={`cursor-pointer rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200 ${
                                isCurrentProduct
                                  ? "ring-2 ring-pink-500 shadow-lg"
                                  : "hover:scale-105"
                              } ${
                                isProductCarouselTransitioning
                                  ? "opacity-70"
                                  : "opacity-100"
                              }`}
                            >
                              {/* Product image */}
                              <div className="aspect-square bg-pink-50 overflow-hidden">
                                <img
                                  src={
                                    product.images?.[0] ||
                                    "/placeholder-image.jpg"
                                  }
                                  alt={product.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>

                              {/* Product info */}
                              <div className="p-2">
                                <h5 className="text-xs font-medium text-gray-900 truncate">
                                  {product.name}
                                </h5>
                                <div className="flex items-center mt-1">
                                  <span className="text-pink-600 font-bold text-sm">
                                    Rs.{" "}
                                    {calculateMrp(
                                      Number(product.mrp),
                                      Number(product.discount)
                                    ).toFixed(0)}
                                  </span>
                                  {product.discount > 0 && (
                                    <span className="ml-1 text-xs text-gray-500 line-through">
                                      Rs. {Number(product.mrp).toFixed(0)}
                                    </span>
                                  )}
                                </div>
                                {product.discount > 0 && (
                                  <span className="inline-block mt-1 px-1 py-0.5 bg-pink-100 text-pink-700 text-xs rounded">
                                    {product.discount}% OFF
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Products carousel dots */}
                      <div className="flex justify-center mt-3 space-x-1">
                        {allProducts.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setProductsCarouselIndex(idx);
                              if (onProductChange) {
                                onProductChange(allProducts[idx]);
                              }
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                              idx === productsCarouselIndex
                                ? "bg-pink-500"
                                : "bg-gray-300 hover:bg-pink-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Product highlights */}
                <div className="mt-6 py-2 px-4 bg-gray-50 rounded-md text-sm text-gray-700">
                  <p className="text-xs text-black-900 font-semibold mb-2">
                    Product Highlights:
                  </p>
                  <div>
                    <ul className="list-none space-y-1">
                      {productdata?.description
                        ?.split("\n")
                        ?.filter((line) => /^[🤎🧵👗🌿🎉🪡]/.test(line.trim()))
                        ?.map((line, index) => {
                          const [emoji, ...rest] = line.trim().split(" ");
                          return (
                            <li key={index} className="flex items-start gap-2">
                              <span>{emoji}</span>
                              <span>{rest.join(" ")}</span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={addtoCart}
                    type="button"
                    className="w-full bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white font-medium rounded-lg py-3 flex items-center justify-center transition-all shadow-md shadow-pink-200"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to cart
                  </button>

                  <button
                    type="button"
                    className="w-full border-2 border-pink-500 text-pink-600 hover:bg-pink-50 py-3 rounded-lg font-medium transition-all flex items-center justify-center"
                    onClick={buyitNow}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Buy it now
                  </button>
                </div>

                {/* Delivery info */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between bg-green-50 px-4 py-3 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm font-medium">
                        Shipped today?
                      </span>
                    </div>
                    <span className="text-green-600 text-sm font-medium">
                      Order within: 01:57:36
                    </span>
                  </div>

                  <div className="space-y-2 bg-gray-50 px-4 py-3 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-pink-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Assured Quality
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-pink-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        100% Purchase Protection
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-pink-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Free Delivery on orders above Rs. 599
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cart modal */}
                {isCartOpen && (
                  <QazmiCart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-smooth {
          scroll-behavior: smooth;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
