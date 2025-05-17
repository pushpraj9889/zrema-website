import React, { useState, useEffect } from "react";
import { ArrowUp, ShoppingBasket } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import QazmiCartProdcut from "../../components/commonProductModal";
import axios from "axios";

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

      let url = "https://api.zrema.in/product/all";

      if (subcategory === "Chikankari") {
        url = `https://api.zrema.in/product/all?category=${encodeURIComponent(
          subcategory
        )}`;
      } else if (subcategory) {
        url = `https://api.zrema.in/product/all?subcategory=${encodeURIComponent(
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
                <img
                  src={product.images && product.images[0]}
                  className="w-full h-[200px] sm:h-[250px] object-cover cursor-pointer"
                  alt={product.name}
                  onClick={() => viewProductPage(product._id)}
                />

                {/* Shopping Basket Button */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="bg-green-600 text-white p-2 rounded-full shadow-md hover:bg-green-800"
                    aria-label="Add to bag"
                    onClick={() => openCartModal(product)}
                  >
                    <ShoppingBasket size={18} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="px-3 py-3">
                <h3 className="text-sm font-normal text-center font-Lato line-clamp-2 h-10">
                  {product.name}
                </h3>
                <div className="flex justify-center items-center mt-2">
                  <span className="text-primary line-through mr-2 text-xs sm:text-sm">
                    Rs. {product.mrp?.toFixed(2)}
                  </span>
                  <span className="text-black font-medium text-sm">
                    Rs. {product.mrp?.toFixed(2)}
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
    </section>
  );
};

export default Collections;
