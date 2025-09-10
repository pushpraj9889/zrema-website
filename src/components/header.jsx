import React, { useState, useRef, useEffect } from "react";
import { X, Menu, Search, User, ShoppingBag } from "lucide-react";
import QazmiCart from "../components/cat"; // adjust path
import { useSelector } from "react-redux";
import axios from "axios";
import useDebounce from "../utils/debounce";
import ShippingBanner from "./shippingBanner";

export default function HeaderSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useSelector((store) => store?.product || { cart: [] });

  // Search functionality states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const debouncedQuery = useDebounce(searchQuery, 500); // 500ms debounce

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const cardOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length > 2) {
      fetchSearchResults(debouncedQuery);
    } else {
      setSearchResults([]);
    }
  }, [debouncedQuery]);

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // if (query.length > 2) {
    //   fetchSearchResults(debouncedQuery);
    // } else {
    //   setSearchResults([]);
    // }
  };

  // Function to fetch search results from API

  const fetchSearchResults = async (query) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.zrema.com/product/search?query=${query}`
      );
      console.log("searchresponse", response.data);
      setSearchResults(response.data || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle search dropdown
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus the search input when opening
      setTimeout(() => {
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }, 100);
    } else {
      // Clear search results when closing
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col bg-gray-50">
      {/* Free shipping banner */}
      {/* <div className="bg-pink-600 text-white text-center py-2 px-4">
        <p className="font-medium">Get Free Shipping on All Order!</p>
      </div> */}
      <ShippingBanner />

      {/* Header */}
      <header className="bg-white shadow-sm py-4 relative">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Mobile menu button */}
          <div className="block lg:hidden mt-2">
            <button onClick={toggleMobileMenu} className="text-gray-800">
              {mobileMenuOpen ? <X size={22} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Search icon - visible on all screens */}
          <div className="flex items-center">
            <button
              className="text-gray-800 mr-2"
              onClick={toggleSearch}
              aria-label="Search"
            >
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
                {cart.length}
              </span>
            </button>
            {isCartOpen && (
              <QazmiCart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
            )}
          </div>
        </div>

        {/* Search dropdown */}
        {isSearchOpen && (
          <div
            ref={searchRef}
            className="absolute top-full left-0 w-full bg-white shadow-lg z-50 p-4"
          >
            <div className="container mx-auto">
              <div className="flex items-center border-b border-gray-300 pb-2">
                <Search size={20} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search for products..."
                  className="w-full p-2 outline-none"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-gray-500"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Search results */}
              <div className="mt-4 max-h-80 overflow-y-auto">
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-600"></div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((product) => {
                      const imageUrl = product.images?.[0] || "";
                      const discountedPrice = Math.round(
                        product.mrp - (product.mrp * product.discount) / 100
                      );

                      return (
                        <a
                          key={product._id}
                          href={`/ProductPage/${product._id}`}
                          className="flex items-center p-3 hover:bg-gray-100 rounded transition"
                        >
                          <div className="w-16 h-16 bg-gray-200 mr-3 flex-shrink-0 overflow-hidden rounded">
                            {imageUrl && (
                              <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <h3 className="font-medium text-sm text-gray-800">
                              {product.name}
                            </h3>
                            <div className="flex items-center space-x-2 text-sm mt-1">
                              <span className="text-pink-600 font-semibold">
                                ₹{discountedPrice}
                              </span>
                              <span className="line-through text-gray-500">
                                ₹{product.mrp}
                              </span>
                              {product.discount > 0 && (
                                <span className="text-green-600 font-medium">
                                  {product.discount}% off
                                </span>
                              )}
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                ) : searchQuery.length > 2 ? (
                  <p className="text-center py-4 text-gray-500">
                    No products found
                  </p>
                ) : searchQuery.length > 0 ? (
                  <p className="text-center py-4 text-gray-500">
                    Type at least 3 characters to search
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden lg:block mt-4">
          <ul className="flex justify-center space-x-8">
            <li>
              <a
                href="/Collections/SHORT KURTIS"
                className="text-gray-800 font-medium"
              >
                SHORT KURTIS
              </a>
            </li>
            <li>
              <a
                href="/Collections/LONG KURTIS"
                className="text-gray-800 font-medium"
              >
                LONG KURTIS
              </a>
            </li>
            <li>
              <a
                href="/Collections/Chikankari"
                className="text-gray-800 font-medium"
              >
                CHINARKARI
              </a>
            </li>
            <li>
              <a
                href="/Collections/Kashmiri Short Kurti"
                className="text-gray-800 font-medium"
              >
                KASHMIRI SHORT KURTIS
              </a>
            </li>
            <li>
              <a
                href="/Collections/KURTA SETS"
                className="text-gray-800 font-medium"
              >
                KURTA SETS
              </a>
            </li>
            <li>
              <a href="/Contact" className="text-gray-800 font-medium">
                CONTACT
              </a>
            </li>
            <li>
              <a
                href="/Collections"
                className="bg-red-500 text-white px-3 py-1"
              >
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
                <a
                  href="/Collections/SHORT KURTIS"
                  className="block px-4 py-2 text-gray-800"
                >
                  SHORT KURTIS
                </a>
              </li>
              <li>
                <a
                  href="/Collections/LONG KURTIS"
                  className="block px-4 py-2 text-gray-800"
                >
                  LONG KURTIS
                </a>
              </li>
              <li>
                <a
                  href="/Collections/Chikankari"
                  className="block px-4 py-2 text-gray-800"
                >
                  CHINARKARI
                </a>
              </li>
              <li>
                <a
                  href="/Collections/Kashmiri Short Kurti"
                  className="block px-4 py-2 text-gray-800"
                >
                  Kashmiri Short Kurti
                </a>
              </li>
              <li>
                <a
                  href="/Collections/KURTA SETS"
                  className="block px-4 py-2 text-gray-800"
                >
                  KURTA SETS
                </a>
              </li>
              <li>
                <a href="/Contact" className="block px-4 py-2 text-gray-800">
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
    </div>
  );
}
