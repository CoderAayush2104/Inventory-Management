import React from "react";
import "./supplyRow.css";


export const SupplyRow = ({ order_id, product_name, user_name,date, quantity}) => {
  return (
    <div className="supplylist-row-container">
      <div className="list-item">{order_id}</div>
      <div className="list-item">{product_name}</div>
      <div className="list-item">{user_name}</div>
      <div className="list-item ">{date}</div>
      <div className="list-item ">{quantity}</div>
      <div className="list-item last"><i class="fa-solid fa-circle-check" style={{color: "#00ff2a"}}></i><i class="fa-sharp fa-solid fa-circle-xmark" style={{color: "#ff0000"}}></i></div>
      
    </div>
  );
};