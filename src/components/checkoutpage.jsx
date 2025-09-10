import React, { useState } from "react";

const CheckoutPage = () => {
  const [emailNews, setEmailNews] = useState(true);
  const [saveInfo, setSaveInfo] = useState(false);
  const [billingAddressOption, setBillingAddressOption] = useState("same");

  // Cart items data
  const cartItems = [
    {
      id: 1,
      name: "330 Aari Long Kurti For Women",
      variant: "Pink / Viscose Rayon / S",
      price: 979.0,
      quantity: 1,
      image: "/api/placeholder/80/80",
    },
    {
      id: 2,
      name: "Noura Long Kurti For Women",
      variant: "Brown / Viscose Rayon / XS",
      price: 1199.0,
      quantity: 1,
      image: "/api/placeholder/80/80",
    },
    {
      id: 3,
      name: "Samara Maroon Long Kurti For Women",
      variant: "Maroon / Viscose Rayon / XS",
      price: 1249.0,
      quantity: 1,
      image: "/api/placeholder/80/80",
    },
  ];

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxes = 0;
  const total = subtotal + taxes;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header/Navigation Bar */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <button className="mr-4 text-gray-500">
              <i className="fas fa-arrow-left"></i>
            </button>
            <span className="text-gray-800 truncate max-w-md">
              Zrema.com/checkouts/cn/Z2NwLWFzaWEtc291dGhiYXN0MUQjBKNQ
            </span>
          </div>
          <div className="flex items-center">
            <button className="mx-2 text-gray-500">
              <i className="fas fa-sync-alt"></i>
            </button>
            <button className="mx-2 text-gray-500">
              <i className="far fa-star"></i>
            </button>
            <button className="mx-2 text-gray-500">
              <i className="fas fa-download"></i>
            </button>
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white ml-2">
              <span>P</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Contact & Delivery Form */}
          <div className="w-full md:w-3/5">
            {/* Contact Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Contact</h2>
                <a href="#" className="text-blue-500">
                  Log in
                </a>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Email or mobile phone number"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="news"
                  checked={emailNews}
                  onChange={() => setEmailNews(!emailNews)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="news" className="ml-2 text-gray-700">
                  Email me with news and offers
                </label>
              </div>
            </div>

            {/* Delivery Section */}
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">Delivery</h2>
              <div className="mb-4">
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-md p-3 pr-10 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>India</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <i className="fas fa-chevron-down text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="First name"
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="City"
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-md p-3 pr-10 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>Delhi</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <i className="fas fa-chevron-down text-gray-400"></i>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="PIN code"
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <i className="fas fa-question-circle text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="save-info"
                  checked={saveInfo}
                  onChange={() => setSaveInfo(!saveInfo)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="save-info" className="ml-2 text-gray-700">
                  Save this information for next time
                </label>
              </div>
            </div>

            {/* Shipping Method Section */}
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">Shipping method</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center text-gray-500">
                Enter your shipping address to view available shipping methods.
              </div>
            </div>

            {/* Payment Section */}

            {/* Billing Address Section */}
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">Billing address</h2>
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <div
                  className={`p-4 flex items-center border-b border-gray-200 ${
                    billingAddressOption === "same" ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setBillingAddressOption("same")}
                >
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mr-3 flex-shrink-0">
                    {billingAddressOption === "same" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  <div className="font-medium">Same as shipping address</div>
                </div>
                <div
                  className={`p-4 flex items-center ${
                    billingAddressOption === "different" ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setBillingAddressOption("different")}
                >
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mr-3 flex-shrink-0">
                    {billingAddressOption === "different" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  <div className="font-medium">
                    Use a different billing address
                  </div>
                </div>
              </div>
            </div>

            {/* Pay Now Button */}
            <div className="mb-8">
              <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Pay now
              </button>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap gap-4 text-sm text-blue-600 mb-8">
              <a href="#" className="hover:underline">
                Refund policy
              </a>
              <a href="#" className="hover:underline">
                Shipping policy
              </a>
              <a href="#" className="hover:underline">
                Privacy policy
              </a>
              <a href="#" className="hover:underline">
                Terms of service
              </a>
              <a href="#" className="hover:underline">
                Contact information
              </a>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full md:w-2/5 bg-white p-6 rounded-md shadow-sm">
            {/* Cart Items */}
            <div className="border-b border-gray-200 pb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 rounded-full text-white text-xs flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 ml-4">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.variant}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <span className="font-medium">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="py-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">
                  Subtotal · {cartItems.length} items
                </span>
                <span className="font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-gray-700">Shipping</span>
                  <i className="fas fa-question-circle text-gray-400 ml-1"></i>
                </div>
                <span className="text-gray-500">Enter shipping address</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-lg font-medium">Total</span>
                <div className="text-right">
                  <div className="text-gray-500 text-sm">INR</div>
                  <div className="text-xl font-bold">
                    ₹{total.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
              <div className="text-gray-500 text-sm">
                Including ₹{taxes.toLocaleString("en-IN")} in taxes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
