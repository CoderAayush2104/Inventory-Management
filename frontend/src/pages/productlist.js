import React from "react";
import "./productlist.css";
import { product } from './../backup/pages/product';

export const Productlist = () => {
  return (
    <div className="productlist-page-container">
        <div className="horizontal-line"></div>
               
      <div className="productlist-left">
        <div className="gradient-box"></div>
        <div className="title-container">
            <p className="title">Stockify</p>
          </div>
          <div className="your-product-container">Your Products !!</div>

      </div>
      <div className="productlist-right">
        <div className="navbar-container">
            <div className = "navbar-item">Home</div>
            <div className = "navbar-item">Products</div>
            <div className = "navbar-item">Supplier</div>
            <div className = "navbar-item">Order</div>
            <div className = "navbar-item">Help</div>
        </div>
        <div className="welcome-container">
            <p className="welcome-msg">Welcome Back</p>
            <p className="welcome-name">Aayush !</p>
        </div>

      </div>
    </div>
  );
};
