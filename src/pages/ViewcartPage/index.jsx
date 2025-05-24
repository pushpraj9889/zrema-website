import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Search,
  User,
  ShoppingBag,
  Trash2,
  Lock,
} from "lucide-react";
import QazmiFooter from "../../components/footerSection";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  deleteAction,
  incrementQuantity,
} from "../../redux/actions";
import QazmiCart from "../../components/cat";
import { useNavigate } from "react-router-dom";
import calculateMrp from "../../utils/commonFunctions";
import { get } from "../../Services/apicallMethode";

export default function Viewcart() {
  const { cart } = useSelector((store) => store?.product || { cart: [] });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State for cart items
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (cart?.length > 0) {
      const total = cart.reduce((acc, item) => {
        return acc + calculateMrp(item.mrp, item.discount) * item.quantity;
      }, 0);
      setTotalAmount(total.toFixed(2));
    } else {
      setTotalAmount(0);
    }
  }, [cart]);

  const cardOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  // State for dropdown accordions
  const [isGiftcardOpen, setIsGiftcardOpen] = useState(true);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  // State for promo code
  const [promoCode, setPromoCode] = useState([]);

  // State for special instructions
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Calculate total
  // const totalAmount = cart.reduce(
  //   (total, item) => total + item.mrp * item.quantity,
  //   0
  // );
  const getCouponCodeApi = async () => {
    try {
      const response = await get("coupon/all");
      // console.log("gjkdsgjk", response[]);
      setPromoCode(response);
    } catch (error) {
      console.log("ksjfdjkdfs", error);
    }
  };
  useEffect(() => {
    getCouponCodeApi();
  }, []);

  const handleIncrementQuantity = (productId) => {
    console.log("getting productid", productId);
    dispatch(incrementQuantity(productId));
  };

  const handleDecrementQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  // Handle item removal
  const removeItem = (id) => {
    dispatch(deleteAction(id));
  };
  const bagClick = () => {
    setIsCartOpen(true);
  };
  const checkoutclick = () => {
    navigate("/CheckoutPage");
  };
  const continueShopping = () => {
    navigate("/");
  };

  // Navigation categories
  const categories = [
    "SHORT KURTIS",
    "LONG KURTIS",
    // "A-LINE KURTIS",
    "CHINARKARI",
    "KURTA SETS",
    "CONTACT",
    "SALE",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}

      {/* Main content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Continue shopping link */}
          <div className="mb-6" onClick={continueShopping}>
            <a
              href="#"
              className="flex items-center text-pink-600 hover:text-pink-700 text-sm"
            >
              <ChevronLeft size={16} className="mr-1" />
              Continue shopping
            </a>
          </div>

          {/* Cart layout - flex on desktop, stack on mobile */}
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Cart items section */}
            <div className="lg:w-2/3 mb-8 lg:mb-0">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex py-6 border-b border-gray-200"
                >
                  {/* Product image */}
                  <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded">
                    <img
                      src={item?.images[0]}
                      alt={"item.name"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product details */}
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-base font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <div className="text-right">
                          <div className="flex items-center">
                            {/* <span className="line-through text-sm text-gray-500 mr-2">
                              Rs. {item.mrp.toFixed(2)}
                            </span> */}
                            <span className="text-lg font-medium text-gray-900">
                              Rs. {item.mrp.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.fabric} / {item.selectedSize}
                      </p>
                    </div>

                    <div className="flex  items-end justify-between  items-center mt-2">
                      <div className="flex items-center">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            className="px-2 py-1 text-gray-600"
                            onClick={() => handleDecrementQuantity(item._id)}
                          >
                            <ChevronDown size={16} />
                          </button>
                          <span className="px-2 py-1 text-black">
                            {item.quantity}
                          </span>
                          <button
                            className="px-2 py-1 text-gray-600"
                            onClick={() => handleIncrementQuantity(item._id)}
                          >
                            <ChevronUp size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary section */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                {/* Giftcard section */}
                <div className="mb-6 border border-gray-200 rounded-lg">
                  <button
                    className="w-full flex items-center justify-between p-4"
                    onClick={() => setIsGiftcardOpen(true)}
                  >
                    <span className="font-medium">
                      Giftcard or discount code
                    </span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        isGiftcardOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isGiftcardOpen && (
                    <div className="p-4 pt-0">
                      <div className="flex">
                        <input
                          type="text"
                          value={promoCode[0]?.code}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Add your code here"
                          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-r-lg">
                          Activate
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order summary */}
                <div className="mb-6">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">
                      Total products ({cart.length})
                    </span>
                    <span className="font-medium">
                      {" "}
                      Rs. {totalAmount - promoCode[0]?.discount}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Total including VAT</span>
                    <span className="font-medium">
                      {" "}
                      Rs. {totalAmount - promoCode[0]?.discount}
                    </span>
                  </div>
                </div>

                {/* Checkout button */}
                <button
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-4 rounded-lg mb-4"
                  onClick={checkoutclick}
                >
                  Checkout
                </button>

                {/* Secure checkout message */}
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Lock size={16} className="mr-2" />
                  <span>Guaranteed secure & safe checkout.</span>
                </div>

                {/* Special instructions */}
                {/* <div className="mt-6 border border-gray-200 rounded-lg">
                  <button
                    className="w-full flex items-center justify-between p-4"
                    onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
                  >
                    <span className="font-medium">
                      Special instructions for the seller
                    </span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        isInstructionsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isInstructionsOpen && (
                    <div className="p-4 pt-0">
                      <textarea
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="Do you have any notes for us?"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 h-32 resize-none"
                      />
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile sticky checkout bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Total:</span>
          <span className="font-bold text-lg">
            Rs. {totalAmount - promoCode[0]?.discount}
          </span>
        </div>
        <button
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg"
          onClick={checkoutclick}
        >
          Checkout
        </button>
        {/* <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <QazmiFooter />
        </div> */}
      </div>
    </div>
  );
}
