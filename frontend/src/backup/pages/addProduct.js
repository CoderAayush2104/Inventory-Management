import React, { Component } from "react";
import "./addProduct.css";

export default class addProduct extends Component {
  render() {
    function submit() {
      alert("Product added successfully!!");
    }
    return (
      <div className="addProduct">
        <div className="add-title">
          <h1>Add Product</h1>
        </div>

        <div className="grid-container">
          <form onSubmit={submit} id="add-form">
            <div className="input-container">
              <span>
                <input
                  className="basic-slide"
                  required
                  id="name"
                  type="text"
                  placeholder="Your best name"
                />
                <label for="name">Name</label>
              </span>
            </div>
            <div className="input-container">
              <span>
                <input
                  className="basic-slide"
                  required
                  id="name"
                  type="text"
                  placeholder="Your best name"
                />
                <label for="name">Name</label>
              </span>
            </div>
            <div className="input-container">
              <span>
                <input
                  className="basic-slide"
                  required
                  id="name"
                  type="text"
                  placeholder="Your best name"
                />
                <label for="name">Name</label>
              </span>
            </div>
            <div className="input-container">
              <span>
                <input
                  className="basic-slide"
                  required
                  id="name"
                  type="text"
                  placeholder="Your best name"
                />
                <label for="name">Name</label>
              </span>
            </div>
            <div className="input-container">
              <span>
                <input
                  className="basic-slide"
                  required
                  id="name"
                  type="text"
                  placeholder="Your best name"
                />
                <label for="name">Name</label>
              </span>
            </div>
            <div className="input-container">
              <span>
                <input
                  className="basic-slide"
                  required
                  id="name"
                  type="text"
                  placeholder="Your best name"
                />
                <label for="name">Name</label>
              </span>
            </div>
            <div className="input-container">
              <span>
                <input
                  className="basic-slide"
                  required
                  id="name"
                  type="text"
                  placeholder="Your best name"
                />
                <label for="name">Name</label>
              </span>
            </div>

            <div className="add-product-button-container">
              <button class="add-product-button" type="submit">
                <span class="text">Add Product</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
