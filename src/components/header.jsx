// import React from "react";
import React, { useState } from "react";
import { X, Menu, Search, User, ShoppingBag } from "lucide-react";
import QazmiCart from "../components/cat"; // adjust path

export default function HeaderSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const categories = [
  //   {
  //     name: "SHORT KURTIS",
  //     image: "https://m.media-amazon.com/images/I/719YFc0XeCL._SY879_.jpg",

  //     alt: "Short Kurtis",
  //   },
  //   {
  //     name: "LONG KURTIS",
  //     image:
  //       "https://qazmi.in/cdn/shop/files/6_e8235f90-583d-4974-a776-807fdf0de8a2.jpg?v=1731756348",
  //     alt: "Long Kurtis",
  //   },
  //   {
  //     name: "A-LINE KURTIS",
  //     image: "https://m.media-amazon.com/images/I/51GwkRw4uLL._SX679_.jpg",
  //     alt: "A-Line Kurtis",
  //   },
  //   {
  //     name: "CHINARKARI",
  //     image: "https://m.media-amazon.com/images/I/51OSXJDeVlL._SX679_.jpg",
  //     alt: "Chinarkari",
  //   },
  //   {
  //     name: "KAFTANS",
  //     image:
  //       "https://qazmi.in/cdn/shop/files/6_e8235f90-583d-4974-a776-807fdf0de8a2.jpg?v=1731756348",
  //     alt: "Kaftans",
  //   },
  //   {
  //     name: "KURTA SETS",
  //     image: "https://m.media-amazon.com/images/I/51OSXJDeVlL._SX679_.jpg",
  //     alt: "Kurta Sets",
  //   },
  //   {
  //     name: "SHOP ALL",
  //     image: "https://m.media-amazon.com/images/I/719YFc0XeCL._SY879_.jpg",
  //     alt: "Shop All",
  //   },
  // ];
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const cardOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="flex flex-col  bg-gray-50">
      {/* Free shipping banner */}
      <div className="bg-pink-600 text-white text-center py-2 px-4">
        <p className="font-medium">Get Free Shipping on All Order!</p>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Mobile menu button */}
          <div className="block lg:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-800">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Search icon - visible on all screens */}
          <div className="flex items-center">
            <button className="text-gray-800 mr-2">
              <Search size={24} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex justify-center flex-grow">
            <a
              href="/"
              className="font-serif text-3xl text-gray-800 font-bold italic"
            >
              Zrema
            </a>
          </div>

          {/* User and cart icons */}
          <div className="flex items-center">
            <button className="text-gray-800 mr-4">
              <User size={24} />
            </button>
            <button className="text-gray-800 relative" onClick={cardOpen}>
              <ShoppingBag size={24} />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                1
              </span>
            </button>
            {isCartOpen && (
              <QazmiCart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block mt-4">
          <ul className="flex justify-center space-x-8">
            <li>
              <a href="#" className="text-gray-800 font-medium">
                SHORT KURTIS
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 font-medium">
                LONG KURTIS
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 font-medium">
                A-LINE KURTIS
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 font-medium">
                CHINARKARI
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 font-medium">
                KAFTANS
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 font-medium">
                KURTA SETS
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 font-medium">
                CONTACT
              </a>
            </li>
            <li>
              <a href="#" className="bg-red-500 text-white px-3 py-1">
                SALE
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full z-50 bg-white shadow-lg">
            <ul className="py-2">
              <li>
                <a href="#" className="block px-4 py-2 text-gray-800">
                  SHORT KURTIS
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-gray-800">
                  LONG KURTIS
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-gray-800">
                  A-LINE KURTIS
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-gray-800">
                  CHINARKARI
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-gray-800">
                  KAFTANS
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-gray-800">
                  KURTA SETS
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-gray-800">
                  CONTACT
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-red-500">
                  SALE
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
      {/* Category circles */}
      {/* <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="rounded-full border-2 border-pink-300 p-1 mb-2">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                    <img
                      src={category.image}
                      alt={category.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs md:text-sm font-medium text-center hover:text-[#f542a7] cursor-pointer">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
