import React from "react";

const ReturnPolicy = () => {
  return (
    <section className="py-12 bg-pink-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-pink-100">
          {/* Header */}
          <div className="bg-pink-600 py-4 px-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
              Return & Cancellation Policy
            </h1>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Returns Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-pink-800 mb-4 flex items-center">
                <span className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                  1
                </span>
                Returns
              </h2>
              <div className="pl-10">
                <p className="text-gray-700 mb-4">
                  We accept returns only in case of defective or wrong products
                  received. Customers must inform us within{" "}
                  <span className="font-medium text-pink-700">
                    48 hours of delivery
                  </span>{" "}
                  with unboxing video proof. The product should be unused, with
                  original tags and packaging intact.
                </p>
                <p className="text-gray-700 mb-4">
                  Request for returns or replacements will be processed within{" "}
                  <span className="font-medium text-pink-700">
                    7 business days
                  </span>{" "}
                  from the date of delivery.
                </p>

                <p className="text-gray-700 mb-4">
                  Replacement or repaired products will be delivered within{" "}
                  <span className="font-medium text-pink-700">
                    7 business days
                  </span>{" "}
                  after the return is received and verified.
                </p>

                <div className="bg-pink-50 p-4 rounded-md border-l-4 border-pink-400 mt-4">
                  <h3 className="font-medium text-pink-700 mb-2">
                    Return Process:
                  </h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>
                      Contact our customer support team within 48 hours of
                      delivery
                    </li>
                    <li>
                      Provide order number and unboxing video showing the
                      defect/issue
                    </li>
                    <li>
                      Our team will verify your claim and provide further
                      instructions
                    </li>
                    <li>
                      Approved returns must be shipped with all original
                      packaging
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Non-Returnable Items Section */}
            <div>
              <h2 className="text-xl font-semibold text-pink-800 mb-4 flex items-center">
                <span className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                  2
                </span>
                Non-Returnable Items
              </h2>
              <div className="pl-10">
                <p className="text-gray-700 mb-4">
                  The following items are not eligible for return:
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {[
                    "Custom-stitched items",
                    "Worn or used products",
                    "Washed products",
                    "Products without original tags",
                    "Products without original packaging",
                    "Items damaged after delivery",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center bg-white p-3 rounded-md border border-pink-200 shadow-sm"
                    >
                      <span className="text-pink-500 mr-2">✕</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-pink-50 p-4 rounded-md border-l-4 border-pink-400">
                  <p className="text-pink-700 font-medium">
                    Please inspect your order upon receipt and contact us
                    immediately if you receive a defective or incorrect item.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-pink-100">
              <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-lg text-center">
                <p className="text-pink-800 font-medium">
                  For any questions regarding our return policy, please contact
                  us at:
                </p>
                <p className="text-pink-600 font-bold mt-2">
                  info@zrema.in | +91 79820 33215
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReturnPolicy;
