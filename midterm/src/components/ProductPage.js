import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDetailsPage from './ProductDetailsPage';

const ProductsPage = () => {
  // State for storing products and selected product
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products from the server when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3000/products') // Fetch products from the server
      .then(response => {
        setProducts(response.data); // Update state with fetched products
      })
      .catch(error => {
        console.error('Error fetching products: ', error); // Log error if fetching fails
      });
  }, []);

  // Handler for when a product is clicked
  const handleProductClick = (product) => {
    setSelectedProduct(product); // Set the selected product
  };

  // Handler for clicking the back button
  const handleBackClick = () => {
    setSelectedProduct(null); // Clear the selected product
  };

  return (
    <div>
      <h1>Products</h1>
      {/* Render the selected product details if one is selected */}
      {selectedProduct ? (
        <div>
          <button onClick={handleBackClick}>Back</button>
          {/* Render the ProductDetailsPage component with the selected product */}
          <ProductDetailsPage product={selectedProduct} />
        </div>
      ) : (
        // Render the list of products if no product is selected
        <div style={styles.container}>
          {/* Map over the products and render each as a clickable card */}
          {products.map(product => (
            <div key={product.id} style={styles.card} onClick={() => handleProductClick(product)}>
              <img src={product.image} alt={product.title} style={styles.image} />
              <p style={styles.title}>{product.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Styles for the component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
  },
  card: {
    margin: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  selectedCard: {
    margin: '10px auto',
    padding: '20px',
    border: '2px solid blue', 
    borderRadius: '10px',
    textAlign: 'center',
  },
  image: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
};
export default ProductsPage;
