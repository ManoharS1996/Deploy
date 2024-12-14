import React from 'react';
import styled from 'styled-components';

// Styled container for each product
const ProductContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 220px;
  margin: 15px;
  padding: 15px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

// Styled image for product
const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
`;

// Styled title for product
const ProductTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 10px 0;
`;

// Styled price for product
const ProductPrice = styled.p`
  font-size: 16px;
  color: #555;
  margin: 10px 0;
  font-weight: bold;
`;

// Button to add product to cart
const AddToCartButton = styled.button`
  background-color: #ff9900;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;

  &:hover {
    background-color: #ff7f00;
  }
`;

const Product = ({ product, addToCart }) => {
  return (
    <ProductContainer>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <ProductTitle>{product.name}</ProductTitle>
      <ProductPrice>₹ {product.price}</ProductPrice>
      <AddToCartButton onClick={() => addToCart(product)}>Add to Cart</AddToCartButton>
    </ProductContainer>
  );
};

export default Product;
