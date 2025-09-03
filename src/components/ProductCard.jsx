import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="card-product group">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {product.originalPrice > product.price && (
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
            {product.featured && (
              <span className="bg-gold text-foreground px-3 py-1 rounded-full text-sm font-semibold">
                FEATURED
              </span>
            )}
            {product.trending && (
              <span className="bg-emerald text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                TRENDING
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all transform hover:scale-110 ${
              isInWishlist(product.id)
                ? 'bg-primary text-primary-foreground shadow-glow'
                : 'bg-card/80 backdrop-blur text-foreground hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Quick Add Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full btn-luxury text-center"
            >
              Quick Add to Cart
            </button>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
          <span className="capitalize">{product.fabric}</span>
          <span>•</span>
          <span className="capitalize">{product.occasion}</span>
          <span>•</span>
          <span className="capitalize">{product.color}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {product.inStock ? (
            <span className="text-sm font-medium text-emerald bg-emerald/10 px-2 py-1 rounded">
              In Stock
            </span>
          ) : (
            <span className="text-sm font-medium text-destructive bg-destructive/10 px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;