import React from "react";
import "./product.css";

export const product = ({ pid, name, price, present, minimum, uid, sid }) => {
  return (
    <tr>
      <td>{pid}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{present}</td>
      <td>{minimum}</td>
      <td>{uid}</td>
      <td>{sid}</td>
    </tr>
  );
};
