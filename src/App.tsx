import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import WishlistPage from './pages/WishlistPage';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/E-Commerce-App" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </Router>
  );
}

export default App;