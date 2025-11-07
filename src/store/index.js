import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import cartReducer from './cartSlice';
import productsReducer from './productSlice';
import filtersReducer from './filterSlice';

const loadState = () => {
  try {
    const serialized = localStorage.getItem('eshop_state');
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serialized = JSON.stringify({
      cart: { items: state.cart.items },
    });
    localStorage.setItem('eshop_state', serialized);
  } catch {
    // ignore write errors
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
    products: productsReducer,
    filters: filtersReducer,
  },
  preloadedState,
});

store.subscribe(() => saveState(store.getState()));
