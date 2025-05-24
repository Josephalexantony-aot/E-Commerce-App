import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { fetchProducts, fetchProductById, fetchProductsByCategory } from '../services/productService';

type ProductContextType = {
  products: Product[];
  featuredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  getProductById: (id: string) => Promise<Product | undefined>;
  getProductsByCategory: (category: string) => Promise<Product[]>;
  searchProducts: (query: string) => Product[];
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        
        // Set featured products (for example, first 4 products)
        setFeaturedProducts(data.slice(0, 4));
        
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Get a product by ID
  const getProductById = async (id: string): Promise<Product | undefined> => {
    // First check if we already have the product in state
    const existingProduct = products.find(p => p.id === id);
    
    if (existingProduct) {
      return existingProduct;
    }
    
    // If not, fetch it from the API
    try {
      return await fetchProductById(id);
    } catch (err) {
      setError('Failed to load product. Please try again later.');
      return undefined;
    }
  };

  // Get products by category
  const getProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
      return await fetchProductsByCategory(category);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      return [];
    }
  };

  // Search products by name
  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) {
      return products;
    }
    
    const lowerCaseQuery = query.toLowerCase().trim();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(lowerCaseQuery) || 
      product.description.toLowerCase().includes(lowerCaseQuery)
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        featuredProducts,
        isLoading,
        error,
        getProductById,
        getProductsByCategory,
        searchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};