import React from "react";
import Navbar from "../components/Navbar";
import { NavLink, Navigate } from "react-router-dom";
import "./home.css";
import jwt_decode from "jwt-decode";

export const home = () => {
  console.log(jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
  .ROLE)
  return (
    <div>
      {JSON.parse(sessionStorage.getItem("login"))?.login ? (
        <div className="home-page">
          <div className="home-main">
            <div className="home-header">
              <div className="title-container">
                <p className="title">Stockify</p>
              </div>
              <Navbar />
              <div class={jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin" ? "ag-format-container" : "ag-format-container user"}>
                <div class="ag-courses_box">
                  <div class="ag-courses_item">
                    <NavLink
                      to="../productlist"
                      className="ag-courses-item_link"
                    >
                      <div class="ag-courses-item_bg"></div>
                      <img
                        src={require("../assets/all_products.png")}
                        className="home-card-image"
                      />
                      <div class="ag-courses-item_date-box">
                        <span class="ag-courses-item_date">All Products</span>
                      </div>
                    </NavLink>
                  </div>
                  <div class={jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin" ? "ag-courses_item" : "hide"}>
                    <NavLink
                      to="../addProduct"
                      className="ag-courses-item_link"
                    >
                      <div class="ag-courses-item_bg"></div>
                      <img
                        src={require("../assets/add_product.png")}
                        className="home-card-image"
                      />
                      <div class="ag-courses-item_date-box">
                        <span class="ag-courses-item_date">Add Product</span>
                      </div>
                    </NavLink>
                  </div>
                  <div class={jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin" ? "ag-courses_item" : "hide"}>
                    <NavLink to="../orderlist" className="ag-courses-item_link">
                      <div class="ag-courses-item_bg"></div>
                      <img
                        src={require("../assets/your_order.png")}
                        className="home-card-image"
                      />
                      <div class="ag-courses-item_date-box">
                        <span class="ag-courses-item_date">Your Orders</span>
                      </div>
                    </NavLink>
                  </div>
                  <div class={jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin" ? "ag-courses_item" : "hide"}>
                    <NavLink to="../addOrder" className="ag-courses-item_link">
                      <div class="ag-courses-item_bg"></div>
                      <img
                        src={require("../assets/place_order.png")}
                        className="home-card-image"
                      />
                      <div class="ag-courses-item_date-box">
                        <span class="ag-courses-item_date">Place Order</span>
                      </div>
                    </NavLink>
                  </div>
                  <div class="ag-courses_item">
                    <NavLink to="../billing" className="ag-courses-item_link">
                      <div class="ag-courses-item_bg"></div>
                      <img
                        src={require("../assets/billing.png")}
                        className="home-card-image"
                      />
                      <div class="ag-courses-item_date-box">
                        <span class="ag-courses-item_date">Billing</span>
                      </div>
                    </NavLink>
                  </div>
                  <div class={jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin" ? "ag-courses_item" : "hide"}>
                    <NavLink
                      to="../supplierList"
                      className="ag-courses-item_link"
                    >
                      <div class="ag-courses-item_bg"></div>
                      <img
                        src={require("../assets/suppliers.png")}
                        className="home-card-image"
                      />
                      <div class="ag-courses-item_date-box">
                        <span class="ag-courses-item_date">Suppliers</span>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-footer">
            Made with &nbsp;{" "}
            <i
              class="fa-solid fa-heart heart"
              style={{ color: " #ff0000" }}
            ></i>
            &nbsp; in Sem 4{" "}
          </div>
        </div>
      ) : (
        <Navigate to="/signIn" replace />
      )}
    </div>
  );
};
