import { useState } from "react";

export default function SizeChart({ showSizeChart, setShowSizeChart }) {
  const [isOpen, setIsOpen] = useState(true);

  const sizeData = [
    {
      size: "XXS",
      chest: 32,
      waist: 30,
      hips: 34,
      frontLength: 42,
      acrossShoulder: 12.5,
    },
    {
      size: "XS",
      chest: 34,
      waist: 32,
      hips: 36,
      frontLength: 42,
      acrossShoulder: 13,
    },
    {
      size: "S",
      chest: 36,
      waist: 34,
      hips: 38,
      frontLength: 42,
      acrossShoulder: 13.5,
    },
    {
      size: "M",
      chest: 38,
      waist: 36,
      hips: 40,
      frontLength: 42,
      acrossShoulder: 14,
    },
    {
      size: "L",
      chest: 40,
      waist: 38,
      hips: 42,
      frontLength: 42,
      acrossShoulder: 14.5,
    },
    {
      size: "XL",
      chest: 42,
      waist: 40,
      hips: 44,
      frontLength: 42,
      acrossShoulder: 15,
    },
    {
      size: "2XL",
      chest: 44,
      waist: 42,
      hips: 46,
      frontLength: 42,
      acrossShoulder: 15.5,
    },
    {
      size: "3XL",
      chest: 46,
      waist: 44,
      hips: 48,
      frontLength: 42,
      acrossShoulder: 16,
    },
    {
      size: "4XL",
      chest: 48,
      waist: 46,
      hips: 50,
      frontLength: 42,
      acrossShoulder: 16.5,
    },
    {
      size: "5XL",
      chest: 50,
      waist: 48,
      hips: 52,
      frontLength: 42,
      acrossShoulder: 17,
    },
  ];

  return (
    // <div className="relative w-full max-w-4xl mx-auto bg-white p-4 rounded-md shadow-lg">
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative w-full max-w-4xl mx-auto bg-white p-4 rounded-md shadow-lg">
        {/* Close button */}

        <div className="absolute top-16 right-5">
          <button
            onClick={() => setShowSizeChart(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-8 text-center">Size chart</h2>

        {/* Measurement diagram */}
        <div className="flex justify-center mb-8">
          <div className="relative w-64 h-64">
            {/* Kurti outline */}
            <svg viewBox="0 0 240 280" className="w-full h-full">
              {/* Kurti Outline */}
              <path
                d="M120,20 L100,30 L95,60 L85,65 L85,100 L75,240 L165,240 L155,100 L155,65 L145,60 L140,30 Z"
                fill="none"
                stroke="#000"
                strokeWidth="1"
              />

              {/* Collar */}
              <path
                d="M100,30 L120,20 L140,30"
                fill="none"
                stroke="#000"
                strokeWidth="1"
              />

              {/* Sleeves */}
              <path
                d="M95,60 L65,80 M145,60 L175,80"
                fill="none"
                stroke="#000"
                strokeWidth="1"
              />

              {/* Measurement Lines */}
              {/* Collar */}
              <line
                x1="90"
                y1="25"
                x2="150"
                y2="25"
                stroke="#9acd32"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <text x="70" y="25" fontSize="10" textAnchor="end">
                Collar
              </text>

              {/* Bust */}
              <line
                x1="85"
                y1="75"
                x2="155"
                y2="75"
                stroke="#9acd32"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <text x="70" y="75" fontSize="10" textAnchor="end">
                Bust
              </text>

              {/* Waist */}
              <line
                x1="83"
                y1="115"
                x2="157"
                y2="115"
                stroke="#9acd32"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <text x="70" y="115" fontSize="10" textAnchor="end">
                Waist
              </text>

              {/* Hip */}
              <line
                x1="80"
                y1="155"
                x2="160"
                y2="155"
                stroke="#9acd32"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <text x="70" y="155" fontSize="10" textAnchor="end">
                Hip
              </text>

              {/* Length */}
              <line
                x1="120"
                y1="240"
                x2="120"
                y2="260"
                stroke="#9acd32"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <text x="120" y="270" fontSize="10" textAnchor="middle">
                Length
              </text>

              {/* Across Shoulder */}
              <line
                x1="95"
                y1="45"
                x2="145"
                y2="45"
                stroke="#9acd32"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <text x="170" y="45" fontSize="10" textAnchor="start">
                Across Shoulder
              </text>

              {/* Sleeve Length */}
              <line
                x1="175"
                y1="80"
                x2="155"
                y2="80"
                stroke="#9acd32"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <text x="185" y="80" fontSize="10" textAnchor="start">
                Sleeve Length
              </text>
            </svg>
          </div>
        </div>

        {/* Size Chart Table */}
        <div className="overflow-x-auto">
          <div className="text-center font-bold text-lg mb-2 bg-gray-200 py-2">
            Long Kurti B
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-pink-200">
                  Sizes
                </th>
                <th className="border border-gray-300 px-4 py-2 bg-pink-200">
                  Chest
                </th>
                <th className="border border-gray-300 px-4 py-2 bg-pink-200">
                  Waist
                </th>
                <th className="border border-gray-300 px-4 py-2 bg-pink-200">
                  Hips
                </th>
                <th className="border border-gray-300 px-4 py-2 bg-pink-200">
                  Front Length
                </th>
                <th className="border border-gray-300 px-4 py-2 bg-pink-200">
                  Across Shoulder
                </th>
              </tr>
            </thead>
            <tbody>
              {sizeData.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    {row.size}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.chest}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.waist}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.hips}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.frontLength}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.acrossShoulder}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-red-500 text-sm">
            *NOTE: All measurements are in inches.
          </div>
        </div>
      </div>
    </div>
  );
}
