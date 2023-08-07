import React, { useEffect, useRef, useState } from "react";
import "./styles/billProduct.css";

const specificElement = document.getElementById("autocomplete");

//This componenet is for the quantity and product name that gets added on click of cart button
export const BillProduct = (props) => {
  const [quantity, setQuantity] = useState();

  const [ProductName, setProductName] = useState("");
  const match = useRef();

  const [activeIndex, setActiveIndex] = useState(-1);
  const [visibility, setVisibility] = useState(false);

  document?.addEventListener("click", function (event) {
    const isClickInside = specificElement?.contains(event.target);
    if (!isClickInside) {
      // The click occurred outside of the specific element
      match.current = [];
      setVisibility(false);
    }
  });

  function handleInputChange(event) {
    setVisibility(true);
    const value = event.target.value;
    setProductName(value);

    const matching = props.dropdown.filter((product) =>
      product.toLowerCase().startsWith(value.toLowerCase())
    );
    match.current = matching;
    setActiveIndex(-1);
  }

  function handleListItemClick(product) {
    setProductName(product);
    match.current = [];
  }

  function handleKeyDown(event) {
    if (event.keyCode === 40) {
      // Arrow down
      setActiveIndex((prevIndex) => {
        if (prevIndex === match.current.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    } else if (event.keyCode === 38) {
      // Arrow up
      setActiveIndex((prevIndex) => {
        if (prevIndex === 0) {
          return match.current.length - 1;
        } else {
          return prevIndex - 1;
        }
      });
    } else if (event.keyCode === 13) {
      // Enter
      if (activeIndex !== -1) {
        setProductName(match.current[activeIndex]);
        match.current = [];
      }
    }
  }

  return (
    <div className="billproduct-container">
      <div className="bill-label">
        <input
        required
          className="addproduct-input"
          name="PRODUCT_NAME"
          id="autocomplete"
          value={ProductName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <ul
          className={
            visibility ? "autocomplete-results" : "autocomplete-results hide"
          }
        >
          {match?.current?.map((product, index) => (
            <li
              key={product}
              className={index === activeIndex ? "active" : ""}
              onClick={() => handleListItemClick(product)}
            >
              {product}
            </li>
          ))}
        </ul>
      </div>
      <div className="bill-label">Quantity</div>
      <div className="bill-label quantity">
        {" "}
        <input
          required
          className="addproduct-input"
          name="PRODUCT_NAME"
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
      </div>

      {props.handleCallback({ PRODUCT_NAME: ProductName, QUANTITY: quantity })}
    </div>
  );
};
