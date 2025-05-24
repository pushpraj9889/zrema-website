import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/LOGO.jpg";
import {
  BadgeIcon,
  BandageIcon,
  ShoppingBag,
  ShoppingBagIcon,
} from "lucide-react";
import { UserDetailsAction } from "../../redux/actions";
import { useEffect } from "react";
import calculateMrp from "../../utils/commonFunctions";

const CheckoutPage = () => {
  const [emailNews, setEmailNews] = useState(true);
  const [saveInfo, setSaveInfo] = useState(false);
  const [billingAddressOption, setBillingAddressOption] = useState("same");
  const { cart } = useSelector((store) => store?.product || { cart: [] });
  const userFilledDetails = useSelector(
    (store) => store?.userDetailsReducer?.userDetails
  );

  const [userDetails, setUserDetails] = useState({
    first_name: userFilledDetails?.first_name,
    last_name: userFilledDetails?.last_name,
    email: userFilledDetails?.email,
    phone_number: userFilledDetails?.phone_number,
    address: userFilledDetails?.address,
    pincode: userFilledDetails?.pincode,
    city: userFilledDetails?.city,
    state: userFilledDetails?.state,
    landmark: userFilledDetails?.landmark,
  });
  console.log("userFilledDetails", userDetails);

  const [errors, setErrors] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoClick = () => {};
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

  // Calculate totals
  // const subtotal = cart.reduce(
  //   (sum, item) => sum + item.mrp * item.quantity,
  //   0
  // );
  const taxes = 0;
  // const total = subtotal + taxes;

  const bagclick = () => {
    navigate("/ZremaCartPage");
  };

  // Handle input changes for all form fields
  const handleInputChange = (field, value) => {
    setUserDetails({
      ...userDetails,
      [field]: value,
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  // Validate user details before proceeding
  const validateUserDetails = () => {
    const newErrors = {};
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "phone_number",
      "address",
      "pincode",
      "city",
      "state",
    ];

    requiredFields.forEach((field) => {
      if (!userDetails[field]) {
        newErrors[field] = `${field.replace("_", " ")} is required`;
      }
    });

    // Email validation
    if (
      userDetails.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone number validation
    if (
      userDetails.phone_number &&
      !/^\d{10}$/.test(userDetails.phone_number)
    ) {
      newErrors.phone_number = "Please enter a valid 10-digit phone number";
    }

    // Pincode validation
    if (userDetails.pincode && !/^\d{6}$/.test(userDetails.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit PIN code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const proceedOrderPress = () => {
    if (validateUserDetails()) {
      dispatch(UserDetailsAction(userDetails, false));
      navigate("/Order");
    } else {
      // Scroll to first error
      const firstErrorField = document.querySelector(".error-message");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header/Navigation Bar */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            {/* <button className="mr-4 text-gray-500" onClick={() => navigate(-1)}>
    <i className="fas fa-arrow-left"></i>
  </button> */}
            <a
              href="/"
              className="flex items-center font-serif text-3xl text-gray-800 font-bold italic"
            >
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto cursor-pointer"
                onClick={logoClick}
              />
            </a>
          </div>
          <button className="text-gray-800 relative" onClick={bagclick}>
            <ShoppingBagIcon size={24} />
            {/* <span className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.length}
            </span> */}
          </button>

          {/* <BandageIcon className="h-8 w-8 cursor-pointer" onClick={bagclick} /> */}
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Contact & Delivery Form */}
          <div className="w-full md:w-3/5">
            {/* Billing Details Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Billing Details</h2>
              </div>
            </div>

            {/* Delivery Section */}
            <div className="mb-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="First name"
                    className={`border ${
                      errors.first_name ? "border-red-500" : "border-gray-300"
                    } rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    value={userDetails.first_name}
                    onChange={(e) =>
                      handleInputChange("first_name", e.target.value)
                    }
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.first_name}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last name"
                    className={`border ${
                      errors.last_name ? "border-red-500" : "border-gray-300"
                    } rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    value={userDetails.last_name}
                    onChange={(e) =>
                      handleInputChange("last_name", e.target.value)
                    }
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  value={userDetails.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className={`w-full border ${
                      errors.phone_number ? "border-red-500" : "border-gray-300"
                    } rounded-md p-3 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    value={userDetails.phone_number}
                    onChange={(e) =>
                      handleInputChange("phone_number", e.target.value)
                    }
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <i className="fas fa-question-circle text-gray-400"></i>
                  </div>
                </div>
                {errors.phone_number && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.phone_number}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Address"
                    className={`w-full border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } rounded-md p-3 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    value={userDetails.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                </div>
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Landmark */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Near landmark"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={userDetails.landmark}
                  onChange={(e) =>
                    handleInputChange("landmark", e.target.value)
                  }
                />
              </div>

              {/* PIN, City, State */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="PIN code"
                    className={`border ${
                      errors.pincode ? "border-red-500" : "border-gray-300"
                    } rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    value={userDetails.pincode}
                    onChange={(e) =>
                      handleInputChange("pincode", e.target.value)
                    }
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.pincode}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    className={`border ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    } rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    value={userDetails.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.city}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="State"
                    className={`border ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    } rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    value={userDetails.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.state}
                    </p>
                  )}
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

              <button
                onClick={proceedOrderPress}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
              >
                Proceed For Order
              </button>

              {/* General error message if any field is missing */}
              {Object.keys(errors).length > 0 && (
                <p className="text-red-500 mt-2">
                  Please fill in all required fields correctly
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full md:w-2/5 bg-white p-6 rounded-md shadow-sm">
            {/* Cart Items */}
            <div className="border-b border-gray-200 pb-6">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="flex items-start mb-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.images[0]}
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
                    </div>
                    <div className="ml-4 text-right">
                      <span className="font-medium">
                        ₹{calculateMrp(item.mrp, item.discount)}
                      </span>
                    </div>
                    <div>
                      <span>{item.selectedSize}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Your cart is empty
                </p>
              )}
            </div>

            {/* Order Summary */}
            <div className="py-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">
                  Subtotal · {cart.length} item{cart.length !== 1 ? "s" : ""}
                </span>
                <span className="font-medium">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-gray-700">Shipping</span>
                  <i className="fas fa-question-circle text-gray-400 ml-1"></i>
                </div>
                <span className="text-gray-500">
                  {userDetails.address
                    ? "Free Shipping"
                    : "Enter shipping address"}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-lg font-medium">Total</span>
                <div className="text-right">
                  <div className="text-gray-500 text-sm">INR</div>
                  <div className="text-xl font-bold">₹{totalAmount}</div>
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
