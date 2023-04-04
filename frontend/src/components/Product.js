import React, { useState } from "react";
import "./product.css";

export const Product = ({
  p_id,
  p_name,
  present,
  minimum,
  supplier_name,
  price,
}) => {
  const PRODUCT_ID = p_id;
  let data = { PRODUCT_ID };

  function deleteItem(e) {
    e.target.parentElement.parentElement.parentElement.remove();

    fetch(
      `https://ochre-beetle-cape.cyclic.app/api/products/delete/${PRODUCT_ID}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((resp) => console.log(resp))

      .catch((error) => console.log(error));
  }
  return (
    <div className="row-container">
      <div className="list-item">
        <button
          className="delete-button"
          id="delete-button"
          onClick={(e) => deleteItem(e)}
        >
          <i class="fa-solid fa-trash" />
        </button>
        {p_id}
      </div>
      <div className="list-item">{p_name}</div>
      <div className="list-item">{present}</div>
      <div className="list-item">{minimum}</div>
      <div className="list-item ">{supplier_name}</div>
      <div className="list-item last">{price}</div>
    </div>
  );
};
