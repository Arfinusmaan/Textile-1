import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  cart: [],
  wishlist: [],
  reviews: {},
  orders: [],
  user: null,
  searchQuery: '',
  filters: {
    category: 'all',
    fabric: 'all',
    priceRange: [0, 10000],
    color: 'all',
    occasion: 'all'
  }
};

// Actions
const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_QUANTITY: 'UPDATE_CART_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',
  ADD_REVIEW: 'ADD_REVIEW',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_FILTERS: 'SET_FILTERS',
  ADD_ORDER: 'ADD_ORDER',
  SET_USER: 'SET_USER'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };

    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case ACTIONS.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };

    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: []
      };

    case ACTIONS.ADD_TO_WISHLIST:
      if (state.wishlist.find(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };

    case ACTIONS.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };

    case ACTIONS.ADD_REVIEW:
      const { productId, review } = action.payload;
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [productId]: [...(state.reviews[productId] || []), review]
        }
      };

    case ACTIONS.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };

    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };

    case ACTIONS.ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };

    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};

// Context
const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('ethnicShopState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      Object.keys(parsedState).forEach(key => {
        if (key === 'cart') {
          parsedState[key].forEach(item => {
            dispatch({ type: ACTIONS.ADD_TO_CART, payload: item });
          });
        } else if (key === 'wishlist') {
          parsedState[key].forEach(item => {
            dispatch({ type: ACTIONS.ADD_TO_WISHLIST, payload: item });
          });
        } else if (key === 'reviews') {
          Object.keys(parsedState[key]).forEach(productId => {
            parsedState[key][productId].forEach(review => {
              dispatch({ type: ACTIONS.ADD_REVIEW, payload: { productId, review } });
            });
          });
        }
      });
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ethnicShopState', JSON.stringify({
      cart: state.cart,
      wishlist: state.wishlist,
      reviews: state.reviews,
      orders: state.orders
    }));
  }, [state.cart, state.wishlist, state.reviews, state.orders]);

  const value = {
    ...state,
    dispatch,
    ACTIONS,
    // Helper functions
    addToCart: (product) => dispatch({ type: ACTIONS.ADD_TO_CART, payload: product }),
    removeFromCart: (productId) => dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId }),
    updateCartQuantity: (productId, quantity) => dispatch({ 
      type: ACTIONS.UPDATE_CART_QUANTITY, 
      payload: { id: productId, quantity } 
    }),
    clearCart: () => dispatch({ type: ACTIONS.CLEAR_CART }),
    addToWishlist: (product) => dispatch({ type: ACTIONS.ADD_TO_WISHLIST, payload: product }),
    removeFromWishlist: (productId) => dispatch({ type: ACTIONS.REMOVE_FROM_WISHLIST, payload: productId }),
    addReview: (productId, review) => dispatch({ 
      type: ACTIONS.ADD_REVIEW, 
      payload: { productId, review: { ...review, id: Date.now(), date: new Date().toISOString() } } 
    }),
    setSearchQuery: (query) => dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query }),
    setFilters: (filters) => dispatch({ type: ACTIONS.SET_FILTERS, payload: filters }),
    addOrder: (order) => dispatch({ type: ACTIONS.ADD_ORDER, payload: order }),
    getCartTotal: () => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    getCartItemsCount: () => state.cart.reduce((total, item) => total + item.quantity, 0),
    isInWishlist: (productId) => state.wishlist.some(item => item.id === productId),
    getProductReviews: (productId) => state.reviews[productId] || []
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};