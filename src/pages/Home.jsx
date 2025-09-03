import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';
import { getFeaturedProducts, getTrendingProducts, categories } from '../data/products';
import heroImage from '../assets/hero-ethnic-wear.jpg';
import sareeImage from '../assets/saree-collection.jpg';
import lehengaImage from '../assets/lehenga-collection.jpg';
import mensImage from '../assets/mens-collection.jpg';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const categoriesRef = useRef(null);
  const { addToCart, addToWishlist, isInWishlist } = useApp();

  const featuredProducts = getFeaturedProducts();
  const trendingProducts = getTrendingProducts();

  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline();
    tl.from('.hero-title', { opacity: 0, y: 100, duration: 1.2, ease: 'power3.out' })
      .from('.hero-subtitle', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' }, '-=0.8')
      .from('.hero-buttons', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('.hero-image', { opacity: 0, scale: 1.1, duration: 1.5, ease: 'power3.out' }, '-=1.2');

    // Featured products animation
    gsap.fromTo('.featured-card', 
      { opacity: 0, y: 60, rotationY: 15 },
      { 
        opacity: 1, 
        y: 0, 
        rotationY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Categories animation
    gsap.fromTo('.category-card',
      { opacity: 0, scale: 0.8, rotation: 5 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const categoryData = [
    {
      id: 'sarees',
      name: 'Elegant Sarees',
      description: 'Traditional silk & cotton sarees',
      image: sareeImage,
      link: '/collections/women/sarees',
      gradient: 'from-primary to-emerald'
    },
    {
      id: 'lehengas',
      name: 'Bridal Lehengas', 
      description: 'Wedding & party wear',
      image: lehengaImage,
      link: '/collections/women/lehengas',
      gradient: 'from-gold to-primary-light'
    },
    {
      id: 'kurtas',
      name: 'Men\'s Kurtas',
      description: 'Festive & casual wear',
      image: mensImage,
      link: '/collections/men/kurtas',
      gradient: 'from-emerald to-primary-dark'
    },
    {
      id: 'wedding',
      name: 'Wedding Specials',
      description: 'Complete bridal collections',
      image: lehengaImage,
      link: '/collections/wedding',
      gradient: 'from-primary-dark to-gold-dark'
    }
  ];

  const promoData = [
    {
      title: 'Wedding Season Sale',
      description: 'Up to 50% off on bridal collections',
      bgColor: 'from-primary to-primary-dark',
      textColor: 'text-primary-foreground',
      link: '/collections/wedding'
    },
    {
      title: 'Festive Collection',
      description: 'New arrivals for festivals',
      bgColor: 'from-gold-dark to-gold',
      textColor: 'text-foreground',
      link: '/collections/festive'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Ethnic Fashion Collection"
            className="hero-image w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="hero-title text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              Discover
              <span className="block bg-gradient-luxury bg-clip-text text-transparent">
                Ethnic Elegance
              </span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              From traditional sarees to contemporary kurtas, embrace the beauty of 
              authentic Indian fashion with our curated collection of premium ethnic wear.
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4">
              <Link to="/collections" className="btn-luxury inline-block text-center">
                Explore Collections
              </Link>
              <Link to="/collections/wedding" className="btn-outline-luxury inline-block text-center">
                Wedding Specials
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-20 h-20 bg-gold/20 rounded-full animate-float"></div>
        <div className="absolute bottom-40 left-10 w-16 h-16 bg-emerald/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </section>

      {/* Featured Categories */}
      <section ref={categoriesRef} className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated collections of authentic ethnic wear
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryData.map((category) => (
              <Link
                key={category.id}
                to={category.link}
                className="category-card group"
              >
                <div className="card-luxury p-6 text-center hover:shadow-glow transition-all duration-500">
                  <div className="relative mb-6 overflow-hidden rounded-xl">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60`}></div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <span className="text-primary font-medium group-hover:text-gold transition-colors">
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={featuredRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Featured Collection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked premium pieces for the discerning fashion lover
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="featured-card group">
                <div className="card-product">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => addToWishlist(product)}
                        className={`p-2 rounded-full transition-all ${
                          isInWishlist(product.id) 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-card/80 text-foreground hover:bg-primary hover:text-primary-foreground'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    {product.originalPrice > product.price && (
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm mb-3 capitalize">
                      {product.fabric} • {product.occasion}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-muted-foreground line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-all transform hover:scale-105"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/collections" className="btn-outline-luxury">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Seasonal Promotions */}
      <section className="py-20 bg-gradient-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {promoData.map((promo, index) => (
              <Link
                key={index}
                to={promo.link}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${promo.bgColor} p-8 shadow-luxury hover:shadow-glow transition-all duration-500`}
              >
                <div className="relative z-10">
                  <h3 className={`text-3xl font-bold ${promo.textColor} mb-4`}>
                    {promo.title}
                  </h3>
                  <p className={`text-lg ${promo.textColor}/80 mb-6`}>
                    {promo.description}
                  </p>
                  <span className={`inline-flex items-center ${promo.textColor} font-semibold group-hover:translate-x-2 transition-transform`}>
                    Shop Now
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Trending Now
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay ahead with the latest fashion trends in ethnic wear
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group block"
              >
                <div className="card-product">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-gold text-foreground px-2 py-1 rounded text-xs font-semibold">
                      TRENDING
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-full hover:bg-primary-dark transition-colors"
                      >
                        Quick Add
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;