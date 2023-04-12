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
    if (sessionStorage.length !== 0) {
      fetch("https://ochre-beetle-cape.cyclic.app/api/bills", {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
        },
      })
        .then((data) => data.json())
        .then((json) => {
          console.log(json)
          this.setState({ items: json, dataIsLoaded: true });
        })
       
        .catch((error)=>console.log(error));

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
              <div className="billcolumn-title-background">
                <div className="billcolumn-title">
                  <div className="billcolumn-item">Customer Name</div>
                  <div className="billcolumn-item">Phone Number</div>
                  <div className="billcolumn-item">Products</div>
                  <div className="billcolumn-item">Quantity</div>
                  <div className="billcolumn-item">Price</div>
                  <div className="billcolumn-item ">Date</div>
                  <div className="billcolumn-item last">Amount</div>
                </div>
              </div>

              {!dataIsLoaded ? (
                <ListLoader />
              ) : (
                items.map((item) => {
                  let arr1 = [];
                  let arr2 = [];
                  let arr3 = [];
                  item.billItems.forEach((element,index)=> {
                    arr1[index]= element.PRODUCT_NAME
                    arr2[index] = element.QUANTITY
                    arr3[index] = element.SELLING_PRICE
                  });
                  return (
                    <BillRow
                      name={item.CUST_NAME}
                      contact={item.CUST_CONTACT}
                      date={JSON.stringify(item.DATE).slice(1,11)}
                      products={arr1}
                      quantity={arr2}
                      prices={arr3}
                      amount={item.TOTAL_AMOUNT}
                    />
                  );
                })
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
                <p className="welcome-name">
                  {
                    jwt_decode(
                      JSON.parse(sessionStorage.getItem("login"))?.token
                    )?.result.user_id
                  }{" "}
                  !
                </p>
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
