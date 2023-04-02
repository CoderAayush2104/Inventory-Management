import React, { Component } from "react";
import "./orderlist.css";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "../components/Navbar";
import { listLoader as ListLoader } from "../components/listLoader";

import { Order } from "../components/Order"

export default class Orderlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      dataIsLoaded: false,
   
    };
  }

  componentDidMount() {
    if(sessionStorage.length !== 0){
     
      fetch("https://ochre-beetle-cape.cyclic.app/api/orders",{
        headers : {
          "Authorization" : "Bearer " + JSON.parse(sessionStorage.getItem("login")).token
        }
      })
        .then((data) => data.json())
        .then((json) => {
          this.setState({ items: json, dataIsLoaded: true });
        });
    }
    
  }

  displayList = (event) => {
    fetch(
      `https://ochre-beetle-cape.cyclic.app/api/orders/`,{
        headers : {
          "Authorization" : "Bearer " + JSON.parse(sessionStorage.getItem("login")).token
        }
      }
    )
      .then((data) => data.json())
      .then((json) => {
        this.setState({ items: json });
      });
  };
  render() {
    const { dataIsLoaded, items } = this.state;
    return (
      <div>
        {JSON.parse(sessionStorage.getItem("login"))?.login ? (
          <div className="productlist-page-container">
            <div className="horizontal-line"></div>
            <div className="productlist-left">
              <div className="gradient-box"></div>
              <div className="title-container">
                <p className="title">Stockify</p>
              </div>
              <div className="your-product-container">Your Orders !!</div>
            </div>

            <div className="productlist-right">
              <div className="welcome-container">
                <p className="welcome-msg">Welcome Back</p>
                <p className="welcome-name">{jwt_decode( JSON.parse(sessionStorage.getItem("login"))?.token)?.result.user_id} !</p>
              </div>
              <div class="searchBox">
                <input
                  class="searchInput"
                  type="search"
                  name=""
                  placeholder="Search"
                  onChange={this.displayList}
                />
                <button class="searchButton">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <Navbar />
            </div>
            <div className="list-container">
              <div className="orderlist-column-title">
                <div className="column-item">Order ID</div>
                <div className="column-item">Product Name</div>
                <div className="column-item">Supplier Name</div>
                <div className="column-item">Date</div>
                <div className="column-item last">Quantity</div>
              </div>
              {!dataIsLoaded ? (
                <ListLoader />
              ) : (
                items.map((item) => {
                  
                  return (
                    
                    <Order
                      order_id={item.ORDER_ID}
                      product_name={item.PRODUCT_NAME}
                      supplier_name={item.NAME}
                      date={JSON.stringify(item.DATE).slice(1,11)}
                      quantity={item.QUANTITY}
              
                    />
                  );
                })
              )}
            </div>
          </div>
        ) : (
          <Navigate to="/signIn" replace />
        )}
      </div>
    );
  }
}
