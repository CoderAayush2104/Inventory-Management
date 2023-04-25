import React, { Component } from "react";
import "./addProduct.css";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";

export const AddProduct = () => {
  const [PRODUCT_NAME, setPRODUCT_NAME] = useState("");
  const [MIN_QUANTITY, setMIN_QUANTITY] = useState("");
  const [PRESENT_QUANTITY, setPRESENT_QUANTITY] = useState("");
  const [SUPPLIER_ID, setSUPPLIER_ID] = useState("");
  const [SELLING_PRICE, setSELLING_PRICE] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    let data = {
      PRODUCT_NAME,
      MIN_QUANTITY,
      PRESENT_QUANTITY,
      SUPPLIER_ID,
      SELLING_PRICE,
    };
    console.log(data);
    fetch("https://ochre-beetle-cape.cyclic.app/api/products", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,

        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((resp) => {
        if (resp.success) {
        }
      });
    });

    setPRODUCT_NAME("");
    setMIN_QUANTITY("");
    setPRESENT_QUANTITY("");
    setSELLING_PRICE("");
    setSUPPLIER_ID("");
  }
  return (
    <div>
      {JSON.parse(sessionStorage.getItem("login"))?.login &&
      jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin" ? (
        <div className="productlist-page-container">
          <div className="horizontal-line"></div>

          <div className="productlist-left">
            <div className="gradient-box"></div>
            <div className="title-container">
              <p className="title">Stockify</p>
            </div>
            <div className="add-product-title-container">Add Your Product</div>
            <div className="label-container">
              <div className="label">Product Name</div>
              <div className="label">Present Quantity</div>
              <div className="label">Minimum Quantity</div>
              <div className="label">Supplier Id</div>
              <div className="label">Selling Price</div>
            </div>
          </div>

          <div className="productlist-right">
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
            <div className="addproduct-form-container">
              <form id="add-product-form" onSubmit={handleSubmit}>
                <button className="addproduct-button" type="submit">
                  Add Product
                </button>
                <div className="addproduct-input-container">
                  <div className="label">
                    <input
                    required
                      className="addproduct-input"
                      name="PRODUCT_NAME"
                      value={PRODUCT_NAME}
                      onChange={(e) => setPRODUCT_NAME(e.target.value)}
                    />
                  </div>
                  <div className="label">
                    <input
                    required
                      className="addproduct-input"
                      name="PRESENT_QUANTITY"
                      value={PRESENT_QUANTITY}
                      onChange={(e) => setPRESENT_QUANTITY(e.target.value)}
                    />
                  </div>
                  <div className="label">
                    <input
                    required
                      className="addproduct-input"
                      name="MIN_QUANTITY"
                      value={MIN_QUANTITY}
                      onChange={(e) => setMIN_QUANTITY(e.target.value)}
                    />
                  </div>
                  <div className="label">
                    <input
                    required
                      className="addproduct-input"
                      name="SUPPLIER_ID"
                      type="number"
                      value={SUPPLIER_ID}
                      onChange={(e) => setSUPPLIER_ID(e.target.value)}
                    />
                  </div>
                  <div className="label">
                    <input
                    required
                      className="addproduct-input"
                      name="SELLING_PRICE"
                      value={SELLING_PRICE}
                      onChange={(e) => setSELLING_PRICE(e.target.value)}
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
