import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../Services/apicallMethode";
import { ChevronLeft, ChevronRight, X, CheckCircle } from "lucide-react";
import calculateMrp from "../utils/commonFunctions";
import { addTocartAction } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function QazmiBestsellers() {
  const [products, setProducts] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const productsGridRef = useRef(null);
  const dispatch = useDispatch();

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

  const navigate = useNavigate();
  const viewPagePree = (id) => {
    navigate(`/ProductPage/${id}`);
  };

  // Show alert function
  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
    // Auto-hide alert after 3 seconds
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  // Hide alert function
  const hideAlert = () => {
    setAlertVisible(false);
  };

  const addtoCart = (productdata) => {
    dispatch(addTocartAction(productdata));
    // showAlert(`${productdata.name} added to cart successfully!`);
    showAlert(` added to cart successfully!`);
  };

  const buyitNow = (productdata) => {
    dispatch(addTocartAction(productdata));
    showAlert(`${productdata.name} added to cart! Redirecting to checkout...`);
    // Small delay before navigation to show the alert
    setTimeout(() => {
      navigate("/CheckoutPage");
    }, 1000);
  };

  // Check if scrolling is possible
  const checkScrollability = () => {
    const container = productsGridRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 5
      );
    }
  };

  // Scroll handlers
  const scrollLeft = () => {
    const container = productsGridRef.current;
    if (container) {
      container.scrollBy({
        left: -300,
        behavior: "smooth",
      });
      setTimeout(checkScrollability, 500);
    }
  };

  const scrollRight = () => {
    const container = productsGridRef.current;
    if (container) {
      container.scrollBy({
        left: 300,
        behavior: "smooth",
      });
      setTimeout(checkScrollability, 500);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const container = productsGridRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      checkScrollability();
      window.addEventListener("resize", checkScrollability);

      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [products]); // Re-check when products load

  const viewAllClick = () => {
    navigate("/Collections");
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Alert Toast Notification */}
      {alertVisible && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-in">
          <CheckCircle size={20} />
          <span className="font-medium">{alertMessage}</span>
          <button
            onClick={hideAlert}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="text-center mb-8">
        <h2 className="text-xl md:text-4xl font-bold text-gray-800 mb-2">
          Discover Zrema's Timeless Bestsellers
        </h2>
        <p className="text-black-400 text-sm md:text-lg font-bold">
          Experience the elegance and craftsmanship of Zrema's most beloved
          pieces
        </p>
      </div>

      {/* Category buttons - horizontally scrollable on all devices */}
      <div className="overflow-x-auto pb-6 mb-6">
        <div className="flex space-x-3 min-w-max md:justify-center">
          {[
            "KURTA SETS",
            "LONG KURTIS",
            "SHORT KURTIS",
            "Kashmiri Short  Kurti",
          ].map((category) => (
            <button
              key={category}
              onClick={() => navigate(`/Collections/${category}`)}
              className="px-6 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors whitespace-nowrap"
            >
              {category.toLocaleUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Products scrollable container with navigation arrows */}
      <div className="relative">
        {/* Navigation Arrows - only shown when scrolling is possible */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-3 bg-white rounded-full p-2 shadow-md z-10 hidden md:block"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-3 bg-white rounded-full p-2 shadow-md z-10 hidden md:block"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Scrollable Products Grid */}
        <div
          ref={productsGridRef}
          className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x"
          style={{ scrollBehavior: "smooth" }}
        >
          {products.slice(9, 18)?.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 group relative border border-gray-200 rounded-lg overflow-hidden snap-start"
              style={{ width: "250px" }} // Fixed width for consistent sizing
            >
              <div className="relative">
                <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 text-sm font-medium rounded">
                  Sale
                </span>
                <img
                  src={product.images[1]}
                  alt={product.name}
                  className="w-full h-[360px] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium transform -translate-y-2 group-hover:translate-y-0 transition-all"
                    onClick={() => viewPagePree(product._id)}
                  >
                    Quick View
                  </button>
                </div>
              </div>
              <div className="p-1">
                <h3 className="font-medium text-gray-800 truncate">
                  {product.name}
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
                </div>
                <div className="flex mt-1 space-x-2">
                  {product?.colors?.map((color, idx) => (
                    <button
                      key={idx}
                      className={`w-6 h-6 rounded-full ${color} border border-gray-300`}
                    ></button>
                  ))}
                </div>
              </div>
              <div>
                <button
                  className="w-full py-4 bg-pink-400 hover:bg-pink-500 text-white font-medium rounded transition"
                  onClick={() => addtoCart(product)}
                >
                  Add to cart
                </button>
                <button
                  className="w-full py-4 mt-1 border border-gray-300 hover:border-gray-400 font-medium rounded transition"
                  onClick={() => buyitNow(product)}
                >
                  Buy it now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* "View All" button */}
      <div className="text-center mt-1">
        <button
          className="px-8 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors"
          onClick={viewAllClick}
        >
          View All Bestsellers
        </button>
      </div>

      {/* Floating cart button (visible on mobile) */}
      <div className="fixed right-6 bottom-6 md:hidden">
        <button className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </button>
      </div>

      {/* CSS for hiding scrollbar and alert animation */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
