import React, { useState } from "react";
import "./billRow.css";
import { product } from "./../backup/pages/product";

export const BillRow = ({
  name,
  contact,
  date,
  amount,
  products,
  quantity,
}) => {
  return (
    <div className="billrow-container">
      <div className="billlist-item">{name}</div>
      <div className="billlist-item">{contact}</div>

      <div className="billlist-item">
        <details className="products-container">
          <summary></summary>
          {products.map((product) => (
            <div className="product">{product}</div>
          ))}
        </details>
      </div>
      <div className="billlist-item">
        <details className="products-container">
          <summary></summary>
          {quantity.map((quantity) => (
            <div className="product">{quantity}</div>
          ))}
        </details>
      </div>
      <div className="billlist-item">{date}</div>
      <div className="billlist-item last">{amount}</div>
    </div>
  );
};
