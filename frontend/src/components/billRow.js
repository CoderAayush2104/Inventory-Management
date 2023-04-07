import React, { useState } from "react";
import "./billRow.css";

export const BillRow = ({
  p_id,
  p_name,
  present,
  minimum,
  supplier_name,
  price,
}) => {
  

  return (
    <div className="billrow-container">
      <div className="billlist-item">{p_id}</div>
      <div className="billlist-item">{p_name}</div>
      <div className="billlist-item">{present}</div>
      <div className="billlist-item">{minimum}</div>
      <div className="billlist-item ">{supplier_name}</div>
      <div className="billlist-item last">{price}</div>
    </div>
  );
};
