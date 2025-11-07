import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { Link } from 'react-router-dom';
import SmartImage from './SmartImage';

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
          <SmartImage
            src={product.images?.[0] || product.image}
            alt={product.title}
            className="h-64 rounded-b-none"
            fit="contain"
            bgClass="bg-white"
          />
          {product.offers?.[0] && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
              {product.offers[0].label}
            </span>
          )}
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

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-1 hover:text-yellow-500 transition-colors">
              {product.title}
            </h2>
            {product.line && (
              <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {product.line}
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              {product.offers?.length ? (
                <>
                  <span className="text-sm font-bold text-yellow-600">${(product.price * (1 - product.offers[0].value / 100)).toFixed(2)}</span>
                  <span className="text-xs line-through text-gray-400">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">${product.price.toFixed(2)}</span>
              )}
            </div>
            <Link
              to={`/product/${product.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
            >
              Know More
            </Link>
          </div>
        </div>
      </div>

      {/* Removed inline modal in favor of dedicated ProductDetail route */}
    </>
  );
};

export default ProductCard;
