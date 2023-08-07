import React, { Component } from "react";
import "../styles/supplierlist.css";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "../components/Navbar";
import { listLoader as ListLoader } from "../components/listLoader";


import { Supplier } from './../components/supplier';

export default class Supplierlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      dataIsLoaded: false,
    };
  }

  componentDidMount() {
    if(sessionStorage.length !== 0){
      fetch("https://ochre-beetle-cape.cyclic.app/api/suppliers",{
        headers : {
          "Authorization" : "Bearer " + JSON.parse(sessionStorage.getItem("login")).token
        }
      })
        .then((data) => data.json())
        .then((json) => {
          this.setState({ items: json.data, dataIsLoaded: true });
        });
    }
  }

  displayList = (event) => {
    fetch(
      `https://ochre-beetle-cape.cyclic.app/api/suppliers/${event.target.value}`,{
        headers : {
          "Authorization" : "Bearer " + JSON.parse(sessionStorage.getItem("login")).token
        }
      }
    )
      .then((data) => data.json())
      .then((json) => {
        this.setState({ items: json.data });
      });
  };
  render() {
    const { dataIsLoaded, items } = this.state;

    return (
      <div>
        {JSON.parse(sessionStorage.getItem("login"))?.login && jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin"? (
          <div className="productlist-page-container">
            <div className="horizontal-line"></div>
            <div className="productlist-left">
              <div className="gradient-box"></div>
              <div className="title-container">
                <p className="title">Stockify</p>
              </div>
              <div className="your-product-container">Your Suppliers !!</div>
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
              <div className="supplierlist-column-title">
                <div className="column-item">Supplier ID</div>
                
                <div className="column-item">Supplier Name</div>
                <div className="column-item">Contact No.</div>
            
                <div className="column-item last">Email</div>
              </div>
              {!dataIsLoaded ? (
                <ListLoader />
              ) : (
  
                items.map((item) => {
                  return (
                    <Supplier
                      supplier_id={item.supplier_id}
                      contact_no={item.CONTACT_NO}
                      supplier_name={item.NAME}
                      email={item.EmailID}
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
