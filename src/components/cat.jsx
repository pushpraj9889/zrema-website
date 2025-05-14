import { useState } from "react";
import { X, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QazmiFooter from "./footerSection";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAction,
  incrementQuantity,
  decreaseQuantity,
} from "../redux/actions";

export default function QazmiCart({ isOpen, setIsOpen }) {
  const { cart } = useSelector((store) => store?.product || { cart: [] });
  console.log("geettingafjkds", cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Calculate total amount
  const totalAmount = cart.reduce(
    (total, item) => total + item.mrp * item.quantity,
    0
  );

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
    navigate("/QazmiCartPage"); // Navigate to the cart page
  };

  const goToCheckOut = () => {
    setIsOpen(false);
    navigate("/CheckoutPage");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Cart panel */}
        <div className="absolute inset-y-0 right-0 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl">
              {/* Cart header */}
              <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-900">Cart</h2>
                <button
                  className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Continue shopping link */}
              <div className="px-4 py-3 border-b border-gray-200">
                <a
                  href="#"
                  className="flex items-center text-pink-600 hover:text-pink-700"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Continue shopping
                </a>
              </div>

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="py-6 text-center">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  cart?.map((item) => (
                    <div
                      key={item._id}
                      className="py-4 flex border-b border-gray-200 last:border-b-0"
                    >
                      {/* Product image */}
                      <div className="flex-shrink-0 w-24 h-30 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          src={item?.images[0]}
                          alt={"Product image"}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>

                      {/* Product details */}
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                              {item.name.slice(0, 40)}
                            </h3>
                            <p className="ml-4 text-sm font-medium text-gray-900">
                              Rs. {(item?.mrp * item?.quantity).toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.color} / {item.material} / {item.size}
                          </p>
                        </div>

                        {/* Quantity controls and remove button */}
                        <div className="flex-1 flex items-end justify-between">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              className="px-2 py-1 text-gray-600"
                              onClick={() => handleDecrementQuantity(item._id)}
                            >
                              <ChevronDown size={16} />
                            </button>
                            <span className="px-2 py-1 text-black">
                              {item.quantity}
                            </span>
                            <button
                              className="px-2 py-1 text-gray-600"
                              onClick={() => handleIncrementQuantity(item._id)}
                            >
                              <ChevronUp size={16} />
                            </button>
                          </div>

                          <button
                            className="text-sm font-medium text-pink-600 hover:text-pink-500 flex items-center"
                            onClick={() => removeItem(item._id)}
                          >
                            <X size={16} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart footer with totals and checkout buttons */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <p>Total products ({cart?.length})</p>
                    <p>Rs. {totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-6">
                    <p>Total including VAT</p>
                    <p>Rs. {totalAmount.toFixed(2)}</p>
                  </div>
                  <button
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg mb-3"
                    onClick={goToCartPage}
                  >
                    View cart
                  </button>
                  <button
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg"
                    onClick={goToCheckOut}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
