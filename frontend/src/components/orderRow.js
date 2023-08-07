import React, { useState } from "react";
import "./styles/orderRow.css";
import { product } from './Product';

export const OrderRow = ({
  date,
  product,
  quantity,

}) => {
  

  return (
    <div className="orderrow-container">
      <div className="orderlist-item">{date}</div>
      <div className="orderlist-item">{product}</div>
      <div className="orderlist-item last">{quantity}</div>
 
    </div>
  );
};
