import React, { Component, useEffect, useRef } from "react";
import "./addOrder.css";
import jwt_decode from "jwt-decode";
import { listLoader as ListLoader } from "../components/listLoader";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import { OrderRow } from "../components/orderRow";
import { Product } from "./../components/Product";

const specificElement = document.getElementById("autocomplete");
export const AddOrder = () => {
  const [PRODUCT_NAME, setPRODUCT_NAME] = useState("");
  const [SUPPLIER_NAME, setSUPPLIER_NAME] = useState("");
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [QUANTITY, setQUANTITY] = useState("");
  const ProductsDropdown = [];
  const [products, setProducts] = useState();
  const [items, setItems] = useState();

  const match = useRef();
  // const [matchingProducts, setMatchingProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    fetch("https://ochre-beetle-cape.cyclic.app/api/orders", {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
      },
    })
      .then((data) => data.json())
      .then((json) => {
        setDataIsLoaded(true);
        setItems(json);
      });

    fetch("https://ochre-beetle-cape.cyclic.app/api/products", {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
      },
    })
      .then((data) => data.json())
      .then((json) => {
        json.forEach((element, index) => {
          ProductsDropdown[index] = element.PRODUCT_NAME;
        });
        setProducts(ProductsDropdown);
      })

      .catch((error) => console.log(error));
  }, []);

  //Managing Dropdown
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
    setPRODUCT_NAME(value);

    const matching = products.filter((product) =>
      product.toLowerCase().startsWith(value.toLowerCase())
    );
    match.current = matching;
    setActiveIndex(-1);
  }

  function handleListItemClick(product) {
    setPRODUCT_NAME(product);
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
      console.log(match.current[activeIndex]);
      if (activeIndex !== -1) {
        setPRODUCT_NAME(match.current[activeIndex]);
        match.current = [];
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    let data = {
      PRODUCT_NAME,
      SUPPLIER_NAME,
      QUANTITY,
    };
    console.log(data);
    fetch("https://ochre-beetle-cape.cyclic.app/api/orders", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        // return fetch(
        //   "https://ochre-beetle-cape.cyclic.app/api/products/update-product",
        //   {
        //     method: "PATCH",
        //     headers: {
        //       Authorization:
        //         "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(result),
        //   }
        // );
      })
      // .then((resp) => console.log(resp.json()))
      .catch((error) => console.log(error));

    setPRODUCT_NAME("");
    setSUPPLIER_NAME("");
    setQUANTITY("");
  }
  return (
    <div>
      {JSON.parse(sessionStorage.getItem("login"))?.login && jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin" ? (
        <div className="productlist-page-container">
          <div className="horizontal-line"></div>

          <div className="addorder-left">
            <div className="add-order-title-container">History</div>
            <div className="gradient-box"></div>
            <div className="title-container">
              <p className="title">Stockify</p>
            </div>
            <div className="order-table-container">
              <div className="ordercolumn-title-background">
                <div className="ordercolumn-title">
                  <div className="ordercolumn-item">Date</div>
                  <div className="ordercolumn-item">Product</div>
                  <div className="ordercolumn-item">Quantity</div>
                </div>
              </div>

              {!dataIsLoaded ? (
                <ListLoader />
              ) : (
                items.map((item) => {
                  return (
                    <OrderRow
                      date={JSON.stringify(item.DATE).slice(1, 11)}
                      product={item.PRODUCT_NAME}
                      quantity={item.QUANTITY}
                    />
                  );
                })
              )}
            </div>
          </div>

          <div className="addorder-right">
            <div className="welcome-container-addproduct">
              <p className="welcome-msg">Welcome Back</p>
              <p className="welcome-name">
                {
                  jwt_decode(JSON.parse(sessionStorage.getItem("login"))?.token)
                    ?.result.user_id
                }{" "}
                !
              </p>
            </div>

            <Navbar />
            <div className="add-order-title-container">Place your Order</div>

            <div className="place-order-form-container">
              <form
                id="add-product-form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <button className="placeorder-button" type="submit">
                  Place Order
                </button>

                <div className="input-container">
                  <div className="label">Product Name</div>

                  <div className="label">
                    <input
                      required
                      className="addproduct-input"
                      name="PRODUCT_NAME"
                      id="autocomplete"
                      value={PRODUCT_NAME}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                    <ul
                      className={
                        visibility
                          ? "autocomplete-results"
                          : "autocomplete-results hide"
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
                </div>

                <div className="input-container">
                  <div className="label">Supplier Name</div>
                  <div className="label">
                    <input
                      required
                      className="addproduct-input"
                      type="text"
                      name="SUPPLIER_NAME"
                      value={SUPPLIER_NAME}
                      onChange={(e) => setSUPPLIER_NAME(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="label">Quantity</div>
                  <div className="label">
                    <input
                      required
                      className="addproduct-input"
                      name="QUANTITY"
                      type="number"
                      value={QUANTITY}
                      onChange={(e) => setQUANTITY(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/signIn" replace />
      )}
    </div>
  );
};
