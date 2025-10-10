import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import ProductCard from './components/ProductCard';

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const selectedCategory = useSelector((state) => state.category.selectedCategory);

  const [products, setProducts] = useState({
    electronics: [],
    jewelery: [],
    menclothing: [],
    womenclothing: [],
  });

  const electronicsRef = useRef(null);
  const jeweleryRef = useRef(null);
  const menRef = useRef(null);
  const womenRef = useRef(null);

  // Apply dark mode globally
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // Fetch products by category
  useEffect(() => {
    const fetchProducts = async () => {
      const urls = {
        electronics: 'https://fakestoreapi.com/products/category/electronics',
        jewelery: 'https://fakestoreapi.com/products/category/jewelery',
        menclothing: "https://fakestoreapi.com/products/category/men's clothing",
        womenclothing: "https://fakestoreapi.com/products/category/women's clothing",
      };

      const [electronics, jewelery, men, women] = await Promise.all([
        fetch(urls.electronics).then((res) => res.json()),
        fetch(urls.jewelery).then((res) => res.json()),
        fetch(urls.menclothing).then((res) => res.json()),
        fetch(urls.womenclothing).then((res) => res.json()),
      ]);

      setProducts({
        electronics,
        jewelery,
        menclothing: men,
        womenclothing: women,
      });
    };

    fetchProducts();
  }, []);

  // Smooth scroll to category when selected
  useEffect(() => {
    const sectionRefs = {
      electronics: electronicsRef,
      jewelery: jeweleryRef,
      clothes: menRef, // assuming "Clothes" covers men's
      topitems: womenRef,
    };

    const targetRef = sectionRefs[selectedCategory];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      <main className="p-6 space-y-16">
        {/* Electronics */}
        <section ref={electronicsRef} id="electronics">
          <h2 className="text-3xl font-bold mb-6">Electronics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.electronics.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Jewelery */}
        <section ref={jeweleryRef} id="jewelery">
          <h2 className="text-3xl font-bold mb-6">Jewelery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.jewelery.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Men's Clothing */}
        <section ref={menRef} id="men">
          <h2 className="text-3xl font-bold mb-6">Men’s Clothing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.menclothing.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Women's Clothing */}
        <section ref={womenRef} id="women">
          <h2 className="text-3xl font-bold mb-6">Women’s Clothing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.womenclothing.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
