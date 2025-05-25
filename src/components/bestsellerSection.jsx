import React, { useState, useRef, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  ArrowUp,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { get } from "../Services/apicallMethode";
import QazmiCart from "./commonProductModal";
import QazmiCartProdcut from "./commonProductModal";
import calculateMrp from "../utils/commonFunctions";

const BestsellersSection = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log("gettingProductLog", products);

  const bestSellerCall = async () => {
    try {
      const responsedata = await get("/product/all");
      console.log("responsedata", responsedata);
      setProducts(responsedata);
    } catch (error) {
      console.log("getting error", error);
    }
  };

  useEffect(() => {
    bestSellerCall();
  }, []);

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

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 5
      );
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: -container.clientWidth / 2,
        behavior: "smooth",
      });
      setTimeout(checkScrollability, 500);
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: container.clientWidth / 2,
        behavior: "smooth",
      });
      setTimeout(checkScrollability, 500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      checkScrollability();
      window.addEventListener("resize", checkScrollability);

      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, []);

  const viewPagePree = (id) => {
    navigate(`/ProductPage/${id}`);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-xl sm:text-4xl md:text-4xl font-serif text-center mb-8 font-black">
          Discover Bestsellers
        </h2>

        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute top-1/2 -left-0 md:-left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute top-1/2 -right-0 md:-right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div>
            {/* For small screens - Grid view */}
            <div className="grid grid-cols-2 gap-1 sm:hidden px-2">
              {products.slice(0, 8)?.map((product) => (
                <div key={product.id} className="bg-white p-2">
                  <img
                    src={product.images[0]}
                    className="w-full h-[235px] object-cover pointer-events-none select-none"
                    alt={product.name}
                    onClick={() => viewPagePree(product._id)}
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
                  <h3 className="text-xs sm:text-s mt-2 text-center font-Lato">
                    {product.name.slice(0, 30)}
                  </h3>
                  <div className="flex justify-center items-center mt-1">
                    <span className="text-primary line-through mr-2 text-xs sm:text-s">
                      Rs. {Number(product.mrp).toFixed(2)}
                    </span>
                    <span className="text-black font-medium text-xs sm:text-s">
                      Rs.{" "}
                      {calculateMrp(
                        Number(product.mrp),
                        Number(product.discount)
                      ).toFixed(2)}
                    </span>
                    <span className="bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded">
                      {product.discount}% OFF
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* For medium and larger screens - Slider */}
            <div
              ref={scrollContainerRef}
              className="hidden sm:flex overflow-x-auto pb-6 scrollbar-hide snap-x"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products?.map((product) => (
                <div
                  key={product.id}
                  className="snap-start flex-shrink-0 mx-2 w-[90%] sm:w-[33.33%] lg:w-[25%] max-w-[320px]"
                >
                  <div className="bg-white rounded overflow-hidden shadow-sm relative h-[500px] group">
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-sm z-[2]">
                      Sale
                    </div>
                    <div className="relative z-0">
                      <img
                        src={product.images[0]}
                        className="w-full h-[430px] object-cover pointer-events-none select-none"
                        alt={product.name}
                        onClick={() => viewPagePree(product._id)}
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
                      {/* Invisible overlay to prevent right-click */}
                      <div
                        className="absolute inset-0 z-[1] cursor-pointer"
                        onClick={() => viewPagePree(product._id)}
                        onContextMenu={handleContextMenu}
                      />
                    </div>
                    <div className="absolute bottom-250 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-[3]">
                      <button
                        className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full shadow-lg transition duration-300 ease-in-out"
                        aria-label="Add to cart"
                        onClick={() => {
                          setIsCartOpen(true);
                          setSelectedProduct(product);
                        }}
                      >
                        <ShoppingBasket size={20} />
                      </button>
                      {isCartOpen && selectedProduct && (
                        <QazmiCartProdcut
                          isOpen={isCartOpen}
                          setIsOpen={setIsCartOpen}
                          productdata={selectedProduct}
                        />
                      )}
                    </div>
                    <div className="px-4 mt-2">
                      <h3 className="text-sm font-normal text-center font-Lato">
                        {product.name.slice(0, 30)}
                      </h3>
                      <div className="flex justify-center items-center mt-1">
                        <span className="text-primary line-through mr-2 text-xs sm:text-s">
                          Rs. {Number(product.mrp).toFixed(2)}
                        </span>
                        <span className="text-black font-medium text-xs sm:text-s">
                          Rs.{" "}
                          {calculateMrp(
                            Number(product.mrp),
                            Number(product.discount)
                          ).toFixed(2)}
                        </span>
                        <span className="bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded">
                          {product.discount}% OFF
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={scrollToTop}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 shadow-lg"
        >
          <ArrowUp size={24} />
        </button>
      </div>

      {/* Enhanced CSS for hiding scrollbar and preventing image downloads */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

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
      `}</style>
    </section>
  );
};

export default BestsellersSection;
