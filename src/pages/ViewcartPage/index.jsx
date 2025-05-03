import { useState } from "react";
import {
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Search,
  User,
  ShoppingBag,
  Trash2,
  Lock,
} from "lucide-react";
import QazmiFooter from "../../components/footerSection";

export default function Viewcart() {
  // State for cart items
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "330 Aari Long Kurti For Women",
      color: "Pink",
      material: "Viscose Rayon",
      size: "S",
      originalPrice: 3499.0,
      salePrice: 979.0,
      quantity: 1,
      image: "/api/placeholder/120/150",
    },
    {
      id: 2,
      name: "Noura Long Kurti For Women",
      color: "Brown",
      material: "Viscose Rayon",
      size: "XS",
      originalPrice: 3999.0,
      salePrice: 1199.0,
      quantity: 1,
      image: "/api/placeholder/120/150",
    },
    {
      id: 3,
      name: "Samara Maroon Long Kurti For Women",
      color: "Maroon",
      material: "Viscose Rayon",
      size: "XS",
      originalPrice: 3999.0,
      salePrice: 1249.0,
      quantity: 1,
      image: "/api/placeholder/120/150",
    },
  ]);
  const cardOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  // State for dropdown accordions
  const [isGiftcardOpen, setIsGiftcardOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  // State for promo code
  const [promoCode, setPromoCode] = useState("");

  // State for special instructions
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Calculate total
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.salePrice * item.quantity,
    0
  );

  // Handle quantity update
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

  // Navigation categories
  const categories = [
    "SHORT KURTIS",
    "LONG KURTIS",
    "A-LINE KURTIS",
    "CHINARKARI",
    "KAFTANS",
    "KURTA SETS",
    "CONTACT",
    "SALE",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-3xl font-serif font-semibold italic">
              Qazmi
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden md:block p-2">
              <Search size={20} />
            </button>
            <button className="hidden md:block p-2">
              <User size={20} />
            </button>
            <div
              className="relative"
              // onClick={cardOpen}
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div>
            {isCartOpen && (
              <QazmiCart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block border-t border-gray-200">
          <div className="container mx-auto">
            <ul className="flex justify-center space-x-8 py-4">
              {categories.map((category, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`text-gray-800 hover:text-pink-600 font-medium text-sm ${
                      category === "SALE" ? "text-red-500" : ""
                    }`}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile Navigation (simplified for cart page) */}
        <nav className="md:hidden border-t border-gray-200">
          <div className="container mx-auto">
            <div className="py-3 px-4">
              <h1 className="text-lg font-medium">Your Shopping Cart</h1>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Continue shopping link */}
          <div className="mb-6">
            <a
              href="#"
              className="flex items-center text-pink-600 hover:text-pink-700 text-sm"
            >
              <ChevronLeft size={16} className="mr-1" />
              Continue shopping
            </a>
          </div>

          {/* Cart layout - flex on desktop, stack on mobile */}
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Cart items section */}
            <div className="lg:w-2/3 mb-8 lg:mb-0">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex py-6 border-b border-gray-200"
                >
                  {/* Product image */}
                  <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product details */}
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-base font-medium text-gray-900">
                          {item.name}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.color} / {item.material} / {item.size}
                      </p>
                    </div>

                    <div className="flex flex-1 items-end justify-between mt-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex items-center">
                        <div className="flex items-center border border-gray-300 rounded mr-6">
                          <button
                            className="px-2 py-1 text-gray-600"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <ChevronDown size={16} />
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            className="px-2 py-1 text-gray-600"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <ChevronUp size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center">
                            <span className="line-through text-sm text-gray-500 mr-2">
                              Rs. {item.originalPrice.toFixed(2)}
                            </span>
                            <span className="text-lg font-medium text-gray-900">
                              Rs. {item.salePrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary section */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                {/* Giftcard section */}
                <div className="mb-6 border border-gray-200 rounded-lg">
                  <button
                    className="w-full flex items-center justify-between p-4"
                    onClick={() => setIsGiftcardOpen(!isGiftcardOpen)}
                  >
                    <span className="font-medium">
                      Giftcard or discount code
                    </span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        isGiftcardOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isGiftcardOpen && (
                    <div className="p-4 pt-0">
                      <div className="flex">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Add your code here"
                          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-r-lg">
                          Activate
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order summary */}
                <div className="mb-6">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">
                      Total products ({cartItems.length})
                    </span>
                    <span className="font-medium">
                      Rs. {totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Total including VAT</span>
                    <span className="font-medium">
                      Rs. {totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout button */}
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-4 rounded-lg mb-4">
                  Checkout
                </button>

                {/* Secure checkout message */}
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Lock size={16} className="mr-2" />
                  <span>Guaranteed secure & safe checkout.</span>
                </div>

                {/* Special instructions */}
                <div className="mt-6 border border-gray-200 rounded-lg">
                  <button
                    className="w-full flex items-center justify-between p-4"
                    onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
                  >
                    <span className="font-medium">
                      Special instructions for the seller
                    </span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        isInstructionsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isInstructionsOpen && (
                    <div className="p-4 pt-0">
                      <textarea
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="Do you have any notes for us?"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 h-32 resize-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile sticky checkout bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Total:</span>
          <span className="font-bold text-lg">
            Rs. {totalAmount.toFixed(2)}
          </span>
        </div>
        <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg">
          Checkout
        </button>
        {/* <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <QazmiFooter />
        </div> */}
      </div>
    </div>
  );
}
