import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';

const WishlistPage: React.FC = () => {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  
  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (err) {
        // If parsing fails, initialize with empty array
        localStorage.setItem('wishlist', JSON.stringify([]));
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  // Add to cart and optionally remove from wishlist
  const handleAddToCart = (product: Product, removeFromWishlist: boolean = false) => {
    addToCart(product, 1);
    
    if (removeFromWishlist) {
      handleRemoveFromWishlist(product.id);
    }
  };
  
  // Remove item from wishlist
  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };
  
  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Heart size={24} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save items you love to your wishlist and revisit them anytime.</p>
          <Link 
            to="/products" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        
        <button
          onClick={clearWishlist}
          className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
        >
          <Trash2 size={16} className="mr-1" />
          Clear Wishlist
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header (Desktop) */}
        <div className="hidden md:grid md:grid-cols-12 px-6 py-4 bg-gray-50 text-gray-600 font-medium">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Stock Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        
        {/* Wishlist Items */}
        <div className="divide-y divide-gray-200">
          {wishlist.map((product) => (
            <div key={product.id} className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Product */}
              <div className="md:col-span-6 flex">
                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <Link 
                    to={`/products/${product.id}`} 
                    className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                  >
                    {product.name}
                  </Link>
                  <p className="text-gray-500 text-sm mt-1">Category: {product.category}</p>
                </div>
              </div>
              
              {/* Price */}
              <div className="md:col-span-2 flex justify-between md:justify-center">
                <span className="md:hidden text-gray-600">Price:</span>
                <span className="text-gray-900 font-medium">${product.price.toFixed(2)}</span>
              </div>
              
              {/* Stock Status */}
              <div className="md:col-span-2 flex justify-between md:justify-center">
                <span className="md:hidden text-gray-600">Status:</span>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  product.inventory > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inventory > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              {/* Actions */}
              <div className="md:col-span-2 flex justify-between md:justify-end gap-2">
                <button
                  onClick={() => handleAddToCart(product, true)}
                  disabled={product.inventory === 0}
                  className={`flex items-center rounded-md px-3 py-1.5 text-sm ${
                    product.inventory === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <ShoppingCart size={14} className="mr-1" />
                  <span className="hidden sm:inline">Add to Cart</span>
                </button>
                
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="flex items-center text-gray-400 hover:text-red-600 p-1.5"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Continue Shopping */}
      <div className="mt-6">
        <Link 
          to="/products" 
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default WishlistPage;