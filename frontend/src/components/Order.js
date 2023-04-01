import React from "react";
import "./order.css";

export const Order = ({ order_id, product_id, supplier_id,date, quantity }) => {
  return (
    <div className="orderlist-row-container">
      {/* <div className="list-item"><button className="delete-button"><i class="fa-solid fa-trash"/></button>{p_id}</div> */}
      <div className="list-item">{order_id}</div>
      <div className="list-item">{product_id}</div>
      <div className="list-item">{supplier_id}</div>
      <div className="list-item ">{date}</div>
      <div className="list-item last">{quantity}</div>
    </div>
  );
};
