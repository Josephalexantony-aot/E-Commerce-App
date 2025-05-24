import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';

const HomePage: React.FC = () => {
  const { featuredProducts, isLoading } = useProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Discover Premium Products for Every Lifestyle
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Shop the latest trends and innovations with confidence. Quality guaranteed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors duration-300"
              >
                Shop Now
              </Link>
              <Link
                to="/products"
                className="border border-white text-white hover:bg-white hover:text-blue-700 px-6 py-3 rounded-md font-medium transition-colors duration-300"
              >
                View Collections
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link 
              to="/products" 
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              View All <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div 
                  key={index} 
                  className="bg-gray-100 rounded-lg animate-pulse h-80"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <Link to="/products?category=electronics" className="block relative">
                <div className="aspect-w-16 aspect-h-9 h-48 bg-blue-100 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/343457/pexels-photo-343457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Electronics" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Electronics</h3>
                  <p className="text-gray-600">Latest gadgets and tech</p>
                </div>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <Link to="/products?category=clothing" className="block relative">
                <div className="aspect-w-16 aspect-h-9 h-48 bg-teal-100 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Clothing" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Clothing</h3>
                  <p className="text-gray-600">Stylish apparel for everyone</p>
                </div>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <Link to="/products?category=accessories" className="block relative">
                <div className="aspect-w-16 aspect-h-9 h-48 bg-amber-100 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Accessories" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Accessories</h3>
                  <p className="text-gray-600">Complete your look</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex items-center text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The quality of the products exceeded my expectations. Fast shipping and excellent customer service!"
              </p>
              <div className="font-medium">
                <p className="text-gray-900">Sarah J.</p>
                <p className="text-gray-500 text-sm">Verified Customer</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex items-center text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "I've been shopping here for years and have never been disappointed. Their attention to detail is amazing."
              </p>
              <div className="font-medium">
                <p className="text-gray-900">Michael T.</p>
                <p className="text-gray-500 text-sm">Verified Customer</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex items-center text-amber-400 mb-4">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Great selection of products at competitive prices. The checkout process was smooth and hassle-free."
              </p>
              <div className="font-medium">
                <p className="text-gray-900">Jessica R.</p>
                <p className="text-gray-500 text-sm">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new arrivals, and insider-only discounts.
          </p>
          
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-md focus:outline-none text-gray-900"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-md font-medium transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-teal-100 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;