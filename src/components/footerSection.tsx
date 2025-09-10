import React from "react";

export default function QazmiFooter() {
  const footerLinks = [
    { id: 1, title: " Order History", url: "/OrderHistroy" },
    { id: 2, title: "Privacy Policy", url: "/privacy_policy" },
    { id: 3, title: "Refund Policy", url: "/refund_policy" },
    { id: 4, title: "Shipping Policy", url: "/shipping_policy" },
    { id: 5, title: "Terms & Conditions", url: "/T&C" },
    { id: 6, title: "About Us", url: "/AboutUs" },
    { id: 7, title: "Contact Us", url: "/Contact" },
    { id: 8, title: "Return Policy", url: "/return_policy" },
  ];

  return (
    <footer className="bg-gray-100 pt-8 pb-4 px-4 w-full">
      {/* Footer Links */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center md:text-left mb-8">
          <div>
            <a
              href={footerLinks[0].url}
              className="text-gray-700 hover:text-pink-500 text-sm"
            >
              {footerLinks[0]?.title}
            </a>
          </div>
          <div>
            <a
              href={footerLinks[1].url}
              className="text-gray-700 hover:text-pink-500 text-sm"
            >
              {footerLinks[1]?.title}
            </a>
          </div>
          <div>
            <a
              href={footerLinks[2].url}
              className="text-gray-700 hover:text-pink-500 text-sm"
            >
              {footerLinks[2]?.title}
            </a>
          </div>
          <div>
            <a
              href={footerLinks[3].url}
              className="text-gray-700 hover:text-pink-500 text-sm"
            >
              {footerLinks[3]?.title}
            </a>
          </div>
          <div>
            <a
              href={footerLinks[4].url}
              className="text-gray-700 hover:text-pink-500 text-sm"
            >
              {footerLinks[4]?.title}
            </a>
          </div>
          <div>
            <a
              href={footerLinks[7].url}
              className="text-gray-700 hover:text-pink-500 text-sm"
            >
              {footerLinks[7]?.title}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="md:text-left text-center md:col-start-1">
            <a
              href={footerLinks[5].url}
              className="text-gray-700 hover:text-pink-500 text-sm"
            >
              {footerLinks[5]?.title}
            </a>
          </div>
          <div className="md:text-right text-center md:col-start-3">
            <a
              href={footerLinks[6].url}
              className="text-gray-700 hover:text-pink-500 text-sm"
            >
              {footerLinks[6]?.title}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom footer with logo and copyright */}
      <div className="max-w-6xl mx-auto border-t border-gray-300 pt-6 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <a href="/" aria-label="Zrema Home">
            <svg
              width="64"
              height="40"
              viewBox="0 0 120 40"
              className="fill-gray-800"
            >
              <path
                d="M35.5,20.5c0,7.8-6.3,14.1-14.1,14.1S7.3,28.3,7.3,20.5S13.6,6.4,21.4,6.4S35.5,12.7,35.5,20.5z M24.4,14.8
              c-0.3-2.8-2.5-4.8-5.3-4.8c-4.1,0-6.3,3.1-6.3,6.2c0,0.8,0.2,1.6,0.4,2.3c1.5,4.5,6.4,4.4,8.5,3.9L26,29l2.5-2.1L24.4,14.8z
              M21.4,19.4c-0.7,0.3-1.5,0.4-2.3,0.4c-1.3,0-2.4-0.4-2.4-1.7c0-1.2,1.1-1.9,2.1-1.9c1.3,0,2.3,0.9,2.6,2.2L21.4,19.4z"
              />
              <path
                d="M41.5,19.8c0.8-1.5,2.9-3.5,5.1-3.5c1.2,0,2.2,0.5,2.6,1.6c0.6-0.9,2.1-1.6,3.1-1.6c2.3,0,3.2,1.9,3.2,4v8.9h-3.2v-7.8
              c0-0.9-0.1-2-1.3-2c-1.8,0-1.8,2.5-1.8,3.7v6.1h-3.2v-7.8c0-0.9-0.1-2-1.3-2c-1.7,0-1.8,2.2-1.8,3.4v6.4h-3.2V16.6h3.2v3.2H41.5z
              M68.1,21c-0.1-1.1-0.9-2-2-2c-1.3,0-2.1,1.2-2.2,2.4L68.1,21z M71.5,23.9c-0.5,3.1-3.2,5.3-6.4,5.3c-3.9,0-6.8-2.6-6.8-6.6
              c0-3.9,2.7-6.4,6.6-6.4c4.5,0,6.7,3.5,6.6,7.7h-9.8c0,1.5,1.1,2.8,2.7,2.8c1.1,0,2-0.6,2.4-1.7L71.5,23.9z M91.6,29.2h-3.2v-3.1
              h-0.1c-0.6,1.9-2.3,3.4-4.3,3.4c-4.1,0-5.5-3.4-5.5-7c0-2.9,1.5-6.1,4.8-6.1c1.8,0,3.2,0.7,4.1,2.2h0v-8.9h4.1V29.2z M87.5,21.1
              c0-1.4-0.3-3.1-2-3.1c-1.9,0-2,2.4-2,3.8c0,1.4,0.3,3.3,1.9,3.3C87.3,25.1,87.5,22.7,87.5,21.1z M100.4,29.5
              c-3.8,0-6.6-2.6-6.6-6.5c0-3.9,2.8-6.6,6.6-6.6c3.8,0,6.6,2.7,6.6,6.6C107,26.9,104.2,29.5,100.4,29.5z M100.4,19.6
              c-1.7,0-2.4,1.6-2.4,3.2c0,1.6,0.6,3.4,2.4,3.4c1.7,0,2.4-1.8,2.4-3.4C102.8,21.2,102.1,19.6,100.4,19.6z M112.5,15v-3.4h4.1V15H112.5z
              M112.5,29.2v-12.7h4.1v12.7H112.5z"
              />
            </svg>
          </a>
        </div>
        <div className="text-gray-600 text-sm text-center">
          © 2025 Zrema, M S A SHAH CREATIONS
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex space-x-2">
            <a
              href="https://www.instagram.com/_zrema/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
                <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/people/Zrema/61563987748616/?rdid=qi0MT2AV7QDc73WD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18wb7APyaU%2F"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
