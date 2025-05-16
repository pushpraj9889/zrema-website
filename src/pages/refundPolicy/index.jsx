import React from "react";

export default function RefundPolicy() {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-pink-600 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Refund Policy</h1>
      </div>

      <div className="px-6 py-8">
        <p className="text-gray-700 mb-4">
          Thanks for purchasing our products at{" "}
          <span className="font-medium">www.zrema.in</span> operated by M S A
          SHAH CREATIONS.
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p className="text-green-700 font-medium">
            We offer a full money-back guarantee for all purchases made on our
            website.
          </p>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Our Policy:
        </h2>

        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <svg
              className="h-5 w-5 text-indigo-500 mr-2 mt-0.5"
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
            <span>
              If you are not satisfied with the product, you can get your money
              back with no questions asked.
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="h-5 w-5 text-indigo-500 mr-2 mt-0.5"
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
            <span>
              You are eligible for a full reimbursement within 7 calendar days
              of receiving the product.
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="h-5 w-5 text-indigo-500 mr-2 mt-0.5"
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
            <span>
              We accept return and damage, Replacement products in 7 business
              day.
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="h-5 w-5 text-indigo-500 mr-2 mt-0.5"
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
            <span>
              If any case your refund is approved your amount will be credited
              within 5 to 7 business day to the original payment method.
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="h-5 w-5 text-indigo-500 mr-2 mt-0.5"
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
            <span>
              Replacement and damage products will be delivered in 5 to 7
              business day.
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="h-5 w-5 text-red-500 mr-2 mt-0.5"
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
            <span>
              After the 7-day period, products will no longer be eligible for
              Return and Exchange, and you won't be able to receive a refund.
            </span>
          </li>
        </ul>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-700">
            We encourage our customers to try the outfit within 7 days of
            receiving it.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Need Help?
          </h3>
          <p className="text-gray-700">
            If you have any additional questions or would like to request a
            refund, feel free to contact us at:
          </p>
          <a
            href="mailto:support@zrema.in"
            className="mt-2 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
          >
            info@zrema.in
          </a>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          © 2025 M S A SHAH CREATIONS. All rights reserved.
        </p>
      </div>
    </div>
  );
}
