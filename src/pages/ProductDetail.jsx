import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllShoes } from '../store/productSlice';
import { addToCart, removeFromCart } from '../store/cartSlice';
import SmartImage from '../components/SmartImage';

const ProductDetail = () => {
  const { id } = useParams();
  const products = useSelector(selectAllShoes);
  const product = products.find((p) => p.id === id);
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);
  const isInCart = cartItems.some((i) => i.id === product?.id);

  const suggestions = useMemo(() => {
    if (!product) return [];
    // Prefer same brand; if not enough, fill from same gender
    const sameBrand = products.filter((p) => p.brand === product.brand && p.id !== product.id);
    let list = sameBrand.slice(0, 6);
    if (list.length < 6) {
      const sameGender = products.filter((p) => p.gender === product.gender && p.id !== product.id);
      const toAdd = sameGender.filter((p) => !list.some((x) => x.id === p.id)).slice(0, 6 - list.length);
      list = list.concat(toAdd);
    }
    return list;
  }, [product, products]);

  if (!product) return <div className="p-6">Product not found.</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:underline">← Back to Shoes World</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gallery */}
          <div className="rounded-2xl p-4 bg-white">
            <SmartImage
              src={product.images?.[0]}
              alt={product.title}
              className="h-96 rounded-xl"
              fit="contain"
              bgClass="bg-white"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl font-extrabold">{product.title}</h1>
            <div className="mt-2 text-gray-500">{product.brand} • {product.gender.toUpperCase()}</div>
            <div className="mt-4 flex items-end gap-3">
              {product.offers?.length ? (
                <>
                  <span className="text-3xl font-extrabold text-yellow-600">${(product.price * (1 - product.offers[0].value / 100)).toFixed(2)}</span>
                  <span className="text-lg line-through text-gray-400">${product.price.toFixed(2)}</span>
                  <span className="text-sm bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full font-semibold">
                    {product.offers[0].label}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-extrabold text-yellow-600">${product.price.toFixed(2)}</span>
              )}
            </div>

            <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>

            <ul className="mt-6 text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>Category: {product.category}</li>
              <li>Brand Line: {product.line || '—'}</li>
              <li>Rating: {product.rating?.rate ?? 4.0} ⭐ ({product.rating?.count ?? 0} reviews)</li>
              <li>Shipping: Fast & Free</li>
              <li>Returns: 30-day hassle-free</li>
              {product.offers?.length && (
                <li className="text-yellow-600 font-medium">Active Offer: {product.offers[0].label}</li>
              )}
            </ul>

            <div className="mt-8 flex gap-3 flex-wrap">
              <button
                onClick={() => (isInCart ? dispatch(removeFromCart(product.id)) : dispatch(addToCart(product)))}
                className={`px-5 py-3 rounded-xl shadow ${
                  isInCart
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={() => {
                  if (!isInCart) dispatch(addToCart(product));
                  alert('Proceeding to checkout... (demo)');
                }}
                className="px-5 py-3 rounded-xl shadow bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Buy Now
              </button>
              <a
                href="/"
                className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {suggestions.map((s) => (
                <a
                  key={s.id}
                  href={`/product/${s.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden"
                >
                  <img src={s.images[0]} alt={s.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="font-semibold line-clamp-1">{s.title}</div>
                    <div className="text-sm text-gray-500">{s.brand}</div>
                    <div className="mt-1 font-bold">${s.price.toFixed(2)}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
