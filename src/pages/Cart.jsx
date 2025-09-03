import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    getCartTotal, 
    getCartItemsCount,
    addOrder 
  } = useApp();
  
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const navigate = useNavigate();

  const shippingFee = getCartTotal() >= 2000 ? 0 : 99;
  const tax = Math.round(getCartTotal() * 0.18); // 18% GST
  const totalAmount = getCartTotal() - discount + shippingFee + tax;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handleApplyPromo = () => {
    const validCodes = {
      'WELCOME10': 0.1,
      'FESTIVE20': 0.2,
      'WEDDING25': 0.25
    };

    if (validCodes[promoCode.toUpperCase()]) {
      const discountAmount = Math.round(getCartTotal() * validCodes[promoCode.toUpperCase()]);
      setDiscount(discountAmount);
    } else {
      setDiscount(0);
      alert('Invalid promo code');
    }
  };

  const handleCheckout = async () => {
    setIsProcessingCheckout(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create order
    const order = {
      id: Date.now(),
      items: cart,
      total: totalAmount,
      status: 'Processing',
      date: new Date().toISOString(),
      address: 'Sample Address', // In real app, get from form
      paymentMethod: 'Credit Card'
    };
    
    addOrder(order);
    clearCart();
    setIsProcessingCheckout(false);
    
    // Navigate to success page
    navigate('/order-success', { state: { orderId: order.id } });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-64 h-64 mx-auto mb-8 bg-gradient-subtle rounded-full flex items-center justify-center">
            <svg className="w-24 h-24 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gradient mb-4">Your Cart is Empty</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/collections" className="btn-luxury">
            Start Shopping
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
            Shopping Cart ({getCartItemsCount()} items)
          </h1>
          <button
            onClick={clearCart}
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive px-4 py-2 rounded-lg transition-all"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="card-luxury p-6">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  {/* Product Image */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="capitalize">Fabric: {item.fabric}</span>
                      <span className="capitalize">Color: {item.color}</span>
                      {item.selectedSize && (
                        <span>Size: {item.selectedSize}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xl font-bold text-primary">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-muted-foreground line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between md:justify-end space-x-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                  <span className="text-muted-foreground">Item Total:</span>
                  <span className="text-xl font-bold text-primary">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <div className="card-luxury p-6">
              <h3 className="text-lg font-semibold mb-4">Promo Code</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleApplyPromo}
                  className="btn-outline-luxury px-4 py-2"
                >
                  Apply
                </button>
              </div>
              {discount > 0 && (
                <div className="mt-2 text-emerald font-medium">
                  Discount applied: -₹{discount.toLocaleString()}
                </div>
              )}
              <div className="mt-3 text-sm text-muted-foreground">
                <p>Try: WELCOME10, FESTIVE20, WEDDING25</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="card-luxury p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({getCartItemsCount()} items)</span>
                  <span>₹{getCartTotal().toLocaleString()}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-emerald">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax (GST 18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {getCartTotal() < 2000 && (
                <div className="mt-4 p-3 bg-gold/10 border border-gold/20 rounded-lg">
                  <p className="text-sm text-foreground">
                    Add ₹{(2000 - getCartTotal()).toLocaleString()} more for FREE shipping!
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={isProcessingCheckout}
                className="w-full btn-luxury mt-6 disabled:opacity-50"
              >
                {isProcessingCheckout ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>

              <div className="mt-4 text-center">
                <Link
                  to="/collections"
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;