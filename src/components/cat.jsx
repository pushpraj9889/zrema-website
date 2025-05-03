import { useState } from "react";
import { X, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QazmiFooter from "./footerSection";

export default function QazmiCart({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  // Cart items data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "330 Aari Long Kurti For Women",
      color: "Pink",
      material: "Viscose Rayon",
      size: "S",
      price: 3499.0,
      salePrice: 979.0,
      quantity: 1,
      image: "/api/placeholder/100/120",
    },
    {
      id: 2,
      name: "Noura Long Kurti For Women",
      color: "Brown",
      material: "Viscose Rayon",
      size: "XS",
      price: 3999.0,
      salePrice: 1199.0,
      quantity: 1,
      image: "/api/placeholder/100/120",
    },
    {
      id: 3,
      name: "Samara Maroon Long Kurti For Women",
      color: "Maroon",
      material: "Viscose Rayon",
      size: "XS",
      price: 3999.0,
      salePrice: 1249.0,
      quantity: 1,
      image: "/api/placeholder/100/120",
    },
  ]);

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.salePrice * item.quantity,
    0
  );

  // Handle quantity change
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle item removal
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
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
                {cartItems.length === 0 ? (
                  <div className="py-6 text-center">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="py-4 flex border-b border-gray-200 last:border-b-0"
                    >
                      {/* Product image */}
                      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>

                      {/* Product details */}
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="ml-4 text-sm font-medium text-gray-900">
                              Rs. {(item.salePrice * item.quantity).toFixed(2)}
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
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <ChevronDown size={16} />
                            </button>
                            <span className="px-2 py-1">{item.quantity}</span>
                            <button
                              className="px-2 py-1 text-gray-600"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <ChevronUp size={16} />
                            </button>
                          </div>

                          <button
                            className="text-sm font-medium text-pink-600 hover:text-pink-500 flex items-center"
                            onClick={() => removeItem(item.id)}
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
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <p>Total products ({cartItems.length})</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
