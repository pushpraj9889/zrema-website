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
  const buyitNow = () => {
    console.log("buyitnow");
    dispatch(addTocartAction(productdata));
    navigate("/CheckoutPage");
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
              <div className="flex items-end justify-end px-4 py-3">
                <button
                  className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <div>
                <span className="text-black-500 font-semibold text-base ml-4">
                  {productdata?.name}
                </span>

                <ImageSlider images={productdata?.images} />
              </div>
              <div className="flex items-start mb-2 ml-2 mt-1">
                <span className="text-primary line-through mr-2 f ">
                  Rs. {productdata?.mrp?.toFixed(2)}
                </span>
                <span className="text-black font-medium">
                  Rs. {productdata?.mrp?.toFixed(2)}
                </span>
              </div>
              {/* <div> */}
              <span className="text-black ml-4 mt-2">Fabric</span>
              {/* <div className="border w-[120] h-10 items-center justify-center flex"> */}
              <span className="text-black ml-4 border w-[120px] h-[40px] flex items-center justify-center border-pink-400 mt-2">
                {productdata?.fabric}
              </span>

              {/* </div> */}
              {/* </div> */}
              <span className="text-black ml-4 mt-2">Size</span>
              <div className="flex flex-wrap gap-3">
                {productdata?.size?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => onClick(index)}
                    className={`min-w-12 h-12 px-4 ml-4  mt-2 flex items-center justify-center rounded-md transition-all ${
                      selectIndex === index
                        ? "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <span className="text-black ml-3 mt-3">
                SKU: {productdata?.description}
              </span>

              <button
                onClick={addtoCart}
                type="button"
                class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-4 text-center me-2 mb-2 mt-6 ml-3 mr-8"
              >
                Add to cart
              </button>

              <button
                type="button "
                class="border-2 border-black mb-2 mt-2 ml-5 mr-8 text-black py-2 rounded"
                onClick={buyitNow}
              >
                Buy it now
              </button>
              <div className="border py-4 ml-4 px-4 w-[400px]">
                <sapn className="text-black px-4">
                  Guaranteed secure & safe checkout.
                </sapn>
              </div>
              <div class="space-y-2 text-sm text-gray-700 ml-4 mt-4 mb-3">
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
