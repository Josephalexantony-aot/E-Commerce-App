import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';
import { Search, Filter, X } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const { products, isLoading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortOption, setSortOption] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const location = useLocation();
  
  // Get category from URL query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  // Apply filters and search
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply price range filter
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    if (sortOption) {
      switch (sortOption) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'rating-desc':
          result.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, priceRange, searchQuery, sortOption]);

  // Available categories for filter
  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'home', name: 'Home & Kitchen' }
  ];

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 2000]);
    setSearchQuery('');
    setSortOption('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">All Products</h1>
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700"
        >
          <Filter size={18} className="mr-2" />
          Filters
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className={`
          md:w-1/4 lg:w-1/5 
          md:block
          ${isFilterOpen ? 'block' : 'hidden'}
          bg-white p-4 rounded-lg shadow-sm sticky top-20 self-start
          max-h-[calc(100vh-100px)] overflow-y-auto
        `}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button 
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Reset All
            </button>
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="md:hidden text-gray-500"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.id}
                    onChange={() => setSelectedCategory(category.id)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{category.name}</span>
                </label>
              ))}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === ''}
                  onChange={() => setSelectedCategory('')}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">All Categories</span>
              </label>
            </div>
          </div>
          
          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Price Range</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
          
          {/* Sort Options */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Sort By</h3>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="rating-desc">Best Rated</option>
            </select>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:w-3/4 lg:w-4/5">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
          
          {/* Applied Filters */}
          {(selectedCategory || searchQuery || sortOption || priceRange[0] > 0 || priceRange[1] < 2000) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategory && (
                <div className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  Category: {categories.find(c => c.id === selectedCategory)?.name}
                  <button 
                    onClick={() => setSelectedCategory('')}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                <div className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  Price: ${priceRange[0]} - ${priceRange[1]}
                  <button 
                    onClick={() => setPriceRange([0, 2000])}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {searchQuery && (
                <div className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  Search: "{searchQuery}"
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {sortOption && (
                <div className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  Sort: {
                    sortOption === 'price-asc' ? 'Price: Low to High' :
                    sortOption === 'price-desc' ? 'Price: High to Low' :
                    sortOption === 'name-asc' ? 'Name: A to Z' :
                    sortOption === 'name-desc' ? 'Name: Z to A' :
                    sortOption === 'rating-desc' ? 'Best Rated' : ''
                  }
                  <button 
                    onClick={() => setSortOption('')}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              <button 
                onClick={resetFilters}
                className="text-blue-600 hover:text-blue-700 text-sm ml-2"
              >
                Clear All
              </button>
            </div>
          )}
          
          {/* Product Count */}
          <p className="mb-6 text-gray-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
          
          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div 
                  key={index} 
                  className="bg-gray-100 rounded-lg animate-pulse h-80"
                ></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter parameters
              </p>
              <button 
                onClick={resetFilters}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;