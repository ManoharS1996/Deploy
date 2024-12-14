import React from 'react';
import styled from 'styled-components';
import Product from './Product';

// Container for the homepage
const HomepageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const Homepage = ({ addToCart }) => {
  const products = [
    { id: 1, name: "Product 1", price: 1000, imageUrl: 'https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 2, name: "Product 2", price: 1500, imageUrl: 'https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 3, name: "Product 3", price: 2000, imageUrl: 'https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 4, name: "Product 4", price: 1000, imageUrl: 'https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 5, name: "Product 5", price: 1500, imageUrl: 'https://images.pexels.com/photos/3616993/pexels-photo-3616993.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 6, name: "Product 6", price: 2000, imageUrl: 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=600' },
    { id: 7, name: "Product 7", price: 1000, imageUrl: 'https://images.pexels.com/photos/2638026/pexels-photo-2638026.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 8, name: "Product 8", price: 1500, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 9, name: "Product 9", price: 2000, imageUrl: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 10, name: "Product 10", price: 2000, imageUrl: 'https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 11, name: "Product 11", price: 2000, imageUrl: 'https://images.pexels.com/photos/4735904/pexels-photo-4735904.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 11, name: "Product 12", price: 2000, imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D' },
  ];

  return (
    <HomepageContainer>
      {products.map(product => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
    </HomepageContainer>
  );
};

export default Homepage;
