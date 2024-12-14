import React from "react";
import { FaRupeeSign } from "react-icons/fa";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>
        <FaRupeeSign /> {product.price}
      </p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
