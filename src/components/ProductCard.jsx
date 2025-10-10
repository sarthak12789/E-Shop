import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === product.id);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleHeart = () => {
    if (isInCart) dispatch(removeFromCart(product.id));
    else dispatch(addToCart(product));
  };

  // prevent scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [modalOpen]);

  // close modal on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    };
    if (modalOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modalOpen]);

  return (
    <>
      {/* Product Card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative">
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-contain p-4 bg-gray-100 dark:bg-gray-700 transition-colors duration-300"
          />
          <button
            onClick={handleHeart}
            className="absolute top-3 left-3 bg-white dark:bg-gray-800 rounded-full p-2 shadow hover:scale-110 transform transition-all"
          >
            <span
              className={`text-xl transition-colors ${
                isInCart ? "text-red-500" : "text-gray-400 dark:text-gray-200"
              }`}
            >
              ♥
            </span>
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-2 hover:text-yellow-500 transition-colors">
            {product.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">
            {product.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              ${product.price}
            </span>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
            >
              Know More
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-3xl w-full relative overflow-y-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-700 dark:text-gray-300 hover:text-red-500"
            >
              ×
            </button>

            <div className="flex flex-col md:flex-row gap-6 mt-6">
              {/* Product Image */}
              <div className="md:w-1/2 flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-72 object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {product.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {product.description}
                </p>
                <p className="text-xl font-semibold text-yellow-500">
                  ${product.price}
                </p>

                {/* Specifications */}
                <div className="mt-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Specifications:
                  </h3>
                  <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                    <li>Category: {product.category}</li>
                    <li>Rating: {product.rating?.rate ?? 4.0} ⭐</li>
                    <li>Available Stock: {product.rating?.count ?? 20}</li>
                    <li>Fast & Free Shipping</li>
                  </ul>
                </div>

                {/* Reviews */}
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Reviews:
                  </h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      ⭐⭐⭐⭐☆ - Excellent quality, worth the price!
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      ⭐⭐⭐⭐☆ - Looks exactly like the picture.
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      ⭐⭐⭐⭐☆ - Fast delivery, happy with the purchase.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold transition-transform transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
