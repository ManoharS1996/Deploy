import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for the navbar
const NavbarContainer = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  margin-right: 15px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const Navbar = ({ cartCount }) => {
  return (
    <NavbarContainer>
      {/* Logo and Text */}
      <LogoContainer>
        <LogoImage src="https://plus.unsplash.com/premium_photo-1683798464819-d1376249293e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D" alt="Logo" /> {/* Placeholder logo */}
        <strong>MyMall</strong>
      </LogoContainer>

      {/* Navbar Links */}
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
