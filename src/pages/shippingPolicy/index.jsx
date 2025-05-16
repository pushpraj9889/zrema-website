import React from "react";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-6 py-8 md:py-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Shipping Policy
            </h1>
            <div className="hidden md:block">
              <svg
                className="w-12 h-12 text-white opacity-80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                ></path>
              </svg>
            </div>
          </div>
          <p className="mt-2 text-pink-100">Last Updated: May 13, 2025</p>
        </div>

        {/* Introduction */}
        <div className="px-6 pt-6 pb-2">
          <p className="text-gray-700">
            This document sets out the shipping policy that applies to customers
            that make a purchase at{" "}
            <span className="font-medium">www.zrema.in</span>. If you have any
            questions, please contact our customer service team at{" "}
            <a
              href="mailto:support@zrema.in"
              className="text-pink-600 hover:text-pink-800"
            >
              info@zrema.in
            </a>
          </p>
        </div>

        {/* Free Shipping Banner */}
        <div className="mx-6 my-6">
          <div className="bg-pink-50 border-l-4 border-pink-500 rounded-lg p-5">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-pink-800">
                  Free Shipping on All Orders
                </h3>
                <p className="mt-1 text-pink-700">
                  We're pleased to offer complimentary shipping on every
                  purchase.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-8 divide-y divide-gray-200">
          {/* Order Processing */}
          <section className="py-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Order Processing Time
            </h2>
            <p className="mt-3 text-gray-600">
              Orders are typically Delivered within{" "}
              <span className="font-medium">3 business days</span> from order
              confirmation.
            </p>
          </section>

          {/* Shipping Confirmation */}
          <section className="py-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Shipping Confirmation & Order Tracking
            </h2>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-pink-500 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  Once your order is shipped, you will receive a shipping
                  confirmation email with your tracking number.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-pink-500 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  You can track your order directly through our website or via
                  the carrier's website using the tracking number provided.
                </span>
              </li>
            </ul>
          </section>

          {/* Shipping Delays */}
          <section className="py-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Shipping Delays
            </h2>
            <div className="mt-3 bg-pink-50 border-l-4 border-pink-400 p-4 rounded">
              <p className="text-pink-700">
                Please note that delivery times are estimates and may vary due
                to external factors, including weather, holidays, and carrier
                delays. We are not responsible for shipping delays outside of
                our control.
              </p>
            </div>
          </section>

          {/* Shipping Restrictions */}
          <section className="py-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              Shipping Restrictions
            </h2>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-pink-500 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>We currently ship across India.</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-pink-500 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>We do not ship to P.O. Boxes.</span>
              </li>
            </ul>
          </section>

          {/* Lost or Damaged */}
          <section className="py-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
              Lost or Damaged Packages
            </h2>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-pink-500 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  If your package is lost or damaged during transit, please
                  contact us immediately at{" "}
                  <a
                    href="mailto:support@zrema.in"
                    className="text-pink-600 hover:text-pink-800 font-medium"
                  >
                    info@zrema.in
                  </a>
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 text-pink-500 mr-2 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  We will work with the carrier to resolve the issue as quickly
                  as possible.
                </span>
              </li>
            </ul>
          </section>

          {/* Returns & Refunds */}
          <section className="py-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                ></path>
              </svg>
              Returns, Refunds, and Exchanges
            </h2>
            <p className="mt-3 text-gray-600">
              We want you to be completely happy with your purchase - please
              read our{" "}
              <span className="text-pink-600 font-medium">
                return & refund policy
              </span>{" "}
              for detailed information about our processes.
            </p>

            <div className="mt-6 bg-pink-50 rounded-lg p-5">
              <h3 className="text-lg font-medium text-pink-800">
                Need more information?
              </h3>
              <p className="mt-2 text-pink-700">
                For any questions or concerns about our shipping policy, please
                email us at:{" "}
                <a
                  href="mailto:support@zrema.in"
                  className="font-medium underline hover:text-pink-800"
                >
                  info@zrema.in
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-pink-50 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600">
            © 2025 M S A SHAH CREATIONS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
