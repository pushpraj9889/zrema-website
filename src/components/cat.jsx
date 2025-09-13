import { useEffect, useState } from "react";
import {
  X,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  Shield,
  Gift,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import QazmiFooter from "./footerSection";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAction,
  incrementQuantity,
  decreaseQuantity,
} from "../redux/actions";
import calculateMrp from "../utils/commonFunctions";

export default function QazmiCart({ isOpen, setIsOpen }) {
  const { cart } = useSelector((store) => store?.product || { cart: [] });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (cart?.length > 0) {
      const total = cart.reduce((acc, item) => {
        return acc + calculateMrp(item.mrp, item.discount) * item.quantity;
      }, 0);
      setTotalAmount(total.toFixed(2));
    } else {
      setTotalAmount(0);
    }
  }, [cart]);
  console.log("totalAmount", totalAmount);

  // Calculate total amount
  // const totalAmount = cart.reduce(
  //   (total, item) => total + item.mrp * item.quantity,
  //   0
  // );

  // console.log("jksdfjkjkfds", totalAmount);

  // Calculate discount amount (assuming 15% discount)
  const discountPercentage = 15;
  const discountAmount = (totalAmount * discountPercentage) / 100;
  const finalAmount = totalAmount - 0;

  const handleIncrementQuantity = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrementQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  // Handle item removal
  const removeItem = (id) => {
    dispatch(deleteAction(id));
  };

  const goToCartPage = () => {
    setIsOpen(false); // Close the cart panel
    navigate("/ZremaCartPage"); // Navigate to the cart page
  };

  const goToCheckOut = () => {
    setIsOpen(false);
    navigate("/CheckoutPage");
  };

  if (!isOpen) return null;

  const continueShopping = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 overflow-hidden">
        {/* Overlay with improved opacity */}
        <div
          className="absolute inset-0 bg-gray-800 bg-opacity-60 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Cart panel with premium design */}
        <div className="absolute inset-y-0 right-0 w-3/4 sm:w-80 md:w-96 lg:w-96 xl:w-md flex">
          <div className="relative w-full">
            <div className="h-full flex flex-col bg-white shadow-xl">
              {/* Premium Cart header with gradient */}
              <div className="bg-gradient-to-r from-pink-400 to-pink-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">
                    Your Shopping Bag
                  </h2>
                  <button
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-pink-100 text-sm mt-1">
                  {cart.length === 0
                    ? "Your bag is empty"
                    : `${cart.length} item${
                        cart.length > 1 ? "s" : ""
                      } in your bag`}
                </p>
              </div>

              {/* Continue shopping link */}
              <div
                className="px-6 py-3 border-b border-gray-100 bg-pink-50"
                onClick={continueShopping}
              >
                <a
                  href="#"
                  className="flex items-center text-pink-600 hover:text-pink-700 font-medium text-sm"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Continue shopping
                </a>
              </div>

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="py-12 px-6 text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mb-4">
                      <ShoppingBag className="h-8 w-8 text-pink-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Looks like you haven't added any items to your bag yet.
                    </p>
                    <button
                      onClick={continueShopping}
                      className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100 px-2">
                    {cart?.map((item) => {
                      return (
                        <div key={item._id} className="py-5 flex">
                          {/* Product image with improved styling */}
                          <div className="flex-shrink-0 w-20 sm:w-24 h-24 sm:h-28 border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                            <img
                              src={item?.images[0]}
                              alt={item.name}
                              className="w-full h-full object-center object-cover"
                            />
                          </div>

                          {/* Product details with improved typography */}
                          <div className="ml-3 sm:ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-xs sm:text-sm font-medium text-gray-900 leading-tight">
                                  {item.name.slice(0, 30)}
                                  {item.name.length > 30 ? "..." : ""}
                                </h3>
                                <div className="flex">
                                  <p className="ml-2 sm:ml-4 text-xs sm:text-sm text-pink-500 font-semibold">
                                    ₹{" "}
                                    {(
                                      calculateMrp(item.mrp, item.discount) *
                                      item.quantity
                                    ).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                              <p className="mt-1 text-xs text-gray-500">
                                {item.fabric || "Premium Fabric"} /{" "}
                                {item.selectedSize ||
                                  item.size?.[0] ||
                                  "Standard"}
                              </p>
                            </div>

                            {/* Quantity controls and remove button */}
                            <div className="flex-1 flex items-end justify-between mt-2">
                              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden shadow-sm">
                                <button
                                  className="px-1.5 sm:px-2 py-1 text-gray-500 hover:bg-gray-50 transition-colors"
                                  onClick={() =>
                                    handleDecrementQuantity(item._id)
                                  }
                                >
                                  <ChevronDown size={14} />
                                </button>
                                <span className="px-2 sm:px-3 py-1 text-black font-medium bg-gray-50 text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  className="px-1.5 sm:px-2 py-1 text-gray-500 hover:bg-gray-50 transition-colors"
                                  onClick={() =>
                                    handleIncrementQuantity(item._id)
                                  }
                                >
                                  <ChevronUp size={14} />
                                </button>
                              </div>

                              <button
                                className="text-xs font-medium text-pink-500 hover:text-pink-700 flex items-center transition-colors"
                                onClick={() => removeItem(item._id)}
                              >
                                <X size={12} className="mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Enhanced Cart footer with totals and checkout buttons */}
              {cart.length > 0 && (
                <div className="bg-white border-t border-gray-100 pt-1 pb-6 px-4 sm:px-6 shadow-inner">
                  {/* Order summary */}
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Order Summary
                  </h3>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between text-gray-600">
                      <p>
                        Subtotal ({cart?.length} item
                        {cart.length > 1 ? "s" : ""})
                      </p>
                      <p>₹ {totalAmount}</p>
                    </div>

                    {/* <div className="flex justify-between text-gray-600">
                      <p>Discount ({discountPercentage}%)</p>
                      <p className="text-green-600">
                        - ₹ {discountAmount.toFixed(2)}
                      </p>
                    </div> */}

                    <div className="flex justify-between text-gray-600">
                      <p>Shipping</p>
                      <p>Free</p>
                    </div>

                    <div className="border-t border-dashed border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between font-bold text-gray-900">
                        <p>Total</p>
                        <p>₹ {totalAmount}</p>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        {/* You save ₹ {discountAmount.toFixed(2)} on this order */}
                      </p>
                    </div>
                  </div>

                  {/* Benefits callouts */}
                  <div className="bg-pink-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center text-xs text-pink-700 mb-2">
                      <Shield size={14} className="mr-2 text-pink-500" />
                      <span className="text-xs">Secured checkout with encryption</span>
                    </div>
                    <div className="flex items-center text-xs text-pink-700">
                      <Gift size={14} className="mr-2 text-pink-500" />
                      <span className="text-xs">Free gifts with purchase over ₹999</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={goToCheckOut}
                      className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg shadow-md shadow-pink-200 transition-all flex items-center justify-center text-sm"
                    >
                      <CreditCard size={16} className="mr-2" />
                      Checkout Now
                    </button>

                    <button
                      onClick={goToCartPage}
                      className="w-full border border-pink-200 bg-white text-pink-600 hover:bg-pink-50 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center text-sm"
                    >
                      View Full Cart <ChevronRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}