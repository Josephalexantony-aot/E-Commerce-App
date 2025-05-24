import { Product } from '../types/product';

// Mock data for products
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    image: 'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'electronics',
    inventory: 15,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Slim Fit Cotton T-Shirt',
    price: 29.99,
    description: 'Comfortable and stylish slim fit t-shirt made from 100% organic cotton.',
    image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'clothing',
    inventory: 50,
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Smart Watch Series 5',
    price: 399.99,
    description: 'The latest smartwatch with health monitoring, GPS, and app connectivity.',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'electronics',
    inventory: 8,
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Leather Messenger Bag',
    price: 149.99,
    description: 'Handcrafted genuine leather messenger bag with multiple compartments.',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'accessories',
    inventory: 12,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Ultra HD 4K Smart TV',
    price: 1299.99,
    description: '55-inch Ultra HD Smart TV with HDR and built-in streaming apps.',
    image: 'https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'electronics',
    inventory: 5,
    rating: 4.7,
  },
  {
    id: '6',
    name: 'Designer Sunglasses',
    price: 199.99,
    description: 'Premium polarized sunglasses with UV protection and stylish design.',
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'accessories',
    inventory: 20,
    rating: 4.4,
  },
  {
    id: '7',
    name: 'Wireless Bluetooth Speaker',
    price: 79.99,
    description: 'Portable wireless speaker with 20-hour battery life and waterproof design.',
    image: 'https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'electronics',
    inventory: 25,
    rating: 4.3,
  },
  {
    id: '8',
    name: 'Premium Coffee Maker',
    price: 149.99,
    description: 'Programmable coffee maker with thermal carafe and precision brewing.',
    image: 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'home',
    inventory: 10,
    rating: 4.8,
  }
];

// Simulate API request delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  await delay(500); // Simulate network delay
  return [...mockProducts];
};

// Fetch a product by ID
export const fetchProductById = async (id: string): Promise<Product> => {
  await delay(300);
  const product = mockProducts.find(p => p.id === id);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return { ...product };
};

// Fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  await delay(400);
  return mockProducts
    .filter(p => p.category === category)
    .map(p => ({ ...p }));
};

// Update product inventory (would connect to an API in a real app)
export const updateProductInventory = async (productId: string, newQuantity: number): Promise<boolean> => {
  await delay(300);
  // In a real app, this would update the backend
  return true;
};