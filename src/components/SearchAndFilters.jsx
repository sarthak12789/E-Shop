import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setQuery,
  toggleBrand,
  clearBrands,
  setPriceMin,
  setPriceMax,
  setSortBy,
} from '../store/filterSlice';
import { selectBrands } from '../store/productSlice';

const SearchAndFilters = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const { query, selectedBrands, priceMin, priceMax, sortBy } = useSelector(
    (s) => s.filters
  );

  const maxPriceFromData = useSelector((s) =>
    Math.ceil(Math.max(...s.products.items.map((p) => p.price), 0))
  );

  const minPriceFromData = useSelector((s) =>
    Math.floor(Math.min(...s.products.items.map((p) => p.price), 0))
  );

  const cappedMax = useMemo(() => Math.max(priceMax, minPriceFromData), [priceMax, minPriceFromData]);

  return (
    <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-2xl p-4 md:p-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Search shoes</label>
          <input
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            placeholder="Search by brand or description..."
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium mb-1">Sort</label>
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Price range (${minPriceFromData} - ${maxPriceFromData})</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={minPriceFromData}
              max={maxPriceFromData}
              value={priceMin}
              onChange={(e) => dispatch(setPriceMin(Number(e.target.value) || 0))}
              className="w-24 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              min={minPriceFromData}
              max={maxPriceFromData}
              value={cappedMax}
              onChange={(e) => dispatch(setPriceMax(Number(e.target.value) || maxPriceFromData))}
              className="w-24 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
            <div className="hidden md:flex items-center gap-2 flex-1">
              <input
                type="range"
                min={minPriceFromData}
                max={maxPriceFromData}
                value={priceMin}
                onChange={(e) => dispatch(setPriceMin(Number(e.target.value)))}
                className="w-full"
              />
              <input
                type="range"
                min={minPriceFromData}
                max={maxPriceFromData}
                value={cappedMax}
                onChange={(e) => dispatch(setPriceMax(Number(e.target.value)))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="mt-4 border-t border-gray-200 dark:border-gray-800 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Brands</span>
          <button
            onClick={() => dispatch(clearBrands())}
            className="text-xs text-blue-600 hover:underline"
          >
            Clear
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => {
            const active = selectedBrands.includes(brand);
            return (
              <button
                key={brand}
                onClick={() => dispatch(toggleBrand(brand))}
                className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                  active
                    ? 'bg-yellow-400/20 text-yellow-700 border-yellow-400'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
