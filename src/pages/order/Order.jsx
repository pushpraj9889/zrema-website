import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AddressBillingFields from "../../components/addressBillingFeilds";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import calculateMrp from "../../utils/commonFunctions";
import { Check, ChevronDown } from "lucide-react";
import { get } from "../../Services/apicallMethode";

export default function Order() {
  const [billingAddressOption, setBillingAddressOption] = useState("same");
  const [userDetailsdata, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { cart = [] } = useSelector((store) => store?.product || { cart: [] });
  const [totalAmount, setTotalAmount] = useState(0);
  const [isGiftcardOpen, setIsGiftcardOpen] = useState(true);
  const [promoCode, setPromoCode] = useState([]);
  const userFilledDetails = useSelector(
    (store) => store?.userDetailsReducer?.userDetails
  );

  const navigate = useNavigate();
  console.log("billingAddressOption", promoCode[0]);

  const { userDetails = {} } = useSelector(
    (store) => store?.userDetailsReducer || { userDetails: {} }
  );

  const token = userDetails?.token;

  // Calculate order totals
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
  const getCouponCodeApi = async () => {
    try {
      const response = await get("coupon/all");
      // console.log("gjkdsgjk", response[]);
      setPromoCode(response);
    } catch (error) {
      console.log("ksjfdjkdfs", error);
    }
  };
  useEffect(() => {
    getCouponCodeApi();
  }, []);

  useEffect(() => {}, [userDetailsdata]);

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
          "https://api.zrema.com/order/create",
          {
            products: cart,
            shipping_address: userDetails?.address,
            shipping_pincode: userDetails?.pincode,
            total_amount: totalAmount,
            payment_type: paymentMethod,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data) {
          setLoading(false);
          if (paymentMethod === "online") {
            console.log("paymentlinkgetting", response.data.paymentLink);
            window.open(response.data.paymentLink, "_blank");
          } else {
            toast("Order placed successfully with Cash on Delivery!");
            setTimeout(() => {
              navigate("/OrderHistroy");
            }, 1000);
          }
        }
      } catch (error) {
        console.error("Order creation failed:", error);
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 py-4 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white shadow-xl rounded-2xl border border-pink-100 p-4 sm:p-6 lg:p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 lg:mb-10 space-y-4 sm:space-y-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Checkout
                </h1>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <span className="text-sm font-medium text-pink-600">
                    Secure Checkout
                  </span>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="">
                <div className="flex justify-between items-center mb-6">
                  {["Cart", "Shipping", "Payment", "Confirmation"].map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center relative"
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                            idx <= 2
                              ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-110"
                              : "bg-pink-100 text-pink-400"
                          } font-bold`}
                        >
                          {idx < 2 ? <Check className="w-6 h-6" /> : idx + 1}
                        </div>
                        <span
                          className={`text-sm mt-3 font-medium ${
                            idx <= 2 ? "text-pink-600" : "text-gray-400"
                          }`}
                        >
                          {step}
                        </span>
                        {idx < 3 && (
                          <div
                            className={`absolute top-6 left-12 w-24 h-1 ${
                              idx < 2
                                ? "bg-gradient-to-r from-pink-500 to-rose-500"
                                : "bg-pink-200"
                            } transition-all duration-500`}
                          ></div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-8 lg:mb-10">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                  Payment Method
                </h2>

                <p className="text-gray-500 mb-4 flex items-center text-sm sm:text-base">
                  <svg
                    className="w-4 h-4 mr-2 flex-shrink-0"
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

                <div className="border border-pink-200 rounded-xl overflow-hidden shadow-lg mb-6">
                  {/* COD Option */}
                  <div
                    className={`p-4 sm:p-5 flex items-center cursor-pointer transition-all duration-200 ${
                      paymentMethod === "cod"
                        ? "bg-pink-50"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        paymentMethod === "cod"
                          ? "border-pink-600"
                          : "border-gray-400"
                      } flex items-center justify-center mr-4 transition-all duration-200 flex-shrink-0`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center flex-1">
                      <div className="text-xl sm:text-2xl mr-3 flex-shrink-0">
                        💵
                      </div>
                      <div>
                        <div className="text-base sm:text-lg font-semibold text-gray-900">
                          Cash on Delivery
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          Pay with cash when your order arrives
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Online Payment Option */}
                  <div
                    className={`p-4 sm:p-5 flex items-center cursor-pointer transition-all duration-200 border-t border-pink-200 ${
                      paymentMethod === "online"
                        ? "bg-pink-50"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => setPaymentMethod("online")}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        paymentMethod === "online"
                          ? "border-pink-600"
                          : "border-gray-400"
                      } flex items-center justify-center mr-4 transition-all duration-200 flex-shrink-0`}
                    >
                      {paymentMethod === "online" && (
                        <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center flex-1">
                      <div className="text-xl sm:text-2xl mr-3 flex-shrink-0">
                        💳
                      </div>
                      <div>
                        <div className="text-base sm:text-lg font-semibold text-gray-900">
                          Online Payment
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          UPI, Cards, Wallets, NetBanking
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="mb-8 lg:mb-10">
                {/* <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                  Billing Address
                </h2> */}

                <div className="border border-pink-200 rounded-xl overflow-hidden divide-y divide-pink-200 shadow-md">
                  {["same", "different"].map((option) => (
                    <div
                      key={option}
                      className={`p-4 sm:p-5 flex items-center cursor-pointer transition-all duration-200 ${
                        billingAddressOption === option
                          ? "bg-pink-50"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      onClick={() => setBillingAddressOption(option)}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          billingAddressOption === option
                            ? "border-pink-600"
                            : "border-gray-400"
                        } flex items-center justify-center mr-4 transition-all duration-200 flex-shrink-0`}
                      >
                        {billingAddressOption === option && (
                          <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
                        )}
                      </div>
                      <div className="text-gray-800 font-medium text-sm sm:text-base">
                        {option === "same"
                          ? "Same as shipping address"
                          : "Use a different billing address"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {billingAddressOption === "different" && (
                <div className="mb-8 lg:mb-10">
                  <AddressBillingFields
                    onFormDataChange={handleFormDataChange}
                    initialData={userFilledDetails}
                  />
                </div>
              )}

              {/* Payment Button */}
              <div className="mb-6">
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className={`w-full ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600"
                  } text-white py-3 sm:py-4 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center text-sm sm:text-base`}
                >
                  <Toaster
                    toastOptions={{
                      style: {
                        background: "#ec4899",
                        color: "#ffffff",
                        padding: "16px",
                        borderRadius: "10px",
                      },
                      success: {
                        iconTheme: {
                          primary: "#10b981",
                          secondary: "#ffffff",
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
                    `Complete ${
                      paymentMethod === "online" ? "Payment" : "Order"
                    }`
                  )}
                </button>
                <div className="mt-3 flex items-center justify-center text-gray-500 text-xs sm:text-sm">
                  <svg
                    className="w-4 h-4 mr-1 flex-shrink-0"
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
                  <span className="text-center">
                    {paymentMethod === "cod"
                      ? "Your order will be confirmed after you complete this step"
                      : "Your card won't be charged until you review this order on the next page"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl border border-pink-100 sticky top-4">
              <h2 className="text-lg sm:text-xl font-semibold mb-6 pb-4 border-b border-pink-200">
                Order Summary
              </h2>

              {/* User Details */}
              <div className="mb-6 pb-4 border-b border-pink-200">
                <h6 className="text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Name:{" "}
                  <span className="font-normal">{userDetails?.first_name}</span>
                </h6>
                <h6 className="text-sm sm:text-base font-medium text-gray-700">
                  Mobile:{" "}
                  <span className="font-normal">
                    {userDetails?.phone_number}
                  </span>
                </h6>
              </div>

              {/* Address */}
              <div className="mb-6 pb-4 border-b border-pink-200">
                <h3 className="text-sm sm:text-base font-semibold mb-2">
                  Delivery Address:
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {userDetails?.address && `${userDetails.address}, `}
                  {userDetails?.city && `${userDetails.city}, `}
                  {userDetails?.state && `${userDetails.state}, `}
                  {userDetails?.landmark && `${userDetails.landmark}, `}
                  {userDetails?.pincode}
                </p>
              </div>

              {/* Payment Method Summary */}
              <div className="mb-6 pb-4 border-b border-pink-200">
                <h3 className="text-sm sm:text-base font-semibold mb-2">
                  Payment Method
                </h3>
                <div className="flex items-center">
                  <div className="text-lg sm:text-xl mr-2">
                    {paymentMethod === "cod" ? "💵" : "💳"}
                  </div>
                  <div className="font-medium text-sm sm:text-base">
                    {paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : "Online Payment"}
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-3 sm:space-y-4 mb-6">
                {cart && cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item?.id || Math.random()}
                      className="flex items-start pb-3 sm:pb-4 border-b border-pink-100"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-md overflow-hidden">
                          {item?.images?.[0] ? (
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                              No img
                            </div>
                          )}
                        </div>
                        <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-pink-600 rounded-full text-white text-xs flex items-center justify-center">
                          {item?.quantity || 1}
                        </span>
                      </div>
                      <div className="flex-1 ml-3 sm:ml-4 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                          {item?.name || "Product"}
                        </h3>
                        {item?.variant && (
                          <p className="text-gray-500 text-xs sm:text-sm">
                            {item.variant}
                          </p>
                        )}
                      </div>
                      <div className="ml-2 sm:ml-4 text-right flex-shrink-0">
                        <span className="font-medium text-sm sm:text-base">
                          ₹{calculateMrp(item.mrp, item.discount)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    Your cart is empty
                  </div>
                )}
              </div>

              {/* Subtotal and Shipping */}
              <div className="space-y-3 mb-6 pb-6 border-b border-pink-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">
                    Subtotal{" "}
                    {cart.length > 0 &&
                      `· ${cart.length} item${cart.length !== 1 ? "s" : ""}`}
                  </span>
                  <span className="font-medium text-sm sm:text-base">
                    ₹{totalAmount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">
                    Shipping
                  </span>
                  <span className="text-green-600 font-medium text-sm sm:text-base">
                    Free
                  </span>
                </div>

                {/* Giftcard section */}
                <div className="border border-pink-200 rounded-lg">
                  <button
                    className="w-full flex items-center justify-between p-3 sm:p-4"
                    onClick={() => setIsGiftcardOpen(true)}
                  >
                    <span className="font-medium text-sm sm:text-base">
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
                    <div className="p-3 sm:p-4 pt-0">
                      <div className="flex">
                        <input
                          type="text"
                          value={promoCode[0]?.code}
                          // onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Add your code here"
                          className="flex-1 p-2 sm:p-3 border border-pink-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                        />
                        <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-r-lg text-sm">
                          Activated
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {totalAmount > 450 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">
                      Coupon Discount
                    </span>
                    <span className="font-medium text-sm sm:text-base">
                      ₹{promoCode[0]?.discount}
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">Total</span>
                  <div className="text-right">
                    <div className="text-gray-500 text-xs">INR</div>
                    <div className="text-xl font-bold text-pink-600">
                      ₹{totalAmount}
                    </div>
                  </div>
                </div>

                <div className="text-gray-500 text-xs sm:text-sm">
                  Including ₹{taxes?.toLocaleString("en-IN")} in taxes
                </div>
              </div>

              {/* Secure Checkout Badge */}
              <div className="flex items-center justify-center bg-pink-50 rounded-lg p-3 sm:p-4 border border-pink-200">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 mr-2 flex-shrink-0"
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
                <span className="text-pink-700 font-medium text-sm sm:text-base">
                  Secure Checkout
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 lg:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 px-4">
          <div className="flex items-center text-gray-500 text-xs sm:text-sm">
            <svg
              className="w-4 h-4 mr-1 flex-shrink-0"
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
          <div className="flex items-center text-gray-500 text-xs sm:text-sm">
            <svg
              className="w-4 h-4 mr-1 flex-shrink-0"
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
          <div className="flex items-center text-gray-500 text-xs sm:text-sm">
            <svg
              className="w-4 h-4 mr-1 flex-shrink-0"
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
    </div>
  );
}
