import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
            <span className="hidden md:inline">LuxeMarket</span>
            <span className="md:hidden">LM</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/E-Commerce-App" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
              Products
            </Link>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="text-gray-700 hover:text-blue-600 transition-colors">
              <Heart size={20} />
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-blue-600 transition-colors">
              <User size={20} />
            </Link>
            <Link 
              to="/cart" 
              className="text-gray-700 hover:text-blue-600 transition-colors relative"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="text-gray-700 relative"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fadeIn">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/E-Commerce-App" className="text-gray-700 py-2 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 py-2 hover:text-blue-600 transition-colors">
                Products
              </Link>
              <Link to="/wishlist" className="text-gray-700 py-2 hover:text-blue-600 transition-colors flex items-center">
                <Heart size={18} className="mr-2" /> Wishlist
              </Link>
              <Link to="/account" className="text-gray-700 py-2 hover:text-blue-600 transition-colors flex items-center">
                <User size={18} className="mr-2" /> Account
              </Link>
              <button className="text-gray-700 py-2 hover:text-blue-600 transition-colors flex items-center">
                <Search size={18} className="mr-2" /> Search
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;