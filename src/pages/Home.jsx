import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import SearchAndFilters from '../components/SearchAndFilters';
import ProductCard from '../components/ProductCard';
import { selectFilteredShoes, setGender } from '../store/filterSlice';

const Section = ({ id, title, items }) => {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">No products match the filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((s) => s.category.selectedCategory);
  const filtered = useSelector(selectFilteredShoes);

  const menRef = useRef(null);
  const womenRef = useRef(null);
  const kidsRef = useRef(null);

  useEffect(() => {
    // keep filter gender in sync with header selectedCategory when a single gender is selected
    if (['men', 'women', 'kids', 'all'].includes(selectedCategory)) {
      dispatch(setGender(selectedCategory));
    }
    const refs = { men: menRef, women: womenRef, kids: kidsRef };
    const ref = refs[selectedCategory];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedCategory, dispatch]);

  const men = filtered.filter((p) => p.gender === 'men');
  const women = filtered.filter((p) => p.gender === 'women');
  const kids = filtered.filter((p) => p.gender === 'kids');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Shoes World</h1>
            <p className="text-gray-500 mt-1">Discover the latest sneakers for Men, Women, and Kids</p>
          </div>
        </div>

        <SearchAndFilters />

        <div ref={menRef}><Section id="men" title="Men" items={men} /></div>
        <div ref={womenRef}><Section id="women" title="Women" items={women} /></div>
        <div ref={kidsRef}><Section id="kids" title="Kids" items={kids} /></div>
      </main>
    </div>
  );
};

export default Home;
