// src/components/ProductDetail.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams();
  const products = useSelector(state => state.products.products);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.category}</p>
    </div>
  );
};

export default ProductDetail;
