import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  // Calculate shipping cost (free if total price exceeds $50)
  const shippingCost = totalPrice > 50 ? 0 : 5.99;
  
  // Calculate tax (assume 8%)
  const taxRate = 0.08;
  const taxAmount = totalPrice * taxRate;
  
  // Calculate order total
  const orderTotal = totalPrice + shippingCost + taxAmount;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <ShoppingCart size={24} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            to="/products" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Header */}
            <div className="hidden md:grid md:grid-cols-12 px-6 py-4 bg-gray-50 text-gray-600 font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product */}
                  <div className="md:col-span-6 flex">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <Link 
                        to={`/products/${item.id}`} 
                        className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-gray-500 text-sm mt-1">Category: {item.product.category}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center text-red-600 hover:text-red-700 text-sm mt-2 md:hidden"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:col-span-2 flex justify-between md:justify-center">
                    <span className="md:hidden text-gray-600">Price:</span>
                    <span className="text-gray-900">${item.product.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                    <span className="md:hidden text-gray-600">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Minus size={14} />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-10 text-center border-0 focus:ring-0 text-sm"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.inventory}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="md:col-span-2 flex justify-between md:justify-end">
                    <span className="md:hidden text-gray-600">Total:</span>
                    <div className="flex items-center">
                      <span className="text-gray-900 font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-gray-400 hover:text-red-600 hidden md:block"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-gray-900">
                  {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span className="text-gray-900">${taxAmount.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="font-bold text-gray-900">Order Total</span>
                <span className="font-bold text-gray-900">${orderTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Link
              to="/checkout"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md flex items-center justify-center transition-colors"
            >
              Proceed to Checkout
            </Link>
            
            {/* Promotions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Promo Code</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-grow rounded-l-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-r-md transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;