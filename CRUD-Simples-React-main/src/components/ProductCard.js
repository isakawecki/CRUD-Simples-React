// src/components/ProductCard.jsx
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ image, title, subtitle, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <div className="button-group">
        <button className="edit-btn" onClick={onEdit}>E</button>
        <button className="delete-btn" onClick={onDelete}>🗑️</button>
      </div>
    </div>
  );
};

export default ProductCard;
