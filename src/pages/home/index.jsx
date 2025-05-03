import React from "react";
import Bestsellersection from "../../components/bestsellerSection";
import SocialStoriesSection from "../../components/socialMedia";
import QazmiBestsellers from "../../components/zremaBestsellers";
import BestsellersSection from "../../components/bestsellerSection";
import QazmiTestimonials from "../../components/testimonials";
import QazmiFooter from "../../components/footerSection";

export default function Home() {
  return (
    <div>
      <section className="bg-amber-50 py-8">
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
      </section>
      <div>
        <Bestsellersection />
        <div className="flex items-center justify-center ">
          <button className="text-center text-white text-lg mx-auto bg-primary px-8 py-4 rounded-[30px]">
            View All
          </button>
        </div>
        <SocialStoriesSection />
        <QazmiBestsellers />
        <BestsellersSection />
        <QazmiTestimonials />
        <QazmiFooter />
      </div>
    </div>
  );
}
