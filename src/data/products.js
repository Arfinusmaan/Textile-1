// Sample product data for the ethnic dress shop

export const categories = {
  women: {
    name: 'Women',
    subcategories: ['sarees', 'lehengas', 'churidars', 'salwars']
  },
  men: {
    name: 'Men', 
    subcategories: ['kurtas', 'sherwanis', 'dhotis', 'nehru-jackets']
  }
};

export const products = [
  // Women's Sarees
  {
    id: 1,
    name: 'Royal Burgundy Silk Saree',
    category: 'sarees',
    gender: 'women',
    price: 3499,
    originalPrice: 4999,
    fabric: 'silk',
    color: 'burgundy',
    occasion: 'wedding',
    image: '/saree-collection.jpg',
    images: ['/saree-collection.jpg'],
    description: 'Exquisite handwoven silk saree with intricate golden border work. Perfect for weddings and special occasions.',
    care: 'Dry clean only. Store in cool, dry place.',
    sizes: ['Free Size'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 2,
    name: 'Emerald Green Cotton Saree',
    category: 'sarees',
    gender: 'women',
    price: 1299,
    originalPrice: 1899,
    fabric: 'cotton',
    color: 'green',
    occasion: 'casual',
    image: '/saree-collection.jpg',
    images: ['/saree-collection.jpg'],
    description: 'Comfortable cotton saree with beautiful block prints. Ideal for daily wear.',
    care: 'Machine wash cold. Iron on medium heat.',
    sizes: ['Free Size'],
    inStock: true,
    featured: false,
    trending: true
  },
  
  // Women's Lehengas
  {
    id: 3,
    name: 'Golden Bridal Lehenga',
    category: 'lehengas',
    gender: 'women',
    price: 8999,
    originalPrice: 12999,
    fabric: 'silk',
    color: 'gold',
    occasion: 'wedding',
    image: '/lehenga-collection.jpg',
    images: ['/lehenga-collection.jpg'],
    description: 'Stunning bridal lehenga with heavy embroidery and mirror work. Comes with matching dupatta.',
    care: 'Dry clean only. Handle with care.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
    trending: false
  },
  {
    id: 4,
    name: 'Pink Party Lehenga',
    category: 'lehengas',
    gender: 'women',
    price: 4999,
    originalPrice: 7499,
    fabric: 'georgette',
    color: 'pink',
    occasion: 'party',
    image: '/lehenga-collection.jpg',
    images: ['/lehenga-collection.jpg'],
    description: 'Elegant party wear lehenga with sequin work. Perfect for celebrations.',
    care: 'Dry clean recommended.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: false,
    trending: true
  },

  // Women's Churidars
  {
    id: 5,
    name: 'Burgundy Velvet Churidar Set',
    category: 'churidars',
    gender: 'women',
    price: 2799,
    originalPrice: 3999,
    fabric: 'velvet',
    color: 'burgundy',
    occasion: 'festive',
    image: '/saree-collection.jpg',
    images: ['/saree-collection.jpg'],
    description: 'Rich velvet churidar with intricate thread work. Includes dupatta.',
    care: 'Dry clean only.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
    trending: false
  },

  // Men's Kurtas
  {
    id: 6,
    name: 'Classic White Kurta',
    category: 'kurtas',
    gender: 'men',
    price: 1599,
    originalPrice: 2299,
    fabric: 'cotton',
    color: 'white',
    occasion: 'casual',
    image: '/mens-collection.jpg',
    images: ['/mens-collection.jpg'],
    description: 'Traditional white cotton kurta with subtle embroidery. Comfortable and versatile.',
    care: 'Machine wash cold. Iron on medium heat.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: false,
    trending: true
  },
  {
    id: 7,
    name: 'Royal Blue Silk Kurta',
    category: 'kurtas',
    gender: 'men',
    price: 2999,
    originalPrice: 4299,
    fabric: 'silk',
    color: 'blue',
    occasion: 'festive',
    image: '/mens-collection.jpg',
    images: ['/mens-collection.jpg'],
    description: 'Luxurious silk kurta in royal blue. Perfect for festivals and celebrations.',
    care: 'Dry clean only.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: true,
    trending: false
  },

  // Men's Sherwanis
  {
    id: 8,
    name: 'Burgundy Wedding Sherwani',
    category: 'sherwanis',
    gender: 'men',
    price: 12999,
    originalPrice: 18999,
    fabric: 'silk',
    color: 'burgundy',
    occasion: 'wedding',
    image: '/mens-collection.jpg',
    images: ['/mens-collection.jpg'],
    description: 'Elegant wedding sherwani with gold embroidery. Includes matching churidar.',
    care: 'Dry clean only. Professional handling recommended.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: true,
    trending: true
  }
];

export const fabrics = ['all', 'silk', 'cotton', 'georgette', 'velvet', 'chiffon'];
export const colors = ['all', 'burgundy', 'gold', 'green', 'blue', 'pink', 'white', 'black'];
export const occasions = ['all', 'wedding', 'festive', 'party', 'casual', 'formal'];
export const priceRanges = [
  { label: 'Under ₹2,000', min: 0, max: 2000 },
  { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
  { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { label: 'Above ₹10,000', min: 10000, max: 100000 }
];

// Helper functions
export const getProductsByCategory = (category, gender = null) => {
  return products.filter(product => {
    if (gender) {
      return product.category === category && product.gender === gender;
    }
    return product.category === category;
  });
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getTrendingProducts = () => {
  return products.filter(product => product.trending);
};

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const searchProducts = (query, filters = {}) => {
  let filtered = products;

  // Text search
  if (query) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.fabric.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Apply filters
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => product.category === filters.category);
  }

  if (filters.fabric && filters.fabric !== 'all') {
    filtered = filtered.filter(product => product.fabric === filters.fabric);
  }

  if (filters.color && filters.color !== 'all') {
    filtered = filtered.filter(product => product.color === filters.color);
  }

  if (filters.occasion && filters.occasion !== 'all') {
    filtered = filtered.filter(product => product.occasion === filters.occasion);
  }

  if (filters.gender) {
    filtered = filtered.filter(product => product.gender === filters.gender);
  }

  if (filters.priceRange) {
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
  }

  return filtered;
};