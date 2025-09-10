import React from "react";
import Bestsellersection from "../../components/bestsellerSection";
import SocialStoriesSection from "../../components/socialMedia";
import QazmiBestsellers from "../../components/zremaBestsellers";
import QazmiTestimonials from "../../components/testimonials";
import QazmiFooter from "../../components/footerSection";
import banner from "../../assets/images/banner.png";
import ResponsiveBannerCarousel from "../../components/crasoul";

export default function Home() {
  const categories = [
    {
      name: "SHORT KURTIS",

      image:
        "https://zrema.s3.ap-south-1.amazonaws.com/images/392ad32d904febf3d84747ee07d6bdc1.jpg",
      alt: "Short Kurtis",
      link: "/Collections/SHORT KURTIS",
    },
    {
      name: "LONG KURTIS",
      image:
        "https://zrema.s3.ap-south-1.amazonaws.com/images/731c332ed3b83bb1306b81340cc3a7fd.jpg",
      alt: "Long Kurtis",
      link: "/Collections/LONG KURTIS",
    },
    {
      name: "CHINARKARI",
      image:
        "https://zrema.s3.ap-south-1.amazonaws.com/images/5538ea514c51770a7f9e3771af7d2752.jpg",
      alt: "Chinarkari",
      link: "/Collections/Chikankari",
    },
    {
      name: "KASHMIRI SHORT KURTIS",
      image:
        "https://zrema.s3.ap-south-1.amazonaws.com/images/5ef70dfc752e4a8bf058eb9d36ee7330.jpg",
      alt: "Kaftans",
      link: "/Collections/Kashmiri Short Kurti",
    },
    {
      name: "KURTA SETS",
      image:
        "https://zrema.s3.ap-south-1.amazonaws.com/images/fe141059d5eb31f4c271d2a8a1985a3f.jpg",
      alt: "Kurta Sets",
      link: "/Collections/KURTA SETS",
    },
    {
      name: "SHOP ALL",
      image: "https://m.media-amazon.com/images/I/719YFc0XeCL._SY879_.jpg",
      alt: "Shop All",
      link: "/Collections",
    },
  ];

  return (
    <div>
      {/* Category circles section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                <a
                  href={category.link}
                  className="rounded-full border-2 border-pink-300 p-1 mb-2"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                    <img
                      src={category.image}
                      alt={category.alt}
                      className="h-full object-cover"
                    />
                  </div>
                </a>
                <a
                  href={category.link}
                  className="text-xs md:text-sm font-medium text-center hover:text-[#f542a7] cursor-pointer"
                >
                  {category.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ResponsiveBannerCarousel />

      {/* Rest of the content */}
      <div>
        <Bestsellersection />
        <div className="flex items-center justify-center">
          <a
            href="/Collections"
            className="text-center text-white text-lg mx-auto bg-primary px-7 py-2 rounded-[30px]"
          >
            View All
          </a>
        </div>
        <SocialStoriesSection />
        <QazmiBestsellers />
        <QazmiTestimonials />
      </div>
    </div>
  );
}
