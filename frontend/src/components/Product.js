import React from "react";
import "./product.css";

export const Product = ({ p_id, p_name, present, minimum, supplier_name, price }) => {
  return (
    <div className="row-container">
      <div className="list-item"><button className="delete-button"><i class="fa-solid fa-trash"/></button>{p_id}</div>
      <div className="list-item">{p_name}</div>
      <div className="list-item">{present}</div>
      <div className="list-item">{minimum}</div>
      <div className="list-item ">{supplier_name}</div>
      <div className="list-item last">{price}</div>
    </div>
  );
};
