import React from "react";
import Bestsellersection from "../../components/bestsellerSection";
import SocialStoriesSection from "../../components/socialMedia";
import QazmiBestsellers from "../../components/zremaBestsellers";
import BestsellersSection from "../../components/bestsellerSection";
import QazmiTestimonials from "../../components/testimonials";
import QazmiFooter from "../../components/footerSection";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const categories = [
    {
      name: "SHORT KURTIS",
      image: "https://m.media-amazon.com/images/I/719YFc0XeCL._SY879_.jpg",

      alt: "Short Kurtis",
    },
    // {
    //   name: "LONG KURTIS",
    //   image:
    //     "https://zrema.in/cdn/shop/files/6_e8235f90-583d-4974-a776-807fdf0de8a2.jpg?v=1731756348",
    //   alt: "Long Kurtis",
    // },
    // {
    //   name: "A-LINE KURTIS",
    //   image: "https://m.media-amazon.com/images/I/51GwkRw4uLL._SX679_.jpg",
    //   alt: "A-Line Kurtis",
    // },
    // {
    //   name: "CHINARKARI",
    //   image: "https://m.media-amazon.com/images/I/51OSXJDeVlL._SX679_.jpg",
    //   alt: "Chinarkari",
    // },
    // {
    //   name: "KAFTANS",
    //   image:
    //     "https://zrema.in/cdn/shop/files/6_e8235f90-583d-4974-a776-807fdf0de8a2.jpg?v=1731756348",
    //   alt: "Kaftans",
    // },
    // {
    //   name: "KURTA SETS",
    //   image: "https://m.media-amazon.com/images/I/51OSXJDeVlL._SX679_.jpg",
    //   alt: "Kurta Sets",
    // },
    // {
    //   name: "SHOP ALL",
    //   image: "https://m.media-amazon.com/images/I/719YFc0XeCL._SY879_.jpg",
    //   alt: "Shop All",
    // },
  ];
  const onClick = () => {
    navigate("/Collections");
  };
  const viewAllclick = () => {
    navigate("/Collections");
  };
  return (
    <div>
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="rounded-full border-2 border-pink-300 p-1 mb-2"
                  onClick={onClick}
                >
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
      </section>
      {/* <section className="bg-amber-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-serif text-brown-800 mb-4">
                Masterpieces For Her
              </h1>
              <p className="text-xl md:text-2xl text-gray-700">
                Discover The Perfect Blend Of Tradion And Trend
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="/api/placeholder/500/600"
                alt="Woman in maroon kurta"
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section> */}
      <div>
        <Bestsellersection />
        <div className="flex items-center justify-center ">
          <button
            className="text-center text-white text-lg mx-auto bg-primary px-8 py-4 rounded-[30px]"
            onClick={viewAllclick}
          >
            View All
          </button>
        </div>
        <SocialStoriesSection />
        {/* <QazmiBestsellers /> */}
        <BestsellersSection />
        <QazmiTestimonials />
        {/* <QazmiFooter /> */}
      </div>
    </div>
  );
}
