import React, { useState, useEffect } from "react";
import { ArrowUp, ShoppingBasket } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import QazmiCartProdcut from "../../components/commonProductModal";
import axios from "axios";
import calculateMrp from "../../utils/commonFunctions";

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { subcategory, category } = useParams();
  const [loading, setLoading] = useState(true);
  console.log("kjdsjkdfsf", category, subcategory);

  const bestSellerCall = async () => {
    try {
      setLoading(true);

      let url = "https://api.zrema.com/product/all";

      if (subcategory === "Chikankari") {
        url = `https://api.zrema.com/product/all?category=${encodeURIComponent(
          subcategory
        )}`;
      } else if (subcategory) {
        url = `https://api.zrema.com/product/all?subcategory=${encodeURIComponent(
          subcategory
        )}`;
      }

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bestSellerCall();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const viewProductPage = (id) => {
    navigate(`/ProductPage/${id}`);
  };

  const openCartModal = (product) => {
    setSelectedProduct(product);
    setIsCartOpen(true);
  };

  // Prevent right-click context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  // Prevent drag and drop
  const handleDragStart = (e) => {
    e.preventDefault();
    return false;
  };

  // Prevent various keyboard shortcuts
  const handleKeyDown = (e) => {
    // Prevent Ctrl+S (Save), Ctrl+A (Select All), F12 (DevTools), etc.
    if (
      (e.ctrlKey &&
        (e.key === "s" || e.key === "a" || e.key === "u" || e.key === "c")) ||
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      (e.ctrlKey && e.shiftKey && e.key === "C") ||
      (e.ctrlKey && e.shiftKey && e.key === "J")
    ) {
      e.preventDefault();
      return false;
    }
  };

  useEffect(() => {
    // Add global event listeners for additional protection
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    // Disable text selection on the entire page
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    document.body.style.mozUserSelect = "none";
    document.body.style.msUserSelect = "none";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      // Reset user selection when component unmounts
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      document.body.style.mozUserSelect = "";
      document.body.style.msUserSelect = "";
    };
  }, []);

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-xl sm:text-4xl md:text-4xl font-serif text-center mb-8 font-black">
          Discover {subcategory}
        </h2>

        {/* Products Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded overflow-hidden shadow-sm relative group"
            >
              {/* Sale Tag */}
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-sm z-10">
                Sale
              </div>

              {/* Product Image */}
              <div className="relative">
                {/* Invisible overlay to prevent direct image interaction */}
                <div
                  className="absolute inset-0 z-20 cursor-pointer"
                  onClick={() => viewProductPage(product._id)}
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                />

                <img
                  src={product.images && product.images[0]}
                  className="w-full h-[265px] sm:h-[350px] object-cover pointer-events-none select-none"
                  alt={product.name}
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  draggable={false}
                  style={{
                    userSelect: "none",
                    webkitUserSelect: "none",
                    mozUserSelect: "none",
                    msUserSelect: "none",
                    webkitTouchCallout: "none",
                    webkitUserDrag: "none",
                    webkitTapHighlightColor: "transparent",
                  }}
                />

                {/* Shopping Basket Button */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                  <button
                    className="bg-green-600 text-white p-2 rounded-full shadow-md hover:bg-green-800"
                    aria-label="Add to bag"
                    onClick={(e) => {
                      e.stopPropagation();
                      openCartModal(product);
                    }}
                  >
                    <ShoppingBasket size={18} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="px-3 py-3">
                <h3
                  className="text-sm font-normal text-center font-Lato line-clamp-2 h-10 cursor-pointer"
                  onClick={() => viewProductPage(product._id)}
                  style={{
                    userSelect: "none",
                    webkitUserSelect: "none",
                    mozUserSelect: "none",
                    msUserSelect: "none",
                  }}
                >
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      {isCartOpen && selectedProduct && (
        <QazmiCartProdcut
          isOpen={isCartOpen}
          setIsOpen={setIsCartOpen}
          productdata={selectedProduct}
        />
      )}

      {/* Scroll to top button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={scrollToTop}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 shadow-lg"
        >
          <ArrowUp size={24} />
        </button>
      </div>

      {/* Additional CSS for image protection */}
      <style jsx>{`
        img {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-user-drag: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
          pointer-events: none;
        }

        .product-image-container {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Disable highlighting */
        * {
          -webkit-tap-highlight-color: transparent;
        }

        /* Additional protection against print screen */
        @media print {
          img {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Collections;
