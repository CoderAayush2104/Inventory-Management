import React, { Component } from "react";
import "./addOrder.css";
import jwt_decode from "jwt-decode";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";

export const AddOrder = () => {

  const [PRODUCT_NAME, setPRODUCT_NAME] = useState("");
  const [SUPPLIER_NAME, setSUPPLIER_NAME] = useState("");

  const [QUANTITY, setQUANTITY] = useState("");



  function handleSubmit(event) {
    event.preventDefault();

    let data = {
    
      PRODUCT_NAME,
      SUPPLIER_NAME,
      QUANTITY,
    };

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
      .then((result)=> {
        return (fetch("https://ochre-beetle-cape.cyclic.app/api/products/update-product",{
          method : "PATCH",
          headers : {
            Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
            "Content-Type":"application/json"
          },
          body : JSON.stringify(result),  
      
        }))
        
      })
      .then((resp) => console.log(resp.json()))
      .catch((error) => console.log(error));

    setPRODUCT_NAME("");
    setSUPPLIER_NAME("");
    setQUANTITY("");
  }
  return (
    <div>
      {JSON.parse(sessionStorage.getItem("login"))?.login ? (
        <div className="productlist-page-container">
          <div className="horizontal-line"></div>

          <div className="addorder-left">
            <div className="add-order-title-container">History</div>
            <div className="gradient-box"></div>
            <div className="title-container">
              <p className="title">Stockify</p>
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
              <form id="add-product-form" onSubmit={handleSubmit}>
                <button className="placeorder-button" type="submit">
                  Place Order
                </button>
        
                <div className="input-container">
                  <div className="label">Product Name</div>
                  <div className="label">
                    <input
                      className="addproduct-input"
                      type="text"
                      name="PRODUCT_NAME"
                      value={PRODUCT_NAME}
                      onChange={(e) => setPRODUCT_NAME(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="label">Supplier Name</div>
                  <div className="label">
                    <input
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
