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

const BestsellersSection = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  // More products to demonstrate scrolling
  // console.log("fdsggsjsgjdk", products);
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
      setTimeout(checkScrollability, 500); // Check after animation
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: container.clientWidth / 2,
        behavior: "smooth",
      });
      setTimeout(checkScrollability, 500); // Check after animation
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add listener to update scroll buttons on horizontal scroll
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      checkScrollability(); // Initial check

      // Check on window resize too
      window.addEventListener("resize", checkScrollability);

      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, []);
  const viewPagePree = () => {
    // navigate("./ProductPage");
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">
          Discover Bestsellers
        </h2>

        {/* Products Container with Scroll */}
        <div className="relative px-4" onClick={viewPagePree}>
          {/* Left and Right Arrows */}
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

          {/* Scrollable Product Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 scrollbar-hide snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products?.map((product) => (
              <div
                key={product.id}
                className="min-w-[280px] sm:min-w-[320px] mx-2 flex-shrink-0 snap-start group"
              >
                <div className="bg-white rounded overflow-hidden shadow-sm relative h-[490px] sm:h-[500px]">
                  {/* <div className="bg-white rounded overflow-hidden shadow-sm relative h-full"> */}
                  {/* Sale Badge */}
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-sm z-[2]">
                    Sale
                  </div>

                  {/* Add to Bag Button (appears on hover) */}

                  {/* Product Image */}
                  <div className="relative z-0">
                    <img
                      src={product.images[0]}
                      // alt={product.name}
                      className="w-full h-[430px] object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="absolute bottom-190 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="bg-green-600 text-white p-2 rounded-full shadow-md hover:bg-green-800"
                      aria-label="Add to bag"
                    >
                      <ShoppingBasket onClick={() => setIsCartOpen(true)} />
                      {isCartOpen && (
                        <QazmiCartProdcut
                          isOpen={isCartOpen}
                          setIsOpen={setIsCartOpen}
                          productdata={product}
                        />
                      )}
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg> */}
                    </button>
                  </div>
                  <div className="px-4 mt-2">
                    <h3 className="text-sm font-normal  text-center font-Lato">
                      {product.name.slice(0, 30)}
                    </h3>
                    <div className="flex justify-center items-center mb-2">
                      <span className="text-primary line-through mr-2  ">
                        Rs. {product.mrp?.toFixed(2)}
                      </span>
                      <span className="text-black font-medium">
                        Rs. {product.mrp?.toFixed(2)}
                      </span>
                    </div>

                    {/* Color Options */}
                    {/* <div className="flex justify-center mt-3">
                      {product?.colors?.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full border border-gray-300 mx-1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={scrollToTop}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 shadow-lg"
        >
          <ArrowUp size={24} />
        </button>
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default BestsellersSection;
