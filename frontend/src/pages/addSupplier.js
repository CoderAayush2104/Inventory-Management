import React, { Component } from "react";
import "./addSupplier.css";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import { Supplier } from "./../components/supplier";

export const AddSupplier = () => {
  // const [PRODUCT_ID, setPRODUCT_ID] = useState("");
  const [NAME, setNAME] = useState("");
  const [CONTACT_NO, setCONTACT_NO] = useState("");
  const [EmailID, setEmailID] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    let data = {
      CONTACT_NO,
      NAME,
      EmailID,
    };
    console.log(data);
    fetch("https://ochre-beetle-cape.cyclic.app/api/suppliers", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        result.json().then((resp) => {
          console.log(resp);
        });
      })
      .catch((error) => console.log(error));

    setNAME("");
    setCONTACT_NO("");
    setEmailID("");
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
            <div className="add-product-title-container">Add Supplier</div>
            <div className="label-container">
              <div className="label">Supplier Name</div>
              <div className="label">Contact No.</div>
              <div className="label">Email</div>
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
                  Add Supplier
                </button>
                <div className="addproduct-input-container">
                  <div className="label">
                    <input
                      className="addproduct-input"
                      name="NAME"
                      value={NAME}
                      onChange={(e) => setNAME(e.target.value)}
                    />
                  </div>
                  <div className="label">
                    <input
                      className="addproduct-input"
                      type="tel"
                      name="CONTACT_NO"
                      value={CONTACT_NO}
                      onChange={(e) => setCONTACT_NO(e.target.value)}
                    />
                  </div>
                  <div className="label">
                    <input
                      className="addproduct-input"
                      type="text"
                      name="EmailID"
                      value={EmailID}
                      onChange={(e) => setEmailID(e.target.value)}
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
