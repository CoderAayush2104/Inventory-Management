import React, { useState } from "react";
import "./billProduct.css";

const Products = ["Pen", "Pencil", "Notebook", "Marker", "Crayon", "Scale"];

const specificElement = document.getElementById("autocomplete");

export const BillProduct = (props) => {
  const [quantity, setQuantity] = useState();

  const [ProductName, setProductName] = useState("");
  const [matchingProducts, setMatchingProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [visibility, setVisibility] = useState(false);

  //Method to clear state in child component
  function clearState() {
    setProductName("");
    setQuantity("");
  }

  //Pass clearState function to parent
  props.passClearStateFunc(clearState);

  document?.addEventListener("click", function (event) {
    const isClickInside = specificElement?.contains(event.target);
    if (!isClickInside) {
      // The click occurred outside of the specific element
      setMatchingProducts([]);
      setVisibility(false);
    }
  });

  function handleInputChange(event) {
    setVisibility(true);
    const value = event.target.value;
    setProductName(value);

    const matching = Products.filter((product) =>
      product.toLowerCase().startsWith(value.toLowerCase())
    );
    setMatchingProducts(matching);
    setActiveIndex(-1);
  }

  function handleListItemClick(product) {
    setProductName(product);
    setMatchingProducts([]);
  }

  function handleKeyDown(event) {
    if (event.keyCode === 40) {
      // Arrow down
      setActiveIndex((prevIndex) => {
        if (prevIndex === matchingProducts.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    } else if (event.keyCode === 38) {
      // Arrow up
      setActiveIndex((prevIndex) => {
        if (prevIndex === 0) {
          return matchingProducts.length - 1;
        } else {
          return prevIndex - 1;
        }
      });
    } else if (event.keyCode === 13) {
      // Enter
      if (activeIndex !== -1) {
        setProductName(matchingProducts[activeIndex]);
        setMatchingProducts([]);
      }
    }
  }

  return (
    <div className="billproduct-container">
      <div className="bill-label">
        <input
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
          {matchingProducts.map((product, index) => (
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
          className="addproduct-input"
          name="PRODUCT_NAME"
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
      </div>

      {props.handleCallback({ "PRODUCT_NAME" : ProductName, "QUANTITY": quantity })}
    </div>
  );
};
