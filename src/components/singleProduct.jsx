import { useState } from "react";
import { Heart, Share2, ChevronRight, Ruler } from "lucide-react";

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState("Orange");
  const [selectedSize, setSelectedSize] = useState("XS");
  const [currentImage, setCurrentImage] = useState(0);

  const product = {
    name: "Jasmine A-Line Short Kurti For Women",
    originalPrice: 2499.0,
    salePrice: 829.0,
    colors: ["Orange", "Beige"],
    fabric: "Viscose Rayon",
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    sku: "Jasmine Orange A-Line Short_XS",
    images: [
      "/api/placeholder/400/600",
      "/api/placeholder/400/600",
      "/api/placeholder/400/600",
      "/api/placeholder/400/600",
    ],
    thumbnails: ["/api/placeholder/80/100", "/api/placeholder/80/100"],
  };
  const buyitNow = () => {
    console.log("buyitnow");
    dispatch(addTocartAction(product));
    navigate("/CheckoutPage");
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Navigation */}
      <nav className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold italic">Zrema</div>
            <div className="flex space-x-4">
              <button className="p-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button className="p-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
              <button className="p-2 relative">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Categories */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-6">
            <li className="font-medium">SHORT KURTIS</li>
            <li className="font-medium">LONG KURTIS</li>
            {/* <li className="font-medium">A-LINE KURTIS</li> */}
            <li className="font-medium">CHINARKARI</li>
            {/* <li className="font-medium">KAFTANS</li> */}
            <li className="font-medium">KURTA SETS</li>
            <li className="font-medium">CONTACT</li>
            <li className="font-medium bg-red-500 text-white px-2">SALE</li>
          </ul>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm">
          <a href="#" className="text-gray-500">
            Homepage
          </a>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
          <span className="text-gray-700">{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className={`${index === 0 ? "relative" : ""}`}>
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full rounded-md"
                    onClick={() => setCurrentImage(index)}
                  />
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-sm">
                      Sale
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center mb-6">
              <button className="flex items-center mr-4">
                <Share2 className="w-5 h-5 mr-1" />
                <span>Share</span>
              </button>
            </div>

            <div className="flex items-center mb-6">
              <p className="text-gray-500 line-through mr-2">
                Rs. {product.originalPrice.toFixed(2)}
              </p>
              <p className="text-2xl font-bold">
                Rs. {product.salePrice.toFixed(2)}
              </p>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">
                Color <span className="ml-1">{selectedColor}</span>
              </h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-12 h-12 border ${
                      selectedColor === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <img
                      src={product.thumbnails[product.colors.indexOf(color)]}
                      alt={color}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Fabric</h3>
              <div className="inline-block border border-gray-800 px-4 py-2">
                {product.fabric}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Size</h3>
                <button className="flex items-center text-sm">
                  <Ruler className="w-4 h-4 mr-1" />
                  <span>Size chart</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`w-12 h-12 flex items-center justify-center border ${
                      selectedSize === size
                        ? "border-black bg-white"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* SKU */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">SKU: {product.sku}</p>
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <button className="w-full py-4 bg-green-400 hover:bg-green-500 text-white font-medium rounded transition">
                Add to cart
              </button>
              <button
                className="w-full py-4 border border-gray-300 hover:border-gray-400 font-medium rounded transition"
                onClick={buyitNow}
              >
                Buy it now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
