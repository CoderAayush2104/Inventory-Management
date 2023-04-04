import React, { useState } from "react";
import "./billing.css";
import jwt_decode from "jwt-decode";

import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import { billProduct as BillProduct } from "../components/billProduct";

export const Billing = () => {
  const [PRODUCT_NAME, setPRODUCT_NAME] = useState("");
  const [CONTACT_NO, setCONTACT_NO] = useState("");
  const [CUSTOMER_NAME, setCUSTOMER_NAME] = useState("");
  const [inputList, setInputList] = useState([<BillProduct btnClick={addInput}/>]);
  function handleSubmit(event) {
    event.preventDefault();

    let data = {
      PRODUCT_NAME,
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
    setCONTACT_NO("");
    setCUSTOMER_NAME("");
    setPRODUCT_NAME("");
  }
 function addInput() {
    setInputList(inputList.concat(<BillProduct btnClick={addInput}/>));
 }
  return (
    <div>
      {JSON.parse(sessionStorage.getItem("login"))?.login ? (
        <div className="productlist-page-container">
          <div className="billing-horizontal-line"></div>

          <div className="productlist-left">
            <div className="gradient-box"></div>
            <div className="title-container">
              <p className="title">Stockify</p>
            </div>
            <div className="add-product-title-container">Billing</div>
            <div className="label-container">
              <div className="label">Contact Number</div>
              <div className="label">Customer Name</div>
              <div className="label">Product Name</div>
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
            <div className="billing-form-container">
              <form id="add-product-form" onSubmit={handleSubmit}>
                <div className="addproduct-input-container">
                  <div className="label">
                    <input
                      className="addproduct-input"
                      name="CONTACT_NO"
                      value={CONTACT_NO}
                      onChange={(e) => setCONTACT_NO(e.target.value)}
                    />
                  </div>
                  <div className="label">
                    <input
                      className="addproduct-input"
                      name="CUSTOMER_NAME"
                      value={CUSTOMER_NAME}
                      onChange={(e) => setCUSTOMER_NAME(e.target.value)}
                    />
                  </div>
                  
                  <div className='add-item-bill' onClick={addInput}><i class="fa-solid fa-cart-plus" style={{color: "#a27b5c"}}></i></div>
                  {inputList}
                  {/* <div className="label">
                <input
                  className="addproduct-input"
                  name="MIN_QUANTITY"
                  value={MIN_QUANTITY}
                  onChange={(e) => setMIN_QUANTITY(e.target.value)}
                />
              </div> */}
                </div>
                <div className="billling-horizontal-line total-line"></div>
                <div className="total">
                  <div className="total-label">Total Amount : &nbsp;&nbsp;</div>
                  <div className="total-display"></div></div>
                <button className="billing-button" type="submit">
                  Create Invoice
                </button>
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
