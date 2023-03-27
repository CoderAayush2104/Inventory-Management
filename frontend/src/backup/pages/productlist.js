import React, { Component } from "react";
import { product as Product } from "./product";
import "./productlist.css";

export default class productlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      dataIsLoaded: false,
    };
  }
  componentDidMount() {
    
   
    fetch("https://misty-tank-top-crow.cyclic.app/api/products")
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
      <div>
        
        <div className="productlist-title">Product List</div>
        <div class="table-wrapper">
          <table class="fl-table">
            <thead>
              <tr className="title-row">
                <th className="value">PRODUCT ID</th>
                <th className="value">NAME</th>
                <th className="value">PRICE</th>
                <th className="value">PRESENT CAPACITY</th>
                <th className="value">MINIMUM CAPACITY</th>
                <th className="value">USER ID</th>
                <th className="value">SUPPLIER ID</th>
              </tr>
            </thead>
            <tbody>
              
              {items.map((item) => {
                return <Product
                pid={item.PRODUCT_ID}
                name={item.PRODUCT_NAME}
                price={item.SELLING_PRICE}
                present={item.PRESENT_QUANTITY}
                minimum={item.MIN_QUANTITY}
                uid={item.USER_ID}
                sid={item.SUPPLIER_ID}
              />
              })}
              {/* <Product
                pid={1}
                name={"Seeds"}
                price={20}
                present={20}
                minimum={5}
                uid={101}
                sid={201}
              />
              <Product
                pid={1}
                name={"Seeds"}
                price={20}
                present={20}
                minimum={5}
                uid={101}
                sid={201}
              />
              <Product
                pid={1}
                name={"Seeds"}
                price={20}
                present={20}
                minimum={5}
                uid={101}
                sid={201}
              />
              <Product
                pid={1}
                name={"Seeds"}
                price={20}
                present={20}
                minimum={5}
                uid={101}
                sid={201}
              />
              <Product
                pid={1}
                name={"Seeds"}
                price={20}
                present={20}
                minimum={5}
                uid={101}
                sid={201}
              />
              <Product
                pid={1}
                name={"Seeds"}
                price={20}
                present={20}
                minimum={5}
                uid={101}
                sid={201}
              /> */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
