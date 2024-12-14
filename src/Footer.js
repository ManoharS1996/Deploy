import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const Footer = () => {
  return <FooterContainer>© 2024 All Rights Reserved Inc.</FooterContainer>;
};

export default Footer;
