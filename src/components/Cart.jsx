import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import SmartImage from './SmartImage';

const Cart = ({ onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const priceOf = (item) => {
    const d = item?.offers?.[0]?.value || 0;
    return Number((item.price * (1 - d / 100)).toFixed(2));
  };
  const total = cartItems.reduce((sum, item) => sum + priceOf(item), 0);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    alert(`Order placed! Total: $${total.toFixed(2)}`);
    dispatch(clearCart());
    onClose();
  };

  return (
    <div
      ref={cartRef}
      className="absolute right-4 top-16 w-80 bg-white dark:bg-gray-900 shadow-2xl rounded-xl p-4 z-50 transition-transform transform scale-100"
    >
      <h2 className="text-xl font-bold font-serif mb-4 text-gray-900 dark:text-gray-100">
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-sm">Cart is empty</p>
      ) : (
        <>
          {/* Scrollable items */}
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2 cart-scroll">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
              >
                <SmartImage
                  src={item.images?.[0] || item.image}
                  alt={item.title}
                  className="w-12 h-12 rounded"
                  fit="contain"
                  bgClass="bg-white"
                />
                <div className="flex-1 ml-3">
                  <p className="text-sm font-medium font-sans text-gray-800 dark:text-gray-100 line-clamp-2">
                    {item.title}
                  </p>
                  {item?.offers?.length ? (
                    <div className="text-sm">
                      <span className="text-yellow-600 font-semibold">${priceOf(item).toFixed(2)}</span>
                      <span className="text-gray-400 line-through ml-2 text-xs">${item.price.toFixed(2)}</span>
                    </div>
                  ) : (
                    <p className="text-sm font-sans text-gray-600 dark:text-gray-300">${item.price.toFixed(2)}</p>
                  )}
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Total & Place Order */}
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold font-sans text-gray-900 dark:text-gray-100">
                Total:
              </span>
              <span className="font-bold font-sans text-yellow-500">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
              className={`w-full py-2 rounded-xl text-white font-semibold transition-transform duration-200 ${
                cartItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 transform hover:scale-105"
              }`}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
