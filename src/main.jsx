import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';

// ThemeWrapper ensures <html> has 'dark' class
const ThemeWrapper = ({ children }) => {
  const darkMode = useSelector(state => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return children;
};

const Root = () => (
  <Provider store={store}>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
