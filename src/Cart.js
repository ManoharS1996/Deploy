import React from 'react';
import styled from 'styled-components';

const CartContainer = styled.div`
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
`;

const Cart = ({ cart, removeFromCart }) => {
  return (
    <CartContainer>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map(item => (
          <CartItem key={item.id}>
            <span>{item.name} - ₹ {item.price}</span>
            <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
          </CartItem>
        ))
      )}
    </CartContainer>
  );
};

export default Cart;
