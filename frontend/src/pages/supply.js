

import React, { Component } from "react";
import "./supply.css";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "../components/Navbar";
import { listLoader as ListLoader } from "../components/listLoader";

import { SupplyRow } from "../components/supplyRow";


//This page is JUST for Dummy implementation
export default class Supply extends Component {
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
              </div>
              <div class="searchBox">
                <input
                  class="searchInput"
                  type="search"
                  name=""
                  placeholder="Search"
                  // onChange={this.displayList}
                />
                <button class="searchButton">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <Navbar />
            </div>
            <div className="list-container">
              <div className="supplylist-column-title">
                <div className="column-item">Order ID</div>
                <div className="column-item">Product Name</div>
                <div className="column-item">User Name</div>
                <div className="column-item">Date</div>
                <div className="column-item">Quantity</div>
                <div className="column-item last">Status</div>
              
              </div>
              {!dataIsLoaded ? (
                <ListLoader />
              ) : (
                items.map((item) => {
                  if(item.STATUS === 0){
                    return (
                      <SupplyRow
                        order_id={item.ORDER_ID}
                        product_name={item.PRODUCT_NAME}
                        supplier_name={item.NAME}
                        date={JSON.stringify(item.DATE).slice(1,11)}
                        quantity={item.QUANTITY}
                        user_id={item.USER_ID}
                        // status={item.STATUS}
                      />
                    );
                  }
                  
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

