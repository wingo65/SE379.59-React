import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductPage';
import ProductDetailPage from './components/ProductDetailsPage';
import './App.css';

const App = () => {
  // Define initial state for products
  const [products] = useState([
    {
      id: 1,
      title: "Product 1",
      thumbnail: "https://via.placeholder.com/150",
      image: "https://via.placeholder.com/350",
      description: "Description of Product 1",
      price: 10.99
    },
  ]);

  // Define state variables for current page and selected product
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to navigate to a specific page
  const navigateToPage = (page) => {
    setCurrentPage(page);
    setSelectedProduct(null); // Reset selected product when navigating to a new page
  };

  // Function to handle when a product is clicked
  const handleProductClick = (productId) => {
    // Find the product with the given ID
    const product = products.find(product => product.id === productId);
    setSelectedProduct(product); // Set the selected product
    setCurrentPage('productDetail'); // Navigate to the product detail page
  };

  // Object mapping page names to their components
  const pageComponents = {
    home: <HomePage />,
    products: <ProductsPage products={products} onProductClick={handleProductClick} />,
    productDetail: <ProductDetailPage product={selectedProduct} onBackClick={() => navigateToPage('products')} />
  };

  return (
    <div>
      {/* Navigation buttons */}
      <nav>
        <button onClick={() => navigateToPage('home')}>Home</button>
        <button onClick={() => navigateToPage('products')}>Products</button>
      </nav>
      
      {/* Render the current page component */}
      {pageComponents[currentPage]}
    </div>
  );
}

export default App;