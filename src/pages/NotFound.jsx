import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-800 p-6">
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-extrabold">404</h1>
        <p className="mt-2 text-gray-600">We couldn't find that page.</p>
        <Link to="/" className="inline-block mt-6 px-5 py-3 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
