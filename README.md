# Shoes World (E-Shop)

A modern, responsive shoes-only storefront built with React, Redux Toolkit, React Router, and Tailwind CSS.

## Features

- Shoes-only catalog with Men, Women, and Kids sections
- Search across brand, title, and description
- Filter by brand (multi-select) and price range
- Sort by price (Low to High / High to Low)
- Product Detail page in a new tab with full description and suggestions
- Add/Remove from Cart with a quick cart dropdown
<!-- Theme toggle removed -->
- Sticky, responsive header and smooth section navigation

## Getting started

1. Install dependencies
2. Start the dev server

```
npm install
npm run dev
```

## Notes

- Product data is locally seeded in `src/store/productSlice.js` for reliability and speed.
- Detail pages open in a new tab by design (as requested). Suggestions on the detail page also open in a new tab.
- Filters are memoized via selectors for performance and scalability.
- Deployment (Vercel): Added `vercel.json` rewrite so deep links like `/product/air-jordan` resolve to the SPA entry instead of 404.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
