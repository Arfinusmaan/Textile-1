import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist, clearWishlist } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-64 h-64 mx-auto mb-8 bg-gradient-subtle rounded-full flex items-center justify-center">
            <svg className="w-24 h-24 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gradient mb-4">Your Wishlist is Empty</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Save your favorite ethnic wear pieces to your wishlist for easy access later.
          </p>
          <Link to="/collections" className="btn-luxury">
            Browse Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gradient">
            My Wishlist ({wishlist.length} items)
          </h1>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
                clearWishlist();
              }
            }}
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive px-4 py-2 rounded-lg transition-all"
          >
            Clear Wishlist
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/collections" className="btn-outline-luxury">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;