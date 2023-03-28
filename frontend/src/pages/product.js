import React from "react";
import "./product.css";

export const Product = ({ p_id, p_name, present, minimum, supplier_id, price }) => {
  return (
    <div className="row-container">
      <div className="list-item">{p_id}</div>
      <div className="list-item">{p_name}</div>
      <div className="list-item">{present}</div>
      <div className="list-item">{minimum}</div>
      <div className="list-item ">{supplier_id}</div>
      <div className="list-item last">{price}</div>
    </div>
  );
};
