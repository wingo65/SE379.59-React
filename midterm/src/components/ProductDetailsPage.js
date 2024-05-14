import React from 'react';

const ProductDetailsPage = ({ product }) => (
  <div>
    <h2>{product.title}</h2>
    <img src={product.image} alt={product.title} style={styles.image} />
    <p><strong>Price: </strong>${product.price}</p>
    <p><strong>Description:</strong> {product.description}</p>
    <p><strong>Category:</strong> {product.category}</p>
    <p><strong>Rating: </strong>{product.rating.rate} ({product.rating.count} reviews)</p>
  </div>
);

const styles = {
  image: {
    maxWidth: '100%',
    maxHeight: '400px',
  },
};

export default ProductDetailsPage;