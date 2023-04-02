import React, { Component } from "react";
import "./addOrder.css";
import jwt_decode from "jwt-decode";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";

export const AddOrder = () => {
  const [ORDER_ID, setORDER_ID] = useState("");
  const [PRODUCT_ID, setPRODUCT_ID] = useState("");
  const [SUPPLIER_ID, setSUPPLIER_ID] = useState("");
  const [DATE, setDATE] = useState("");
  const [QUANTITY, setQUANTITY] = useState("");

  const USER_ID = JSON.parse(sessionStorage.getItem("login"))?.token;

  function handleSubmit(event) {
    event.preventDefault();

    let data = {
      ORDER_ID,
      PRODUCT_ID,
      SUPPLIER_ID,
      DATE,
      QUANTITY,
      USER_ID,
    };
    console.log(data);
    fetch("https://ochre-beetle-cape.cyclic.app/api/products", {
      method: "POST",
      headers: {
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
    setORDER_ID("");
    setPRODUCT_ID("");
    setSUPPLIER_ID("");
    setDATE("");
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
              <button className="placeorder-button" type="submit">
                Place Order
              </button>
              <form id="add-product-form" onSubmit={handleSubmit}>
                <div className="input-container">
                  <div className="label">Order Id</div>
                  <div className="label">
                    <input
                      className="addproduct-input"
                      name="ORDER_ID"
                      type="number"
                      value={ORDER_ID}
                      onChange={(e) => setORDER_ID(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="label">Product Id</div>
                  <div className="label">
                    <input
                      className="addproduct-input"
                      type="number"
                      name="PRODUCT_ID"
                      value={PRODUCT_ID}
                      onChange={(e) => setPRODUCT_ID(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="label">Supplier Id</div>
                  <div className="label">
                    <input
                      className="addproduct-input"
                      type="number"
                      name="SUPPLIER_ID"
                      value={SUPPLIER_ID}
                      onChange={(e) => setSUPPLIER_ID(e.target.value)}
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
