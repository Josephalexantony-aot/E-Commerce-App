import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart, Share2, Star, Truck, ArrowLeft, Plus, Minus, Shield } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, isLoading } = useProducts();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productData = await getProductById(id);
        setProduct(productData);
      }
    };
    
    fetchProduct();
  }, [id, getProductById]);

  if (isLoading || !product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 h-96 bg-gray-200 rounded-lg"></div>
            <div className="md:w-1/2">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
              <div className="h-12 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.inventory) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(product, quantity);
    
    // Simulate adding to cart with a small delay
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 500);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain aspect-square"
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                />
              ))}
            </div>
            <span className="text-gray-600 ml-1">{product.rating.toFixed(1)}</span>
          </div>
          
          {/* Price */}
          <div className="text-2xl font-bold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </div>
          
          {/* Description */}
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Inventory Status */}
          <div className="mb-6">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
              product.inventory > 10 
                ? 'bg-green-100 text-green-800' 
                : product.inventory > 0 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-red-100 text-red-800'
            }`}>
              {product.inventory > 10 
                ? 'In Stock' 
                : product.inventory > 0 
                  ? `Only ${product.inventory} left` 
                  : 'Out of Stock'}
            </span>
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4 text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                min="1"
                max={product.inventory}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-12 text-center border-0 focus:ring-0"
              />
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.inventory}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.inventory === 0}
              className={`flex-1 flex items-center justify-center py-3 px-6 rounded-md font-medium transition-colors duration-300 ${
                isAddingToCart 
                  ? 'bg-green-600 text-white' 
                  : product.inventory === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isAddingToCart 
                ? 'Added!' 
                : product.inventory === 0
                  ? 'Out of Stock'
                  : (
                    <>
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </>
                  )
              }
            </button>
            
            <button
              onClick={toggleWishlist}
              className={`flex items-center justify-center py-3 px-6 rounded-md font-medium border transition-colors duration-300 ${
                isWishlisted 
                  ? 'bg-red-50 border-red-200 text-red-600' 
                  : 'border-gray-300 hover:border-gray-400 text-gray-700'
              }`}
            >
              <Heart 
                size={18} 
                className="mr-2" 
                fill={isWishlisted ? "currentColor" : "none"} 
              />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>
          
          {/* Shipping Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-start">
              <Truck size={20} className="mr-3 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Free Shipping</h3>
                <p className="text-gray-600 text-sm">
                  Free standard shipping on orders over $50. Estimated delivery: 3-5 business days.
                </p>
              </div>
            </div>
          </div>
          
          {/* Guarantee */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Shield size={20} className="mr-3 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Satisfaction Guarantee</h3>
                <p className="text-gray-600 text-sm">
                  30-day money back guarantee. No questions asked.
                </p>
              </div>
            </div>
          </div>
          
          {/* Share */}
          <div className="mt-8 flex items-center">
            <span className="text-gray-700 mr-3">Share:</span>
            <div className="flex space-x-2">
              <button className="text-gray-500 hover:text-blue-600">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Details */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
        
        <div className="border-t border-gray-200">
          <div className="py-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-4">
            <div className="md:col-span-1 font-medium text-gray-900">Category</div>
            <div className="md:col-span-3 text-gray-700 capitalize">{product.category}</div>
          </div>
          
          <div className="py-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-4">
            <div className="md:col-span-1 font-medium text-gray-900">Rating</div>
            <div className="md:col-span-3 text-gray-700">{product.rating.toFixed(1)} out of 5</div>
          </div>
          
          <div className="py-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-4">
            <div className="md:col-span-1 font-medium text-gray-900">Availability</div>
            <div className="md:col-span-3 text-gray-700">
              {product.inventory > 0 ? `In stock (${product.inventory} available)` : 'Out of stock'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;