import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../store/categorySlice";
import { setGender } from "../store/filterSlice";
import Cart from "./Cart";

const Header = () => {
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleCategoryClick = (cat) => {
    const lowerCat = cat.toLowerCase();
    const key = lowerCat.replace(" ", "");
    dispatch(setCategory(key));
    dispatch(setGender(key));
    setMenuOpen(false);

    const section = document.getElementById(key);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-lg transition-colors duration-500">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <div
  className="text-2xl font-serif text-yellow-500 cursor-pointer select-none hover:scale-105 transition-transform"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
>
  � Shoes World
</div>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700 dark:text-gray-200">
          {["All", "Men", "Women", "Kids"].map((cat) => {
            const key = cat.toLowerCase();
            const isActive = selectedCategory === key;
            return (
              <li
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`cursor-pointer relative group transition-all hover:text-yellow-500 ${
                  isActive ? "text-yellow-500 font-bold" : ""
                }`}
              >
                {cat}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-500 rounded-full animate-pulse"></span>
                )}
              </li>
            );
          })}
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative bg-yellow-400 text-white px-3 py-1 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
          >
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-1.5 py-0.5 rounded-full animate-pulse">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-3xl font-bold focus:outline-none hover:text-yellow-500 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="flex flex-col bg-gray-100 dark:bg-gray-800 md:hidden px-6 py-4 space-y-3 text-gray-700 dark:text-gray-200 font-medium transition-colors duration-500 rounded-b-lg shadow-lg">
          {["All", "Men", "Women", "Kids"].map((cat) => {
            const key = cat.toLowerCase();
            const isActive = selectedCategory === key;
            return (
              <li
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`cursor-pointer hover:text-yellow-500 transition-colors ${
                  isActive ? "text-yellow-500 font-bold" : ""
                }`}
              >
                {cat}
              </li>
            );
          })}
        </ul>
      )}

      {/* Cart Dropdown */}
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </header>
  );
};

export default Header;
