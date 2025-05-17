import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AddressBillingFields from "../../components/addressBillingFeilds";
import toast, { Toaster } from "react-hot-toast";

export default function Order() {
  const [billingAddressOption, setBillingAddressOption] = useState("same");
  const [userDetailsdata, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Default to COD
  const { cart = [] } = useSelector((store) => store?.product || { cart: [] });
  console.log("billingAddressOption", billingAddressOption);

  const { userDetails = {} } = useSelector(
    (store) => store?.userDetailsReducer || { userDetails: {} }
  );
  const token = userDetails?.token;
  // Calculate order totals
  const { subtotal, taxes, total } = useMemo(() => {
    const subtotalValue = cart.reduce(
      (sum, item) => sum + item.mrp * (item.quantity || 1),
      0
    );

    return {
      subtotal: subtotalValue,
    };
  }, [cart]);

  const handleFormDataChange = (formData) => {
    setUserDetails(formData);
  };
  const handlePayment = () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.post(
          "https://api.zrema.in/order/create",
          {
            products: cart,
            shipping_address: userDetails?.address,
            shipping_pincode: userDetails?.pincode,
            total_amount: 1800,
            payment_type: paymentMethod, // Use the selected payment method
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data) {
          setLoading(false);
          // If payment method is online, you could redirect to payment gateway here
          if (paymentMethod === "online") {
            // Redirect logic or show payment options would go here
            alert("Redirecting to payment gateway...");
          } else {
            // For COD, just show success
            toast("Order placed successfully with Cash on Delivery!");
            // toast("Order placed successfully with Cash on Delivery!");

            // alert("Order placed successfully with Cash on Delivery!");
          }
        }
      } catch (error) {
        console.error("Order creation failed:", error);
        setLoading(false);
        // Optional: show error message to the user
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl px-4 mx-auto flex flex-col lg:flex-row gap-6">
        {/* Main Checkout Form */}
        <div className="w-full lg:w-3/5 p-8 text-gray-800 bg-white shadow-2xl rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm font-medium text-emerald-600">
                Secure Checkout
              </span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {["Cart", "Shipping", "Payment", "Confirmation"].map(
                (step, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        idx <= 2
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      } font-medium transition-all duration-300`}
                    >
                      {idx < 2 ? "✓" : idx + 1}
                    </div>
                    <span
                      className={`text-xs mt-2 ${
                        idx <= 2
                          ? "text-indigo-600 font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                )
              )}
            </div>
            <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-indigo-600 w-3/4 transition-all duration-500"></div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                <div className="text-indigo-600 font-bold text-sm">1</div>
              </div>
              Shipping Method
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-indigo-600 rounded-xl p-5 text-center relative shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <div className="absolute -top-2 -right-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  SELECTED
                </div>
                <div className="text-indigo-600 text-4xl mb-2">🚚</div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Free Standard Shipping
                </h3>
                <p className="text-gray-600 text-sm">
                  Delivered in 3-5 business days
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-b-xl"></div>
              </div>

              {/* <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer opacity-70 hover:opacity-100">
                <div className="text-gray-500 text-4xl mb-2">✈️</div>
                <h3 className="font-bold text-gray-700 mb-1">
                  Express Shipping
                </h3>
                <p className="text-gray-500 text-sm">
                  Delivered in 1-2 business days
                </p>
                <p className="text-indigo-600 font-bold mt-2">rs :400</p>
              </div> */}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                <div className="text-indigo-600 font-bold text-sm">2</div>
              </div>
              Payment Method
            </h2>

            <p className="text-gray-500 mb-4 flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16V12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8H12.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Choose your preferred payment method
            </p>

            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg mb-6">
              {/* COD Option */}
              <div
                className={`p-5 flex items-center cursor-pointer transition-all duration-200 ${
                  paymentMethod === "cod"
                    ? "bg-indigo-50"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    paymentMethod === "cod"
                      ? "border-indigo-600"
                      : "border-gray-400"
                  } flex items-center justify-center mr-4 transition-all duration-200`}
                >
                  {paymentMethod === "cod" && (
                    <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                  )}
                </div>
                <div className="flex items-center flex-1">
                  <div className="text-2xl mr-3">💵</div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      Cash on Delivery
                    </div>
                    <div className="text-sm text-gray-500">
                      Pay with cash when your order arrives
                    </div>
                  </div>
                </div>
              </div>

              {/* Online Payment Option */}
              <div
                className={`p-5 flex items-center cursor-pointer transition-all duration-200 border-t border-gray-200 ${
                  paymentMethod === "online"
                    ? "bg-indigo-50"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => setPaymentMethod("online")}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    paymentMethod === "online"
                      ? "border-indigo-600"
                      : "border-gray-400"
                  } flex items-center justify-center mr-4 transition-all duration-200`}
                >
                  {paymentMethod === "online" && (
                    <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                  )}
                </div>
                <div className="flex items-center flex-1">
                  <div className="text-2xl mr-3">💳</div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      Online Payment
                    </div>
                    <div className="text-sm text-gray-500">
                      UPI, Cards, Wallets, NetBanking
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Show Razorpay details only when online payment is selected */}
            {paymentMethod === "online" && (
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between bg-white gap-4">
                  <div className="flex items-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        Razorpay Secure
                      </div>
                      <div className="text-sm text-gray-500">
                        UPI, Cards, Wallets, NetBanking
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-9 md:ml-0">
                    <img
                      src="/api/placeholder/40/24"
                      alt="UPI"
                      className="h-6 shadow-sm rounded"
                    />
                    <img
                      src="/api/placeholder/40/24"
                      alt="Visa"
                      className="h-6 shadow-sm rounded"
                    />
                    <img
                      src="/api/placeholder/40/24"
                      alt="Mastercard"
                      className="h-6 shadow-sm rounded"
                    />
                    <span className="text-gray-400 text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                      +17
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center border-t border-gray-200">
                  <div className="w-48 h-24 bg-white rounded-lg border border-gray-200 mx-auto mb-6 flex items-center justify-center relative shadow-md">
                    <div className="absolute top-2 left-2 flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-3 bg-gray-200 rounded-full mb-2"></div>
                      <div className="w-24 h-2 bg-gray-100 rounded-full"></div>
                    </div>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600 bg-indigo-100 rounded-full w-6 h-6 flex items-center justify-center">
                      →
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    After clicking{" "}
                    <strong className="text-indigo-600">
                      "Complete Payment"
                    </strong>
                    , you will be redirected to <br />
                    Razorpay Secure to complete your purchase securely.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Billing Address */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                <div className="text-indigo-600 font-bold text-sm">3</div>
              </div>
              Billing Address
            </h2>

            <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-200 shadow-md">
              {["same", "different"].map((option) => (
                <div
                  key={option}
                  className={`p-5 flex items-center cursor-pointer transition-all duration-200 ${
                    billingAddressOption === option
                      ? "bg-indigo-50"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => setBillingAddressOption(option)}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      billingAddressOption === option
                        ? "border-indigo-600"
                        : "border-gray-400"
                    } flex items-center justify-center mr-4 transition-all duration-200`}
                  >
                    {billingAddressOption === option && (
                      <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                    )}
                  </div>
                  <div className="text-gray-800 font-medium">
                    {option === "same"
                      ? "Same as shipping address"
                      : "Use a different billing address"}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <>
            {billingAddressOption == "different" && (
              <div>
                <AddressBillingFields
                  onFormDataChange={handleFormDataChange}
                  // You can also pass initial data if needed
                  initialData={
                    {
                      // Any pre-filled data you want to show
                    }
                  }
                />
              </div>
            )}
          </>

          {/* Payment Button */}
          <div className="mb-8">
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600"
              } text-white py-4 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center`}
            >
              <Toaster
                toastOptions={{
                  style: {
                    background: "#4338ca", // Indigo background color
                    color: "#ffffff", // White text color
                    padding: "16px",
                    borderRadius: "10px",
                  },
                  success: {
                    iconTheme: {
                      primary: "#10b981", // Green check icon
                      secondary: "#ffffff", // White background for icon
                    },
                  },
                }}
              />
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                `Complete ${paymentMethod === "online" ? "Payment" : "Order"}`
              )}
            </button>
            <div className="mt-3 flex items-center justify-center text-gray-500 text-sm">
              <svg
                className="w-4 h-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 10L12 14L8 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {paymentMethod === "cod"
                ? "Your order will be confirmed after you complete this step"
                : "Your card won't be charged until you review this order on the next page"}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-2/5 bg-white p-6 rounded-xl shadow-xl border border-gray-100 self-start">
          <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-200">
            Order Summary
          </h2>
          <h6 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-200">
            Name: {userDetails?.first_name} Mobile:{userDetails.phone_number}
          </h6>
          <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-200">
            Address:
            {userDetails?.address}
            {userDetails?.city}
            {userDetails?.state}
            {userDetails?.landmark}
            {userDetails?.pincode}
          </h2>

          {/* Payment Method Summary */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <div className="flex items-center">
              <div className="text-xl mr-2">
                {paymentMethod === "cod" ? "💵" : "💳"}
              </div>
              <div className="font-medium">
                {paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Online Payment"}
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {cart && cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item?.id || Math.random()}
                  className="flex items-start pb-4 border-b border-gray-100"
                >
                  <div className="relative">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                      {item?.images?.[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          No img
                        </div>
                      )}
                    </div>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full text-white text-xs flex items-center justify-center">
                      {item?.quantity || 1}
                    </span>
                  </div>
                  <div className="flex-1 ml-4">
                    <h3 className="font-medium text-gray-900">
                      {item?.name || "Product"}
                    </h3>
                    {item?.variant && (
                      <p className="text-gray-500 text-sm">{item.variant}</p>
                    )}
                  </div>
                  <div className="ml-4 text-right">
                    <span className="font-medium">
                      ₹{(item?.mrp || 0)?.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Your cart is empty
              </div>
            )}
          </div>

          {/* Subtotal and Shipping */}
          <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Subtotal{" "}
                {cart.length > 0 &&
                  `· ${cart.length} item${cart.length !== 1 ? "s" : ""}`}
              </span>
              <span className="font-medium">
                ₹{subtotal?.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taxes</span>
              <span className="font-medium">
                ₹{taxes?.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">Total</span>
              <div className="text-right">
                <div className="text-gray-500 text-xs">INR</div>
                <div className="text-xl font-bold text-indigo-600">
                  ₹{total?.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
            <div className="text-gray-500 text-sm">
              Including ₹{taxes?.toLocaleString("en-IN")} in taxes
            </div>
          </div>

          {/* Secure Checkout Badge */}
          <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4 border border-gray-200">
            <svg
              className="w-5 h-5 text-green-600 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-gray-700 font-medium">Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-8 px-4">
        <div className="flex items-center text-gray-500 text-sm">
          <svg
            className="w-4 h-4 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 12L11 14L15 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Secure Checkout
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <svg
            className="w-4 h-4 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 12L11 14L15 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          100% Satisfaction
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <svg
            className="w-4 h-4 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 12L11 14L15 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          24/7 Support
        </div>
      </div>
    </div>
  );
}
