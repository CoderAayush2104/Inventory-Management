import React from "react";
import "./addProduct.css";

export const AddProduct = () => {
  return (
    <div className="productlist-page-container">
      <div className="horizontal-line"></div>

      <div className="productlist-left">
        <div className="gradient-box"></div>
        <div className="title-container">
          <p className="title">Stockify</p>
        </div>
        <div className="add-product-title-container">Add Your Product</div>
        <div className="label-container">
          <div className="label">Product Id</div>
          <div className="label">Product Name</div>
          <div className="label">Present Quantity</div>
          <div className="label">Minimum Quantity</div>
          <div className="label">Supplier Name</div>
          <div className="label">Selling Price</div>
        </div>
      </div>

      <div className="productlist-right">
        <div className="welcome-container-addproduct">
          <p className="welcome-msg">Welcome Back</p>
          <p className="welcome-name">Aayush !</p>
        </div>

        <div className="navbar-container">
          <div className="navbar-item">Home</div>
          <div className="navbar-item">Products</div>
          <div className="navbar-item">Supplier</div>
          <div className="navbar-item">Order</div>
          <div className="navbar-item last">Help</div>
        </div>
        <div className="addproduct-form-container">
          <form id="add-product-form">
            <button className="addproduct-button">Add Product</button>
            <div className="addproduct-input-container">
              <div className="label">
                <input className="addproduct-input" />
              </div>
              <div className="label">
                <input className="addproduct-input" />
              </div>
              <div className="label">
                <input className="addproduct-input" />
              </div>
              <div className="label">
                <input className="addproduct-input" />
              </div>
              <div className="label">
                <input className="addproduct-input" />
              </div>
              <div className="label">
                <input className="addproduct-input" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
