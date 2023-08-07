import React  from "react";
import "./styles/billRow.css";

//This component for the rows in bill history
export const BillRow = ({
  name,
  contact,
  date,
  amount,
  products,
  quantity,
  prices
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
      <div className="billlist-item">
        <details className="products-container">
          <summary></summary>
          {prices.map((price) => (
            <div className="product">{price}</div>
          ))}
        </details>
      </div>
      <div className="billlist-item">{date}</div>
      <div className="billlist-item last">{amount}</div>
    </div>
  );
};
