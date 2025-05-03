import React from "react";
import { useNavigate } from "react-router-dom";

export default function QazmiBestsellers() {
  const products = [
    {
      id: 1,
      name: "Mahnaz Aari Long Kurti For Women",
      originalPrice: 3999,
      salePrice: 1499,
      image: "/api/placeholder/280/350",
      colors: ["bg-yellow-900", "bg-gray-200"],
      alt: "Mahnaz Aari Long Kurti",
    },
    {
      id: 2,
      name: "Jasmine A-Line Short Kurti For Women",
      originalPrice: 2499,
      salePrice: 829,
      image: "/api/placeholder/280/350",
      colors: ["bg-red-600", "bg-gray-200"],
      alt: "Jasmine A-Line Short Kurti",
    },
    {
      id: 3,
      name: "Zayesha A-line Short Kurti For Women",
      originalPrice: 3499,
      salePrice: 799,
      image: "/api/placeholder/280/350",
      colors: ["bg-yellow-400", "bg-pink-300"],
      alt: "Zayesha A-line Short Kurti",
    },
    {
      id: 4,
      name: "Aafreen Long Kurti For Women",
      originalPrice: 3999,
      salePrice: 999,
      image: "/api/placeholder/280/350",
      colors: ["bg-blue-900", "bg-red-300"],
      alt: "Aafreen Long Kurti",
    },
  ];

  const navigate = useNavigate();
  const viewProduct = () => {
    navigate("./ProductPage");
  };
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Discover Qazmi's Timeless Bestsellers
        </h2>
        <p className="text-gray-600 md:text-lg">
          Experience the elegance and craftsmanship of Qazmi's most beloved
          pieces
        </p>
      </div>

      {/* Category buttons - desktop row, mobile scrollable */}
      <div className="overflow-x-auto pb-4 md:pb-8">
        <div className="flex space-x-3 md:justify-center min-w-max">
          {[
            "A-LINE KURTIS",
            "CHINARKARI",
            "KAFTANS",
            "KURTA SETS",
            "LONG KURTIS",
            "SHORT KURTIS",
          ].map((category) => (
            <button
              key={category}
              className="px-6 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="relative">
              <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 text-sm font-medium rounded">
                Sale
              </span>
              <img
                src={product.image}
                alt={product.alt}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium transform -translate-y-2 group-hover:translate-y-0 transition-all"
                  onClick={viewProduct}
                >
                  Quick View
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800">{product.name}</h3>
              <div className="flex items-center mt-1">
                <span className="text-gray-500 line-through mr-2">
                  Rs. {product.originalPrice.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-pink-600">
                  Rs. {product.salePrice.toFixed(2)}
                </span>
              </div>
              <div className="flex mt-3 space-x-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    className={`w-6 h-6 rounded-full ${color} border border-gray-300`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating cart button (visible on mobile) */}
      <div className="fixed right-6 bottom-6 md:hidden">
        <button className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
