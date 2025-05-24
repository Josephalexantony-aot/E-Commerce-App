import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { User, LogOut, Package, CreditCard, Settings, UserCircle } from 'lucide-react';

const AccountPage: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <UserCircle size={24} />
                </div>
                <div className="ml-4">
                  <h2 className="font-medium text-gray-900">{currentUser?.name}</h2>
                  <p className="text-sm text-gray-600">{currentUser?.email}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-3 rounded-md ${
                  activeTab === 'profile' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User size={18} className="mr-3" />
                <span>Profile</span>
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-4 py-3 rounded-md ${
                  activeTab === 'orders' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Package size={18} className="mr-3" />
                <span>Orders</span>
              </button>
              
              <button
                onClick={() => setActiveTab('payment')}
                className={`w-full flex items-center px-4 py-3 rounded-md ${
                  activeTab === 'payment' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CreditCard size={18} className="mr-3" />
                <span>Payment Methods</span>
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-4 py-3 rounded-md ${
                  activeTab === 'settings' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Settings size={18} className="mr-3" />
                <span>Settings</span>
              </button>
              
              <button
                onClick={logout}
                className="w-full flex items-center px-4 py-3 rounded-md text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} className="mr-3" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'profile' && <ProfileTab user={currentUser} />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'payment' && <PaymentTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Tab
const ProfileTab: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            defaultValue={user?.name}
            className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            defaultValue={user?.email}
            className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            defaultValue={user?.address || ''}
            className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div className="pt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Orders Tab
const OrdersTab: React.FC = () => {
  // Demo orders
  const orders = [
    {
      id: 'ORD-12345',
      date: '2023-10-15',
      total: 149.99,
      status: 'Delivered',
      items: 2
    },
    {
      id: 'ORD-12346',
      date: '2023-09-28',
      total: 79.99,
      status: 'Processing',
      items: 1
    }
  ];
  
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order History</h2>
      
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'Processing' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <button className="text-blue-600 hover:text-blue-700">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

// Payment Tab
const PaymentTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Methods</h2>
      
      <div className="space-y-4 mb-8">
        <div className="border border-gray-200 rounded-lg p-4 flex items-center">
          <div className="bg-blue-100 rounded-md p-2 mr-4">
            <CreditCard size={24} className="text-blue-600" />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between">
              <p className="font-medium text-gray-900">Visa ending in 4242</p>
              <p className="text-sm text-gray-500">Default</p>
            </div>
            <p className="text-sm text-gray-600">Expires 12/2025</p>
          </div>
          <div>
            <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
          </div>
        </div>
      </div>
      
      <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
        <span className="mr-1">+</span> Add Payment Method
      </button>
    </div>
  );
};

// Settings Tab
const SettingsTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="orderUpdates"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="orderUpdates" className="ml-3 text-gray-700">
                Order updates and shipping notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="promotions"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="promotions" className="ml-3 text-gray-700">
                Promotions and special offers
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="newsletter"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="newsletter" className="ml-3 text-gray-700">
                Weekly newsletter
              </label>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors">
                Update Password
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
          
          <button className="text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 px-4 py-2 rounded-md transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

// Login Form
const LoginForm: React.FC = () => {
  const { login, register, loading, error } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);
  
  if (redirect) {
    return <Navigate to="/account" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (!formData.email || !formData.password) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let success;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        success = await register({
          name: formData.name,
          email: formData.email,
        });
      }
      
      if (success) {
        setRedirect(true);
      }
    } catch (err) {
      setFormError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {isLogin ? 'Sign In to Your Account' : 'Create an Account'}
        </h1>
        
        {(error || formError) && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
            {error || formError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          {!isLogin && (
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-gray-400"
          >
            {isSubmitting || loading 
              ? 'Please wait...' 
              : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Sign in'}
          </button>
        </div>
        
        {isLogin && (
          <div className="mt-4 text-center">
            <button className="text-blue-600 hover:text-blue-700 text-sm">
              Forgot your password?
            </button>
          </div>
        )}
        
        {/* Demo Account Info */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p className="mb-2 font-medium">Demo Account</p>
          <p>Email: demo@example.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;