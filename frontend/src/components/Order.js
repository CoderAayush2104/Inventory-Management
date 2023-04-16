import React from "react";
import "./order.css";

export const Order = ({ order_id, product_name, supplier_name,date, quantity,status,received_date }) => {
  return (
    <div className="orderlist-row-container">
      <div className="list-item">{order_id}</div>
      <div className="list-item">{product_name}</div>
      <div className="list-item">{supplier_name}</div>
      <div className="list-item ">{date}</div>
      <div className="list-item ">{quantity}</div>
      <div className="list-item ">{status}</div>
      <div className="list-item last">{received_date}</div>
    </div>
  );
};
