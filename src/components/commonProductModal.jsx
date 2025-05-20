import { useState } from "react";
import {
  X,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Clock,
  CheckCircle,
  ShoppingBag,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTocartAction } from "../redux/actions";
import QazmiCart from "./cat";
import calculateMrp from "../utils/commonFunctions";

export default function QazmiCartProdcut({ isOpen, setIsOpen, productdata }) {
  const dispatch = useDispatch();
  const [selectIndex, setSelectIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Add a new state to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const onClick = (index) => {
    setSelectIndex(index);
  };

  // Add a function to handle image selection
  const handleImageSelect = (index) => {
    setCurrentImageIndex(index);
  };

  const addtoCart = () => {
    dispatch(addTocartAction(productdata));
    setIsCartOpen(true);
  };

  const buyitNow = () => {
    dispatch(addTocartAction(productdata));
    navigate("/CheckoutPage");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 overflow-hidden">
        {/* Overlay with improved opacity */}
        <div
          className="absolute inset-0 bg-gray-800 bg-opacity-60 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Cart panel with improved design */}
        <div className="absolute inset-y-0 right-0 max-w-full flex">
          <div className="relative w-screen max-w-md md:max-w-lg">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
              {/* Cart header with gradient */}
              <div className="bg-gradient-to-r from-pink-400 to-pink-600 px-4 py-4 flex items-center justify-between">
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

                {/* Image slider container */}
                <div className="mt-3 bg-gray-50 rounded-lg">
                  {/* Main image - now shows the currently selected image */}
                  <div className="aspect-square w-full bg-pink-50 flex items-center justify-center rounded-lg overflow-hidden">
                    {productdata?.images && productdata.images.length > 0 ? (
                      <img
                        src={productdata.images[currentImageIndex]}
                        alt={`${productdata?.name} - Image ${
                          currentImageIndex + 1
                        }`}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <ShoppingBag className="h-16 w-16 text-pink-300" />
                      </div>
                    )}
                  </div>

                  {/* Image thumbnails - now with onClick handlers */}
                  <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                    {productdata?.images?.slice(0, 4).map((image, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleImageSelect(idx)}
                        className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 cursor-pointer ${
                          idx === currentImageIndex
                            ? "border-pink-500"
                            : "border-transparent"
                        } hover:border-pink-300 transition-all`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${idx}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
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

                {/* SKU */}
                <div className="mt-6 py-2 px-4 bg-gray-50 rounded-md">
                  <p className="text-xs text-gray-500">
                    SKU: {productdata?.description || "N/A"}
                  </p>
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

                {/* Payment info */}
                {/* <div className="mt-6 px-4 py-3 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg border border-pink-200">
                  <p className="text-sm text-pink-700 font-medium text-center">
                    Guaranteed secure & safe checkout
                  </p>
                  <div className="flex justify-center mt-2 space-x-2">
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div> */}

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
    </div>
  );
}
