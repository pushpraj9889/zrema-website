import React from "react";
import { Truck, ShieldCheck, HelpCircle, ChevronUp } from "lucide-react";

export default function QazmiTestimonials() {
  const testimonials = [
    {
      id: 1,
      quote:
        "Zrema's Chinarkari kurtis are simply stunning. The intricate details and comfortable fabric make them my go-to choice for both casual and festive occasions.",
      author: "Priya S.",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "I fell in love with Zrema's kashmiri kurti. They offer the perfect blend of style and comfort, making me feel effortlessly chic every time I wear one.",
      author: "Aisha M.",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "Zrema's short kurti are a game-changer! They are not just stylish but also incredibly comfortable. Perfect for when I want to look elegant without compromising on comfort.",
      author: "Neha R.",
      rating: 5,
    },
  ];

  const benefits = [
    {
      id: 1,
      title: "100% Secure Payments",
      icon: <ShieldCheck className="w-12 h-12 mx-auto text-gray-700" />,
    },
    {
      id: 2,
      title: "Free Shipping",
      icon: <Truck className="w-12 h-12 mx-auto text-gray-700" />,
    },
    {
      id: 3,
      title: "Active Support",
      icon: <HelpCircle className="w-12 h-12 mx-auto text-gray-700" />,
    },
  ];

  const renderStars = (rating) => {
    return Array(rating)
      .fill()
      .map((_, i) => (
        <span key={i} className="text-yellow-500">
          ★
        </span>
      ));
  };

  return (
    <div className="bg-gray-100 py-12 px-4 w-full">
      {/* Testimonials Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Testimonials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
              <div className="text-yellow-500 mb-2">
                {renderStars(testimonial.rating)}
              </div>
              <p className="font-medium text-gray-800">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto pt-8 border-t border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="text-center p-4">
              {benefit.icon}
              <h3 className="mt-4 font-semibold text-lg text-gray-800">
                {benefit.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll to top button */}
      <div className="text-center mt-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition duration-300"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
