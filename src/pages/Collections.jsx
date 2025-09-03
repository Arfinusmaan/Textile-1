import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { searchProducts, fabrics, colors, occasions, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const Collections = () => {
  const { gender, category } = useParams();
  const [searchParams] = useSearchParams();
  const { filters, setFilters, searchQuery } = useApp();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Apply URL-based filters
    const urlFilters = {
      ...filters,
      gender: gender || filters.gender,
      category: category || filters.category
    };

    const query = searchParams.get('q') || searchQuery || '';
    const results = searchProducts(query, urlFilters);
    setProducts(results);
    setFilteredProducts(results);
  }, [gender, category, searchParams, filters, searchQuery]);

  useEffect(() => {
    // Apply sorting
    let sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured first
        sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }
    
    setFilteredProducts(sorted);
  }, [sortBy, products]);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    const results = searchProducts(searchQuery, newFilters);
    setProducts(results);
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      fabric: 'all',
      priceRange: [0, 10000],
      color: 'all',
      occasion: 'all',
      gender: gender || 'all'
    });
  };

  const getPageTitle = () => {
    if (gender && category) {
      return `${gender.charAt(0).toUpperCase() + gender.slice(1)}'s ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    }
    if (gender) {
      return `${gender.charAt(0).toUpperCase() + gender.slice(1)}'s Collection`;
    }
    if (category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
    return 'All Collections';
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== 'all' && value !== '' && !Array.isArray(value)
  ).length + (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
              {getPageTitle()}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden btn-outline-luxury flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:text-primary-dark"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Gender Filter */}
                {!gender && (
                  <div>
                    <h4 className="font-medium mb-3">Gender</h4>
                    <div className="space-y-2">
                      {Object.keys(categories).map((genderOption) => (
                        <label key={genderOption} className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value={genderOption}
                            checked={filters.gender === genderOption}
                            onChange={(e) => handleFilterChange('gender', e.target.value)}
                            className="mr-3 text-primary focus:ring-primary"
                          />
                          <span className="capitalize">{genderOption}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Category Filter */}
                {!category && (
                  <div>
                    <h4 className="font-medium mb-3">Category</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value="all"
                          checked={filters.category === 'all'}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="mr-3 text-primary focus:ring-primary"
                        />
                        <span>All Categories</span>
                      </label>
                      {gender && categories[gender] ? 
                        categories[gender].subcategories.map((cat) => (
                          <label key={cat} className="flex items-center">
                            <input
                              type="radio"
                              name="category"
                              value={cat}
                              checked={filters.category === cat}
                              onChange={(e) => handleFilterChange('category', e.target.value)}
                              className="mr-3 text-primary focus:ring-primary"
                            />
                            <span className="capitalize">{cat}</span>
                          </label>
                        )) :
                        ['sarees', 'lehengas', 'churidars', 'kurtas', 'sherwanis'].map((cat) => (
                          <label key={cat} className="flex items-center">
                            <input
                              type="radio"
                              name="category"
                              value={cat}
                              checked={filters.category === cat}
                              onChange={(e) => handleFilterChange('category', e.target.value)}
                              className="mr-3 text-primary focus:ring-primary"
                            />
                            <span className="capitalize">{cat}</span>
                          </label>
                        ))
                      }
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>₹{filters.priceRange[0]}</span>
                      <span>₹{filters.priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      step="500"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-light rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                  </div>
                </div>

                {/* Fabric Filter */}
                <div>
                  <h4 className="font-medium mb-3">Fabric</h4>
                  <select
                    value={filters.fabric}
                    onChange={(e) => handleFilterChange('fabric', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {fabrics.map((fabric) => (
                      <option key={fabric} value={fabric} className="capitalize">
                        {fabric === 'all' ? 'All Fabrics' : fabric}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color Filter */}
                <div>
                  <h4 className="font-medium mb-3">Color</h4>
                  <select
                    value={filters.color}
                    onChange={(e) => handleFilterChange('color', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {colors.map((color) => (
                      <option key={color} value={color} className="capitalize">
                        {color === 'all' ? 'All Colors' : color}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Occasion Filter */}
                <div>
                  <h4 className="font-medium mb-3">Occasion</h4>
                  <select
                    value={filters.occasion}
                    onChange={(e) => handleFilterChange('occasion', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {occasions.map((occasion) => (
                      <option key={occasion} value={occasion} className="capitalize">
                        {occasion === 'all' ? 'All Occasions' : occasion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-64 h-64 mx-auto mb-8 bg-muted rounded-full flex items-center justify-center">
                  <svg className="w-24 h-24 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">No products found</h3>
                <p className="text-muted-foreground mb-8">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-luxury"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;