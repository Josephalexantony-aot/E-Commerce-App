import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Handle adding to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    addToCart(product, 1);
    
    // Reset button state after a short delay
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };
  
  // Handle wishlist toggle
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get current wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    let wishlist: Product[] = savedWishlist ? JSON.parse(savedWishlist) : [];
    
    if (isWishlisted) {
      // Remove from wishlist
      wishlist = wishlist.filter(item => item.id !== product.id);
    } else {
      // Add to wishlist if not already there
      if (!wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
      }
    }
    
    // Save updated wishlist
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setIsWishlisted(!isWishlisted);
  };
  
  // Check if product is in wishlist on mount
  React.useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const wishlist: Product[] = JSON.parse(savedWishlist);
      setIsWishlisted(wishlist.some(item => item.id === product.id));
    }
  }, [product.id]);

  return (
    <div className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`/products/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2 rounded-full ${
              isWishlisted 
                ? 'bg-red-50 text-red-500' 
                : 'bg-white/80 text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          
          {/* Inventory Badge */}
          {product.inventory <= 5 && product.inventory > 0 && (
            <div className="absolute top-3 left-3 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
              Only {product.inventory} left
            </div>
          )}
          
          {product.inventory === 0 && (
            <div className="absolute top-3 left-3 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
              Out of Stock
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div className="p-4">
          <div className="flex items-center text-amber-400 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
              />
            ))}
            <span className="text-gray-600 text-xs ml-1">{product.rating.toFixed(1)}</span>
          </div>
          
          <h3 className="text-gray-900 font-medium mb-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-500 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
            
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.inventory === 0}
              className={`flex items-center rounded-md px-3 py-1.5 text-sm transition-colors ${
                isAddingToCart 
                  ? 'bg-green-600 text-white' 
                  : product.inventory === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <ShoppingCart size={14} className="mr-1" />
              {isAddingToCart ? 'Added!' : 'Add'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;