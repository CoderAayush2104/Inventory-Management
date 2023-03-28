import React, { Component } from 'react'
import "./productlist.css";

import { Product } from './Product';



export default class Productlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      dataIsLoaded: false,
    };
  }
  componentDidMount() {
    fetch("https://ochre-beetle-cape.cyclic.app/api/products")
      .then((data) => data.json())
      .then((json) => {
        this.setState({ items: json, dataIsLoaded: true });
      });
  }
  render() {
    const { dataIsLoaded, items } = this.state;
    
    if (!dataIsLoaded) {
      <div>
        <h1>Please wait some time.</h1>
      </div>;
    }
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
        <div className="welcome-container">
            <p className="welcome-msg">Welcome Back</p>
            <p className="welcome-name">Aayush !</p>
          </div>
          <div class="searchBox">
              <input class="searchInput"type="text" name="" placeholder="Search"/>
              <button class="searchButton" href="#" type="submit">
              <i class="fa-solid fa-magnifying-glass"></i>
              </button>
          </div>
          <div className="navbar-container">
            <div className="navbar-item">Home</div>
            <div className="navbar-item">Products</div>
            <div className="navbar-item">Supplier</div>
            <div className="navbar-item">Order</div>
            <div className="navbar-item last">Help</div>
          </div>
        
        </div>
        <div className="list-container">
          <div className="column-title">
            <div className="column-item">Product_ID</div>
            <div className="column-item">Product_Name</div>
            <div className="column-item">Present_Quantity</div>
            <div className="column-item">Minimum_Quantity</div>
            <div className="column-item ">Supplier_Name</div>
            <div className="column-item last">Price</div>
          </div>
          
          {items.map((item) => {
            
                return <Product
                p_id={item.PRODUCT_ID}
                p_name={item.PRODUCT_NAME}
                price={item.SELLING_PRICE}
                present={item.PRESENT_QUANTITY}
                minimum={item.MIN_QUANTITY}
                supplier_id={item.SUPPLIER_ID}
              />
              })}
          
        </div>
      </div>
    );
  }
}
