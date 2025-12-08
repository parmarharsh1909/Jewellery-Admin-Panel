import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize dummy data for testing
const initializeDummyData = () => {
  // Check if data already exists
  if (!localStorage.getItem('dummyDataInitialized')) {
    // Dummy Categories
    const dummyCategories = [
      {
        id: 1701520001,
        name: 'Rings',
        description: 'Beautiful collection of rings for men including engagement rings, wedding bands, and fashion rings',
        gender: 'male',
        status: 'active',
        createdAt: '2024-11-15T10:30:00.000Z'
      },
      {
        id: 1701520002,
        name: 'Chains',
        description: 'Premium gold and silver chains for men in various designs and lengths',
        gender: 'male',
        status: 'active',
        createdAt: '2024-11-16T14:20:00.000Z'
      },
      {
        id: 1701520003,
        name: 'Bracelets',
        description: 'Stylish bracelets and wrist accessories for men',
        gender: 'male',
        status: 'active',
        createdAt: '2024-11-17T09:15:00.000Z'
      },
      {
        id: 1701520004,
        name: 'Necklaces',
        description: 'Elegant necklace collection for women featuring diamonds, pearls, and precious stones',
        gender: 'female',
        status: 'active',
        createdAt: '2024-11-18T11:45:00.000Z'
      },
      {
        id: 1701520005,
        name: 'Earrings',
        description: 'Stunning earrings collection ranging from studs to chandelier designs',
        gender: 'female',
        status: 'active',
        createdAt: '2024-11-19T16:30:00.000Z'
      },
      {
        id: 1701520006,
        name: 'Bangles',
        description: 'Traditional and modern bangles in gold, silver, and diamond',
        gender: 'female',
        status: 'active',
        createdAt: '2024-11-20T10:00:00.000Z'
      },
    ];

    // Dummy Products
    const dummyProducts = [
      {
        id: 1701530001,
        name: 'Gold Signet Ring',
        category: 'Rings',
        price: 35000,
        weight: '8.5',
        purity: '22K',
        description: 'Classic gold signet ring for men with intricate design work',
        stock: 15,
        status: 'active',
        gender: 'male',
        image: '',
        createdAt: '2024-11-25T10:30:00.000Z'
      },
      {
        id: 1701530002,
        name: 'Platinum Chain',
        category: 'Chains',
        price: 65000,
        weight: '12.3',
        purity: 'Platinum',
        description: 'Premium platinum chain with rope design, 22 inches length',
        stock: 8,
        status: 'active',
        gender: 'male',
        image: '',
        createdAt: '2024-11-26T14:20:00.000Z'
      },
      {
        id: 1701530003,
        name: 'Silver Bracelet',
        category: 'Bracelets',
        price: 12500,
        weight: '18.0',
        purity: 'Silver 925',
        description: 'Oxidized silver bracelet with tribal patterns',
        stock: 25,
        status: 'active',
        gender: 'male',
        image: '',
        createdAt: '2024-11-27T09:15:00.000Z'
      },
      {
        id: 1701530004,
        name: 'Diamond Necklace Set',
        category: 'Necklaces',
        price: 185000,
        weight: '15.5',
        purity: '18K',
        description: 'Exquisite diamond necklace set with matching earrings, perfect for weddings',
        stock: 5,
        status: 'active',
        gender: 'female',
        image: '',
        createdAt: '2024-11-28T11:45:00.000Z'
      },
      {
        id: 1701530005,
        name: 'Pearl Drop Earrings',
        category: 'Earrings',
        price: 28000,
        weight: '3.2',
        purity: '14K',
        description: 'Elegant freshwater pearl drop earrings in white gold setting',
        stock: 20,
        status: 'active',
        gender: 'female',
        image: '',
        createdAt: '2024-11-29T16:30:00.000Z'
      },
      {
        id: 1701530006,
        name: 'Ruby Stud Earrings',
        category: 'Earrings',
        price: 45000,
        weight: '2.8',
        purity: '18K',
        description: 'Beautiful ruby stud earrings set in yellow gold',
        stock: 12,
        status: 'active',
        gender: 'female',
        image: '',
        createdAt: '2024-11-30T12:00:00.000Z'
      },
      {
        id: 1701530007,
        name: 'Gold Bangles Set',
        category: 'Bangles',
        price: 95000,
        weight: '45.0',
        purity: '22K',
        description: 'Traditional gold bangles set of 4 pieces with intricate carving',
        stock: 6,
        status: 'active',
        gender: 'female',
        image: '',
        createdAt: '2024-12-01T10:00:00.000Z'
      },
      {
        id: 1701530008,
        name: 'Gold Wedding Ring',
        category: 'Rings',
        price: 42000,
        weight: '6.5',
        purity: '18K',
        description: 'Classic wedding band in rose gold finish',
        stock: 18,
        status: 'active',
        gender: 'male',
        image: '',
        createdAt: '2024-12-02T08:30:00.000Z'
      },
      {
        id: 1701530009,
        name: 'Diamond Bangles',
        category: 'Bangles',
        price: 225000,
        weight: '35.5',
        purity: '18K',
        description: 'Luxurious diamond bangles pair with VS clarity stones',
        stock: 3,
        status: 'active',
        gender: 'female',
        image: '',
        createdAt: '2024-12-02T14:15:00.000Z'
      },
      {
        id: 1701530010,
        name: 'Silver Chain',
        category: 'Chains',
        price: 8500,
        weight: '15.0',
        purity: 'Silver 925',
        description: 'Sterling silver chain 24 inches with lobster clasp',
        stock: 30,
        status: 'active',
        gender: 'male',
        image: '',
        createdAt: '2024-12-02T16:00:00.000Z'
      },
    ];

    // Save to localStorage
    localStorage.setItem('categories', JSON.stringify(dummyCategories));
    localStorage.setItem('products', JSON.stringify(dummyProducts));
    localStorage.setItem('dummyDataInitialized', 'true');
    
    console.log('✅ Dummy data initialized!');
    console.log(`📦 ${dummyCategories.length} categories and ${dummyProducts.length} products added`);
  }
};

// Initialize dummy data before rendering
initializeDummyData();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
