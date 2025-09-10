import React from "react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-6 py-8 md:py-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Terms of Service
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
          </div>
          <p className="mt-2 text-pink-100">Last Updated: May 13, 2025</p>
        </div>

        <div>
          <p className="text-gray-700">
            All products shown on the website are hand-made and may have slight
            variations. Prices and availability are subject to change without
            prior notice. We reserve the right to refuse or cancel orders in
            case of suspicious activity or pricing errors. Customers are
            responsible for providing accurate shipping details.
          </p>
        </div>

        {/* Introduction */}
        <div className="px-6 pt-6 pb-2">
          <div className="bg-pink-50 border-l-4 border-pink-500 rounded-lg p-5">
            <p className="text-gray-700">
              Please read these Terms and Conditions ("Terms", "Terms and
              Conditions") carefully before using the{" "}
              <span className="font-medium">http://www.Zrema.com</span> website
              operated by M S A SHAH CREATIONS ("us", "we", or "our"). Your
              access to and use of the Service is conditioned on your acceptance
              of and compliance with these Terms. These Terms apply to all
              visitors, users and others who access or use the Service.
            </p>
            <p className="text-gray-700 mt-4 font-medium">
              By accessing or using the Service you agree to be bound by these
              Terms. If you disagree with any part of the terms then you may not
              access the Service.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-8 divide-y divide-gray-200">
          {/* Purchases */}
          <section className="py-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
              Purchases
            </h2>
            <p className="mt-3 text-gray-600">
              If you wish to purchase any product made available through the
              Service ("Purchase"), you may be asked to supply certain
              information relevant to your Purchase which includes your name,
              address, contact information and other demographic details.
            </p>
          </section>

          {/* Content */}
          <section className="py-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              Content
            </h2>
            <p className="mt-3 text-gray-600">
              Our Service allows you to post, link, store, share and otherwise
              make available certain information, text, graphics, videos, or
              other material ('Content'). You are responsible for the same.
            </p>
          </section>

          {/* Links To Other Web Sites */}
          <section className="py-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                ></path>
              </svg>
              Links To Other Web Sites
            </h2>
            <div className="mt-3 text-gray-600">
              <p>
                Our Service may contain links to third-party web sites or
                services that are not owned or controlled by M S A SHAH
                CREATIONS . M S A SHAH CREATIONS has no control over, and
                assumes no responsibility for, the content, privacy policies, or
                practices of any third party web sites or services.
              </p>
              <p className="mt-3">
                You further acknowledge and agree that M S A SHAH CREATIONS
                shall not be responsible or liable, directly or indirectly, for
                any damage or loss caused or alleged to be caused by or in
                connection with use of or reliance on any such content, goods or
                services available on or through any such web sites or services.
              </p>
            </div>
            <div className="mt-4 bg-pink-50 border-l-4 border-pink-400 p-4 rounded">
              <p className="text-pink-700">
                We strongly advise you to read the terms and conditions and
                privacy policies of any third-party web sites or services that
                you visit.
              </p>
            </div>
          </section>

          {/* Changes */}
          <section className="py-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              Changes
            </h2>
            <p className="mt-3 text-gray-600">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material we will try to
              provide at least 30 days' notice prior to any new terms taking
              effect. What constitutes a material change will be determined at
              our sole discretion.
            </p>
          </section>

          {/* Contact Us */}
          <section className="py-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-pink-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              Contact Us
            </h2>
            <div className="mt-6 bg-pink-50 rounded-lg p-5">
              <h3 className="text-lg font-medium text-pink-800">
                Have questions about our Terms?
              </h3>
              <p className="mt-2 text-pink-700">
                If you have any questions about these Terms, please contact us
                at:{" "}
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
