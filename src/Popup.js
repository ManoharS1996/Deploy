import React from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
`;

const Popup = () => {
  return <PopupContainer>Item added to cart!</PopupContainer>;
};

export default Popup;
