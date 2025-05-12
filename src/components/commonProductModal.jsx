import { useState } from "react";
import { X, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QazmiFooter from "./footerSection";
import ImageSlider from "./imageSlider";
import { useDispatch } from "react-redux";
import { addTocartAction } from "../redux/actions";
import QazmiCart from "./cat";

export default function QazmiCartProdcut({ isOpen, setIsOpen, productdata }) {
  const dispatch = useDispatch();
  console.log("productdata", productdata);
  const [selectIndex, setSelectIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  if (!isOpen) return null;
  const onClick = (index) => {
    setSelectIndex(index);
  };

  const addtoCart = () => {
    dispatch(addTocartAction(productdata));
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden ">
      <div className="absolute inset-0 overflow-hidden">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Cart panel */}
        <div className="absolute inset-y-0 right-0 max-w-full flex max-h-screen overflow-y-auto overflow-x-hidden  bg-white">
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white">
              {/* Cart header */}
              <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                <button
                  className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="border mt-5">
                <span className="text-red-500 font-semibold text-base">
                  {productdata?.name}
                </span>

                <ImageSlider images={productdata?.images} />
              </div>
              <div className="flex items-start mb-2">
                <span className="text-primary line-through mr-2  ">
                  Rs. {productdata?.mrp?.toFixed(2)}
                </span>
                <span className="text-black font-medium">
                  Rs. {productdata?.mrp?.toFixed(2)}
                </span>
              </div>
              {/* <div> */}
              <span className="text-black">Fabric</span>
              <div className="border w-[120] h-10 items-center justify-center flex">
                <span className="text-black">{productdata?.fabric}</span>
              </div>
              {/* </div> */}
              <sapn>Size</sapn>
              <div className="flex ">
                {productdata?.size?.map((item, index) => {
                  return (
                    <div
                      onClick={() => onClick(index)}
                      className="border ml-3 px-4 py-2"
                    >
                      <span
                        className={`${
                          selectIndex === index
                            ? " text-red-400"
                            : "text-green-500"
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>

              <span className="text-black border">
                SKU: {productdata?.description}
              </span>

              <button
                onClick={addtoCart}
                type="button"
                class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-4 text-center me-2 mb-2 mt-6 ml-5 mr-8"
              >
                Add to cart
              </button>

              <button
                type="button "
                class="border-2 border-black mb-2 mt-2 ml-5 mr-8 text-black py-2 rounded"
              >
                Buy it now
              </button>
              <div className="border py-4">
                <sapn className="text-black">
                  Guaranteed secure & safe checkout.
                </sapn>
              </div>
              <div class="space-y-2 text-sm text-gray-700">
                <div>
                  <span class="font-semibold">Shipped today?</span>
                  <span class="text-green-600">Order within: 01:57:36</span>
                </div>
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Assured Quality</span>
                </div>
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>100% Purchase Protection</span>
                </div>
              </div>
              {isCartOpen && (
                <QazmiCart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
              )}

              {/* Cart footer with totals and checkout buttons */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
