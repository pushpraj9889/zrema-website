import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { userDetails = {} } = useSelector(
    (store) => store?.userDetailsReducer || {}
  );
  const token = userDetails?.token;

  const fetchMyOrders = async () => {
    try {
      const response = await axios.get("https://api.zrema.com/order/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error?.response || error);
    }
  };

  useEffect(() => {
    if (token) fetchMyOrders();
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-xl p-6 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">Order #{order._id}</h2>

            {order.products.map((product) => (
              <div
                key={product._id}
                className="flex items-start gap-4 border-b pb-4 mb-4"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    Size: {product.selectedSize}
                  </p>
                  <p className="text-sm text-gray-600">
                    Qty: {product.quantity}
                  </p>
                  <p className="text-sm text-gray-600">MRP: ₹{product.mrp}</p>
                </div>
              </div>
            ))}

            <div className="mb-3">
              <h4 className="font-semibold text-gray-700">Shipping Address</h4>
              <p className="text-sm">{order.shipping_address}</p>
              <p className="text-sm">Pincode: {order.shipping_pincode}</p>
            </div>

            <div className="mb-3">
              <h4 className="font-semibold text-gray-700">Order Details</h4>
              <p className="text-sm">Status: {order.order_status}</p>
              <p className="text-sm">Total: ₹{order.total_amount}</p>
              <p className="text-sm">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700">Payment Info</h4>
              <p className="text-sm">Type: {order.payment?.payment_type}</p>
              <p className="text-sm">Status: {order.payment?.payment_status}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-12">No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
