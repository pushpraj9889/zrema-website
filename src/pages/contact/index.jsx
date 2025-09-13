import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner Image */}
      {/* <div className="w-full bg-gray-200 h-48">
        <img
          className="w-full h-full object-cover"
          src="/api/placeholder/1400/200"
          alt="Contact Banner"
        />
      </div> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Contact Form */}
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Contact form
            </h2>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Name <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-pink-50 focus:ring-pink-500 focus:border-pink-500 p-3"
                />
                <p className="text-sm text-pink-500 mt-1">
                  Please fill in this field.
                </p>
              </div>

              <div>
                <label htmlFor="company" className="block text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-pink-50 focus:ring-pink-500 focus:border-pink-500 p-3"
                  placeholder="Company"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email <span className="text-pink-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-pink-50 focus:ring-pink-500 focus:border-pink-500 p-3"
                  placeholder="Email"
                />
                <p className="text-sm text-pink-500 mt-1">
                  Please fill in this field.
                </p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-pink-50 focus:ring-pink-500 focus:border-pink-500 p-3"
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700">
                  Message <span className="text-pink-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-pink-50 focus:ring-pink-500 focus:border-pink-500 p-3"
                  placeholder="Message"
                ></textarea>
                <p className="text-sm text-pink-500 mt-1">
                  Please fill in this field.
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center py-3 px-12 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-pink-400 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Send
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Account Info and Contact Details */}
          <div className="md:w-1/3 space-y-6">
            {/* Account Details */}
            {/* <div className="bg-black text-white p-6 rounded">
              <h3 className="text-xl font-semibold mb-3">Account details</h3>
              <p className="mb-4">
                <a
                  href="#"
                  className="text-white underline hover:text-pink-300"
                >
                  Track your last order
                </a>
                ,{" "}
                <a
                  href="#"
                  className="text-white underline hover:text-pink-300"
                >
                  view all orders
                </a>{" "}
                or{" "}
                <a
                  href="#"
                  className="text-white underline hover:text-pink-300"
                >
                  manage your addresses
                </a>
                .
              </p>
              <a
                href="#"
                className="block text-white underline hover:text-pink-300"
              >
                Sign in
              </a>
              <a
                href="#"
                className="block text-white underline hover:text-pink-300"
              >
                Create an account
              </a>
            </div> */}

            {/* Contact Us */}
            <div className="bg-black text-white p-6 rounded mt-10">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <a
                href="mailto:support@Zrema.in"
                className="flex items-center bg-white text-black p-3 hover:bg-gray-100 rounded mb-3"
              >
                <svg
                  className="w-6 h-6 mr-3"
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
                info@zrema.in
              </a>
              <a
                href="https://wa.me/yournumber"
                className="flex items-center bg-white text-black p-3 hover:bg-gray-100 rounded"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Ask your questions on WhatsApp
              </a>
            </div>

            {/* Qazmi Location */}
            <div className="bg-black text-white p-6 rounded">
              <h3 className="text-xl font-semibold mb-3">Zrema</h3>
              <p className="mb-1">G-12 Hamdard Nagar Sangam Vihar New Delhi</p>
              <p>
                Phone: +91 79820 33215 We’re available Monday to Saturday, 10 AM
                – 6 PM.
              </p>
              <p className="mb-3">110080 Ratiya Marg Delhi</p>
              <p className="mb-1">
                India{" "}
                <a
                  href="https://www.google.com/maps/place/ZREMA+Clothing/@28.5004469,77.2498017,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce114fd5b9715:0xec88169d411dab87!8m2!3d28.5004469!4d77.252382!16s%2Fg%2F11w92x7xxp?authuser=0&entry=tts&g_ep=EgoyMDI1MDkxMC4wIPu8ASoASAFQAw%3D%3D&skid=36ef01ef-eaa7-470d-8f14-06db13d323af"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-pink-300"
                >
                  Open in Google Maps{" "}
                  <svg
                    className="w-4 h-4 inline-block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-pink-500 text-white rounded-full p-3 shadow-lg hover:bg-pink-600 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
