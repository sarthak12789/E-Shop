import React, { useEffect, useState } from 'react';
import { FALLBACK_SHOE_IMAGE } from '../constants/images';

/**
 * SmartImage
 * Props:
 * - src, alt
 * - className: container classes (height/width, rounding)
 * - imgClassName: extra classes applied to <img>
 * - fit: 'contain' | 'cover' (default: 'contain')
 * - bgClass: container background class (default: 'bg-white')
 */
const SmartImage = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  fit = 'contain',
  bgClass = 'bg-white',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const finalSrc = error ? FALLBACK_SHOE_IMAGE : src || FALLBACK_SHOE_IMAGE;
  const objectFit = fit === 'cover' ? 'object-cover' : 'object-contain';

  // If image takes too long or fails silently, switch to fallback after timeout
  useEffect(() => {
    if (loaded) return;
    const t = setTimeout(() => {
      if (!loaded) {
        setError(true);
        setLoaded(true);
      }
    }, 3000);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <div className={`relative overflow-hidden ${bgClass} ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="w-10 h-10 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full ${objectFit} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-out ${imgClassName}`}
        style={{ background: loaded ? 'transparent' : 'inherit' }}
      />
    </div>
  );
};

export default SmartImage;
