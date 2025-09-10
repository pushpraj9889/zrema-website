import React from "react";

export default function RecentlyViewedProducts() {
  const products = [
    {
      id: 1,
      name: "330 Aari Long Kurti For Women",
      image: "/api/placeholder/200/280",
      originalPrice: "Rs. 3,499.00",
      salePrice: "Rs. 979.00",
    },
    {
      id: 2,
      name: "Noura Long Kurti For Women",
      image: "/api/placeholder/200/280",
      originalPrice: "Rs. 3,999.00",
      salePrice: "Rs. 1,199.00",
    },
    {
      id: 3,
      name: "Samara Maroon Long Kurti For Women",
      image: "/api/placeholder/200/280",
      originalPrice: "Rs. 3,999.00",
      salePrice: "Rs. 1,249.00",
    },
    {
      id: 4,
      name: "Aafreen Long Kurti For Women",
      image: "/api/placeholder/200/280",
      originalPrice: "Rs. 3,999.00",
      salePrice: "Rs. 999.00",
    },
    {
      id: 5,
      name: "Aashvi Kaftan Short Kurti For Women",
      image: "/api/placeholder/200/280",
      originalPrice: "Rs. 2,999.00",
      salePrice: "Rs. 849.00",
    },
    {
      id: 6,
      name: "Jasmine A-Line Short Kurti For Women",
      image: "/api/placeholder/200/280",
      originalPrice: "Rs. 2,499.00",
      salePrice: "Rs. 829.00",
    },
    {
      id: 7,
      name: "Anaya Short Kurti For Women",
      image: "/api/placeholder/200/280",
      originalPrice: "Rs. 2,499.00",
      salePrice: "Rs. 749.00",
    },
  ];

  return (
    <div className="w-full py-8 px-4">
      {/* Section Title */}
      <h2 className="text-2xl font-medium text-gray-800 mb-6">
        Recently viewed products
      </h2>

      {/* Desktop Version - Grid Layout */}
      <div className="hidden md:grid grid-cols-7 gap-4">
        {products.map((product) => (
          <div key={product.id} className="cursor-pointer">
            <div className="mb-2">
              <img src={product.image} alt={product.name} className="w-full" />
            </div>
            <h3 className="text-sm text-gray-800 mb-1">{product.name}</h3>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice}
              </span>
              <span className="text-sm text-red-600 font-medium">
                {product.salePrice}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Version - Scrollable */}
      <div className="md:hidden flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-32">
            <div className="mb-2">
              <img src={product.image} alt={product.name} className="w-full" />
            </div>
            <h3 className="text-xs text-gray-800 mb-1">{product.name}</h3>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 line-through">
                {product.originalPrice}
              </span>
              <span className="text-xs text-red-600 font-medium">
                {product.salePrice}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
