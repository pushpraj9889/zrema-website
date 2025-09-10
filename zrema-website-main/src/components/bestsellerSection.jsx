import React, { useState, useRef, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  ArrowUp,
  ShoppingBasket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { get } from "../Services/apicallMethode";
import QazmiCartProduct from "./commonProductModal";
import calculateMrp from "../utils/commonFunctions";
import { addTocartAction } from "../redux/actions";
import { useDispatch } from "react-redux";

const BestsellersSection = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch products
  const bestSellerCall = async () => {
    try {
      const responsedata = await get("/product/all");
      setProducts(responsedata);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  useEffect(() => {
    bestSellerCall();
  }, []);

  // Add to cart
  const addtoCart = (productdata) => {
    dispatch(addTocartAction(productdata));
  };

  // Buy it now
  const buyitNow = (productdata) => {
    dispatch(addTocartAction(productdata));
    navigate("/CheckoutPage");
  };

  // Prevent context menu + drag
  const handleContextMenu = (e) => e.preventDefault();
  const handleDragStart = (e) => e.preventDefault();

  // Disable dev shortcuts
  const handleKeyDown = (e) => {
    if (
      (e.ctrlKey && (e.keyCode === 83 || e.keyCode === 65)) || // Ctrl+S / Ctrl+A
      e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I/J
      (e.ctrlKey && e.keyCode === 85) // Ctrl+U
    ) {
      e.preventDefault();
      return false;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll handling
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
    scrollContainerRef.current?.scrollBy({
      left: -scrollContainerRef.current.clientWidth / 2,
      behavior: "smooth",
    });
    setTimeout(checkScrollability, 500);
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({
      left: scrollContainerRef.current.clientWidth / 2,
      behavior: "smooth",
    });
    setTimeout(checkScrollability, 500);
  };

  useEffect(() => {
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

  // Scroll to top button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const viewPagePree = (id) => {
    navigate(`/ProductPage/${id}`);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-xl sm:text-4xl font-serif text-center mb-8 font-black">
          Discover Bestsellers
        </h2>

        <div className="relative">
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute top-1/2 -left-2 sm:-left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute top-1/2 -right-2 sm:-right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div>
            {/* Small screens - Grid */}
            <div className="grid grid-cols-2 gap-3 sm:hidden px-2">
              {products.slice(0, 8)?.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-2 cursor-pointer rounded shadow-sm"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-[220px] object-cover rounded pointer-events-none select-none"
                    onContextMenu={handleContextMenu}
                    onDragStart={handleDragStart}
                    draggable={false}
                  />
                  <h3 className="text-sm mt-2 text-center font-Lato">
                    {product.name.slice(0, 30)}
                  </h3>
                  <div className="flex justify-center gap-2 mt-1 items-center">
                    <span className="line-through text-xs text-gray-400">
                      Rs. {Number(product.mrp).toFixed(2)}
                    </span>
                    <span className="text-black font-medium text-xs">
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
                  <div className="mt-3 space-y-2">
                    <button
                      className="w-full py-2 bg-pink-400 hover:bg-pink-500 text-white text-sm font-medium rounded"
                      onClick={() => addtoCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="w-full py-2 border border-gray-300 hover:border-gray-400 text-sm font-medium rounded"
                      onClick={() => buyitNow(product)}
                    >
                      Buy it Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Medium & Large screens - Slider */}
            <div
              ref={scrollContainerRef}
              className="hidden sm:flex overflow-x-auto pb-6 scrollbar-hide snap-x"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products?.map((product) => (
                <div
                  key={product._id}
                  className="snap-start flex-shrink-0 mx-2 w-[90%] sm:w-[33.33%] lg:w-[25%] max-w-[320px]"
                >
                  <div className="bg-white rounded overflow-hidden shadow-sm relative h-[500px] group">
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-sm z-[2]">
                      Sale
                    </div>
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-[430px] object-cover rounded pointer-events-none select-none"
                        onContextMenu={handleContextMenu}
                        onDragStart={handleDragStart}
                        draggable={false}
                      />
                      <div
                        className="absolute inset-0 z-[1] cursor-pointer"
                        onClick={() => viewPagePree(product._id)}
                        onContextMenu={handleContextMenu}
                      />
                    </div>

                    {/* Hover Add to Cart Icon */}
                    <div className="absolute bottom-24 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-[3]">
                      <button
                        className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full shadow-lg"
                        aria-label="Add to cart"
                        onClick={() => {
                          setIsCartOpen(true);
                          setSelectedProduct(product);
                        }}
                      >
                        <ShoppingBasket size={20} />
                      </button>
                      {isCartOpen && selectedProduct && (
                        <QazmiCartProduct
                          isOpen={isCartOpen}
                          setIsOpen={setIsCartOpen}
                          productdata={selectedProduct}
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="px-2 py-1">
                      <h3 className="text-sm text-center font-Lato">
                        {product.name.slice(0, 30)}
                      </h3>
                      <div className="flex justify-center items-center gap-2 mt-1">
                        <span className="line-through text-xs text-gray-400">
                          Rs. {Number(product.mrp).toFixed(2)}
                        </span>
                        <span className="text-black font-medium text-xs">
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

                  {/* Buttons */}
                  <div className="mt-3 space-y-2">
                    <button
                      className="w-full py-2 bg-pink-400 hover:bg-pink-500 text-white text-sm font-medium rounded"
                      onClick={() => addtoCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="w-full py-2 border border-gray-300 hover:border-gray-400 text-sm font-medium rounded"
                      onClick={() => buyitNow(product)}
                    >
                      Buy it Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
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

      {/* Hide scrollbar + Prevent download */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        img {
          user-select: none;
          -webkit-user-drag: none;
          -webkit-touch-callout: none;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default BestsellersSection;
