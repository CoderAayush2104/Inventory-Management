import React, { Component } from "react";
import "./billingHistory.css";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "../components/Navbar";
import { listLoader as ListLoader } from "../components/listLoader";
import { BillRow } from "../components/billRow";




export default class BillingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      dataIsLoaded: false,

    };
  }
  
  componentDidMount() {
    if(sessionStorage.length !== 0){
      
      fetch("https://ochre-beetle-cape.cyclic.app/api/products",{
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

//   displayList = (event) => {
//     fetch(
//       `https://ochre-beetle-cape.cyclic.app/api/products/${event.target.value}`,{
//         headers : {
//           "Authorization" : "Bearer " + JSON.parse(sessionStorage.getItem("login")).token
//         }
//       }
//     )
//       .then((data) => data.json())
//       .then((json) => {
//         this.setState({ items: json });
//       });
//   };
  render() {
    const { dataIsLoaded, items } = this.state;
    return (
      <div>
        {JSON.parse(sessionStorage.getItem("login"))?.login ? (
          <div className="productlist-page-container">
            <Navbar />
            
            <div className="horizontal-line"></div>
            <div className="bill-table-container">
              <div className="billcolumn-title">
                <div className="column-item">Customer Name</div>
                <div className="column-item">Phone Number</div>
                <div className="column-item">Products</div>
                <div className="column-item">Quantity</div>
                <div className="column-item ">Price</div>
                <div className="column-item last">Amount</div>
              </div>
              {!dataIsLoaded ? (
                
                <ListLoader />
            
              ) : (
                items.map((item) => {
                  return (
                    
                    <BillRow
                      p_id={item.PRODUCT_ID}
                      p_name={item.PRODUCT_NAME}
                      price={item.SELLING_PRICE}
                      present={item.PRESENT_QUANTITY}
                      minimum={item.MIN_QUANTITY}
                      supplier_name={item.NAME}
                    />
               
                  );
                }
                
                )
              )}
            </div>
            <div className="productlist-left">
              <div className="gradient-box"></div>
              <div className="title-container">
                <p className="title">Stockify</p>
              </div>
              <div className="billinghistory-heading">Billing History</div>
            </div>

            <div className="productlist-right">
              <div className="welcome-container">
                <p className="welcome-msg">Welcome Back</p>
                <p className="welcome-name">{jwt_decode( JSON.parse(sessionStorage.getItem("login"))?.token)?.result.user_id} !</p>
              </div>
            </div>
          </div>
        ) : (
          <Navigate to="/signIn" replace />
        )}
      </div>
    );
  }
}
