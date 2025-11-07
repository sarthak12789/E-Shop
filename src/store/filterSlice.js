import { createSlice, createSelector } from '@reduxjs/toolkit';
import { selectAllShoes } from './productSlice';

const initialState = {
  query: '',
  selectedBrands: [], // empty = all
  priceMin: 0,
  priceMax: 1000,
  sortBy: 'price-asc', // 'price-asc' | 'price-desc'
  gender: 'all', // 'all' | 'men' | 'women' | 'kids'
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    toggleBrand(state, action) {
      const brand = action.payload;
      if (state.selectedBrands.includes(brand)) {
        state.selectedBrands = state.selectedBrands.filter((b) => b !== brand);
      } else {
        state.selectedBrands.push(brand);
      }
    },
    clearBrands(state) {
      state.selectedBrands = [];
    },
    setPriceMin(state, action) {
      state.priceMin = action.payload;
    },
    setPriceMax(state, action) {
      state.priceMax = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
    resetFilters(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setQuery,
  toggleBrand,
  clearBrands,
  setPriceMin,
  setPriceMax,
  setSortBy,
  setGender,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;

// Derived selector: apply filtering and sorting
export const selectFilteredShoes = createSelector(
  [selectAllShoes, (state) => state.filters],
  (items, filters) => {
    const q = filters.query.trim().toLowerCase();
    let result = items.filter((p) => {
      const matchesGender =
        filters.gender === 'all' ? true : p.gender === filters.gender;
      const matchesBrand =
        filters.selectedBrands.length === 0 ||
        filters.selectedBrands.includes(p.brand);
      const matchesPrice = p.price >= filters.priceMin && p.price <= filters.priceMax;
      const matchesQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesGender && matchesBrand && matchesPrice && matchesQuery;
    });

    result.sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

    return result;
  }
);
