import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';
import { hydrateCart } from './store/cartSlice';

export const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

// Cross-tab sync using storage events
window.addEventListener('storage', (e) => {
  if (e.key === 'eshop_state' && e.newValue) {
    try {
      const parsed = JSON.parse(e.newValue);
      if (parsed.cart?.items) {
        store.dispatch(hydrateCart(parsed.cart.items));
      }
    } catch {
      // ignore parse errors
    }
  }
});
