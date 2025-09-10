import React, { useState, useEffect } from "react";

const ShippingBanner = () => {
  const [showFirstMessage, setShowFirstMessage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstMessage((prev) => !prev);
    }, 6000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="bg-pink-600 text-white text-center py-2 px-4 overflow-hidden"
      style={{ position: "relative", height: "2.5rem" }}
    >
      <p
        key={showFirstMessage}
        className="text-sm font-medium whitespace-nowrap"
        style={{
          animation: "slideIn 0.6s ease-in-out forwards",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showFirstMessage
          ? "Get 5% discount on prepaid order"
          : "Get Free Shipping on All Order!"}
      </p>

      {/* Embedded CSS */}
      <style>{`
        @keyframes slideIn {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0%);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ShippingBanner;
