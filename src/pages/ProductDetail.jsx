import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getProductById, searchProducts } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    addReview, 
    getProductReviews 
  } = useApp();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    name: '',
    rating: 5,
    title: '',
    comment: ''
  });

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0] || '');
      // Get related products
      const related = searchProducts('', { 
        category: foundProduct.category,
        gender: foundProduct.gender 
      }).filter(p => p.id !== foundProduct.id).slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  const reviews = product ? getProductReviews(product.id) : [];
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        selectedSize,
        quantity
      });
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewData.name.trim() && reviewData.comment.trim()) {
      addReview(product.id, reviewData);
      setReviewData({ name: '', rating: 5, title: '', comment: '' });
      setShowReviewForm(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Product not found</h2>
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
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link to="/collections" className="text-muted-foreground hover:text-primary">Collections</Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link to={`/collections/${product.gender}/${product.category}`} className="text-muted-foreground hover:text-primary">
            {product.category}
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-primary font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl shadow-luxury">
              <img
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover cursor-zoom-in hover:scale-105 transition-transform duration-500"
              />
              {product.originalPrice > product.price && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-gold' : 'text-gray-light'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-muted-foreground">
                    ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              </div>
              
              <div className="flex items-baseline space-x-4 mb-6">
                <span className="text-3xl lg:text-4xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Fabric:</span>
                <span className="ml-2 font-medium capitalize">{product.fabric}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Color:</span>
                <span className="ml-2 font-medium capitalize">{product.color}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Occasion:</span>
                <span className="ml-2 font-medium capitalize">{product.occasion}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Stock:</span>
                <span className="ml-2 font-medium text-emerald">In Stock</span>
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="btn-luxury flex-1"
              >
                Add to Cart
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`btn-outline-luxury flex items-center justify-center space-x-2 ${
                  isInWishlist(product.id) ? 'bg-primary text-primary-foreground border-primary' : ''
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Product Description */}
            <div className="border-t border-border pt-6">
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {product.description}
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Care Instructions:</h4>
                <p className="text-muted-foreground">{product.care}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gradient">
              Customer Reviews ({reviews.length})
            </h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn-outline-luxury"
            >
              Write Review
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="card-luxury p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={reviewData.name}
                    onChange={(e) => setReviewData({...reviewData, name: e.target.value})}
                    className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Review Title"
                    value={reviewData.title}
                    onChange={(e) => setReviewData({...reviewData, title: e.target.value})}
                    className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setReviewData({...reviewData, rating})}
                        className={`text-2xl ${
                          rating <= reviewData.rating ? 'text-gold' : 'text-gray-light'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                
                <textarea
                  placeholder="Write your review..."
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                ></textarea>
                
                <div className="flex space-x-4">
                  <button type="submit" className="btn-luxury">
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="btn-outline-luxury"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="card-luxury p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{review.name}</h4>
                      {review.title && <p className="text-muted-foreground">{review.title}</p>}
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${i < review.rating ? 'text-gold' : 'text-gray-light'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gradient mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="card-product group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">
                        ₹{relatedProduct.price.toLocaleString()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(relatedProduct);
                        }}
                        className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-full hover:bg-primary-dark transition-colors"
                      >
                        Quick Add
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;