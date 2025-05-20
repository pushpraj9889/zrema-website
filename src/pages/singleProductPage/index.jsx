import { useEffect, useState } from "react";
import {
  Heart,
  Share2,
  ChevronRight,
  Ruler,
  ShoppingBag,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { addTocartAction } from "../../redux/actions";
import QazmiCart from "../../components/cat";
import { useDispatch } from "react-redux";
import axios from "axios";
import SizeChart from "../../components/sizecart";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const getProductById = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.zrema.in/product/${id}`);

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
    <div className="bg-white">
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
            <div className="sticky top-24">
              <div className="lg:flex lg:gap-4">
                {/* Thumbnails - Visible on larger screens */}
                {product.images && product.images.length > 1 && (
                  <div className="hidden lg:flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                    {product.images.map((image, index) => (
                      <button
                        key={`thumb-${index}`}
                        className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                          currentImage === index
                            ? "border-green-500"
                            : "border-transparent hover:border-gray-300"
                        }`}
                        onClick={() => setCurrentImage(index)}
                      >
                        <img
                          src={image}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Image */}
                <div className="relative rounded-lg overflow-hidden bg-gray-100 w-full">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[currentImage]}
                      alt={product.name}
                      className="w-full h-full object-contain aspect-square"
                    />
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
                </div>
              </div>

              {/* Thumbnails row - Mobile only */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto lg:hidden pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={`mobile-thumb-${index}`}
                      className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                        currentImage === index
                          ? "border-green-500"
                          : "border-transparent"
                      }`}
                      onClick={() => setCurrentImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-2/5 xl:w-1/2  lg:mt-0">
            <h1 className="text-[18px] sm:text-xl font-bold text-gray-700 mb-2">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline mb-2">
              <p className="text-xl font-bold text-gray-700">₹{product.mrp}</p>
              {/* {product.mrp !== product.price && (
                <p className="ml-4 text-lg text-gray-500 line-through">
                  ₹{product.price}
                </p>
              )} */}
            </div>

            {/* Share Button */}
            {/* <div className="flex items-center mb-8">
              <button className="flex items-center text-gray-500 hover:text-gray-900 transition-colors">
                <Share2 className="w-5 h-5 mr-2" />
                <span>Share</span>
              </button>
            </div> */}

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
                {/* {showSizeChart && (
                  <SizeChart
                    showSizeChart={showSizeChart}
                    setShowSizeChart={setShowSizeChart}
                  />
                )} */}
                {showSizeChart && (
                  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="relative w-full max-w-4xl mx-auto bg-white p-4 rounded-md shadow-lg">
                      {/* ...existing SizeChart content... */}
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
                          ? "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:outline-none"
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

            {/* Buttons */}

            {/* Description */}
            {product.description && (
              <div className="mt-2">
                <h3 className="font-medium text-gray-900 mb-1">Description</h3>
                <div className="prose prose-sm text-gray-700">
                  <p>{product.description}</p>
                </div>
              </div>
            )}
            <div className="space-y-4 mt-8">
              <button
                onClick={addToCart}
                type="button"
                class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2 mt-6  mr-8 flex items-center justify-center w-full  "
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
    </div>
  );
}
