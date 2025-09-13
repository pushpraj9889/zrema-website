
import React, { useState, useRef, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  ArrowUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { get } from "../Services/apicallMethode";
import calculateMrp from "../utils/commonFunctions";
import { addTocartAction } from "../redux/actions";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import QazmiCart from "./cat";

const QazmiBestsellers = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const bestSellerCall = async () => {
    try {
      const responsedata = await get("/product/all");
      setProducts(responsedata);

      const initialSizes = {};
      responsedata.forEach((product) => {
        if (product.sizes && product.sizes.length > 0) {
          initialSizes[product._id] = product.sizes[0];
        } else {
          initialSizes[product._id] = "M";
        }
      });
      setSelectedSizes(initialSizes);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  useEffect(() => {
    bestSellerCall();
  }, []);

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const addtoCart = (productdata) => {
    const selectedSize = selectedSizes[productdata._id];
    const productWithSize = { ...productdata, selectedSize };
    dispatch(addTocartAction(productWithSize));
    setIsCartOpen(true);
    setSelectedProduct(productdata);

    toast.success(
      `${productdata.name.slice(0, 20)} (Size: ${selectedSize}) added to cart! 🛒`,
      {
        duration: 2000,
        style: {
          background: "#10B981",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "10px",
        },
      }
    );
  };

  const buyitNow = (productdata) => {
    const selectedSize = selectedSizes[productdata._id];
    const productWithSize = { ...productdata, selectedSize };
    dispatch(addTocartAction(productWithSize));
    toast.success(
      `Proceeding to checkout with ${productdata.name.slice(0, 20)} (Size: ${selectedSize})`,
      {
        duration: 1500,
        style: {
          background: "#F59E0B",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "10px",
        },
      }
    );
    setTimeout(() => navigate("/CheckoutPage"), 1200);
  };

  const getProductSizes = (product) =>
    product.sizes && product.sizes.length > 0 ? product.sizes : availableSizes;

  const handleContextMenu = (e) => e.preventDefault();
  const handleDragStart = (e) => e.preventDefault();

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const viewPagePree = (id) => {
    navigate(`/ProductPage/${id}`);
  };

  const SizeSelector = ({
    product,
    selectedSize,
    onSizeSelect,
    isSmallScreen = false,
  }) => {
    const productSizes = getProductSizes(product);

    return (
      <div className={`mb-3 ${isSmallScreen ? "px-1" : ""}`}>
        <p
          className={`${
            isSmallScreen ? "text-xs" : "text-sm"
          } font-medium mb-2 text-center`}
        >
          Size: <span className="text-pink-600">{selectedSize}</span>
        </p>
        <div
          className={`flex flex-wrap justify-center gap-1 ${
            isSmallScreen ? "gap-1" : "gap-2"
          }`}
        >
          {productSizes.map((size) => (
            <button
              key={size}
              onClick={(e) => {
                e.stopPropagation();
                onSizeSelect(product._id, size);
              }}
              className={`
                ${isSmallScreen ? "px-2 py-1 text-xs" : "px-3 py-1 text-sm"}
                border rounded font-medium transition-all duration-200
                ${
                  selectedSize === size
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-pink-300 hover:text-pink-600"
                }
              `}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-xl sm:text-4xl font-serif text-center mb-8 font-black">
          Discover Bestsellers
        </h2>

        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute top-1/2 -left-2 sm:-left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute top-1/2 -right-2 sm:-right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div>
            {/* Small screens */}
            <div className="grid grid-cols-2 gap-3 sm:hidden px-2">
              {products.slice(10, 18)?.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-2 cursor-pointer rounded shadow-sm"
                >
                  <div onClick={() => viewPagePree(product._id)}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-[200px] object-cover rounded pointer-events-none select-none"
                      onContextMenu={handleContextMenu}
                      onDragStart={handleDragStart}
                      draggable={false}
                    />
                    <h3 className="text-sm mt-2 text-center font-Lato">
                      {product.name.slice(0, 25)}
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
                  </div>

                  <SizeSelector
                    product={product}
                    selectedSize={selectedSizes[product._id]}
                    onSizeSelect={handleSizeSelect}
                    isSmallScreen={true}
                  />

                  <div className="mt-2 space-y-2">
                    <button
                      className="w-full py-3 bg-pink-400 hover:bg-pink-500 text-white text-sm font-medium rounded"
                      onClick={() => addtoCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Large screens */}
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
                  <div className="bg-white rounded overflow-hidden shadow-sm relative group">
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-sm z-[2]">
                      Sale
                    </div>
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-[390px] object-cover rounded pointer-events-none select-none"
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

                    <div className="px-3 py-2">
                      <h3 className="text-sm text-center font-Lato mb-2">
                        {product.name.slice(0, 30)}
                      </h3>
                      <div className="flex justify-center items-center gap-2 mb-3">
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

                      <SizeSelector
                        product={product}
                        selectedSize={selectedSizes[product._id]}
                        onSizeSelect={handleSizeSelect}
                      />
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <button
                      className="w-full py-3 bg-pink-400 hover:bg-pink-500 text-white text-sm font-medium rounded"
                      onClick={() => addtoCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cart modal shown globally */}
      {isCartOpen && (
        <QazmiCart
          isOpen={isCartOpen}
          setIsOpen={setIsCartOpen}
          product={selectedProduct}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={scrollToTop}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 shadow-lg"
        >
          <ArrowUp size={24} />
        </button>
      </div>

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

export default QazmiBestsellers;
