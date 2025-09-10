import React, { useEffect, useState } from "react";
import { UserDetailsAction } from "../redux/actions";
import { useDispatch } from "react-redux";

const AddressBillingFields = ({ onFormDataChange, initialData = {} }) => {
  const [userDetails, setUserDetails] = useState({
    first_name: initialData.first_name || "",
    last_name: initialData.last_name || "",
    phone_number: initialData.phone_number || "",
    address: initialData.address || "",
    pincode: initialData.pincode || "",
    city: initialData.city || "",
    state: initialData.state || "",
    landmark: initialData.landmark || "",
  });

  const [saveInfo, setSaveInfo] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (saveInfo) {
      dispatch(UserDetailsAction(userDetails, false));
    }
  }, [saveInfo]);

  // Handle input changes for all form fields
  const handleInputChange = (field, value) => {
    const updatedUserDetails = {
      ...userDetails,
      [field]: value,
    };

    setUserDetails(updatedUserDetails);

    // Clear field error on input
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }

    // Notify parent and redux
    if (onFormDataChange) {
      onFormDataChange(updatedUserDetails);
    }
  };

  // Validate user details before proceeding
  const validateUserDetails = () => {
    const newErrors = {};
    const requiredFields = [
      "first_name",
      "last_name",
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

  return (
    <div className="billing-address-container">
      {/* Billing Details Section Header */}
      {/* <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Billing Details</h2>
        </div>
      </div> */}

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
            onChange={(e) => handleInputChange("first_name", e.target.value)}
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
            onChange={(e) => handleInputChange("last_name", e.target.value)}
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1 error-message">
              {errors.last_name}
            </p>
          )}
        </div>
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
            onChange={(e) => handleInputChange("phone_number", e.target.value)}
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
            onChange={(e) => handleInputChange("address", e.target.value)}
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
          onChange={(e) => handleInputChange("landmark", e.target.value)}
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
            onChange={(e) => handleInputChange("pincode", e.target.value)}
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

      <button
        onClick={() => {
          const updatedValue = !saveInfo;
          setSaveInfo(updatedValue);
          if (!saveInfo) {
            // Means we're toggling to true
            dispatch(UserDetailsAction(userDetails, true));
          }
        }}
        className={`px-6 py-2 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
          saveInfo
            ? "bg-green-600 hover:bg-green-700"
            : "bg-pink-600 hover:bg-pink-700"
        }`}
      >
        {saveInfo ? "Address Saved" : "Update Address"}
      </button>

      {/* General error message if any field is missing */}
      {Object.keys(errors).length > 0 && (
        <p className="text-red-500 mt-2">
          Please fill in all required fields correctly
        </p>
      )}
    </div>
  );
};

export default AddressBillingFields;
