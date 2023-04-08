import React, { useEffect, useState } from "react";
import "./billing.css";
import jwt_decode from "jwt-decode";

import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import { BillProduct } from "../components/billProduct";


const Products = ["Pen", "Pencil", "Notebook", "Marker", "Crayon", "Scale"];

const specificElement = document.getElementById("autocomplete");

export const Billing = () => {
  
 
  const [ProductName,setProductName] = useState("");
  const [quantity,setQuantity] = useState("")
  const [billItems, setbillItems] = useState([]);
  const [CUST_CONTACT, setCUST_CONTACT] = useState("");
  const [CUST_NAME, setCUST_NAME] = useState("");
  const [inputList, setInputList] = useState([]);
  const [amount,setAmount] = useState("");
  const [stateChangeObject,setStateChangeObject] = useState({func : () => {console.log("Hello")}})

  const [matchingProducts, setMatchingProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [visibility, setVisibility] = useState(false);

 
  // console.log("outside submit");
  // console.log(billItems);
  // console.log(inputList)

  

  //This is reference to child clearState function
  

  //Method to assign child clearState function to parent reference
  function assignClearChildState ( childClearStateFunc){
    setStateChangeObject({func : childClearStateFunc})
  }
  
  //This function will be used to reset state on click of child component
  function resetState(){
    stateChangeObject.func();
    
  }

  
  //Function to access Child Data
  function Callback(ChildData) {
    setbillItems(billItems.concat(ChildData));
  }

  //Function to clear states
  function clearBill() {
    handleClick();
    setCUST_CONTACT("");
    setCUST_NAME("");
    setbillItems((billItems) => billItems = []) ;
    setInputList((inputList) => inputList = []);
    setProductName("")
    setQuantity("")
    setAmount("")
 
    //Clear state of child component
    resetState();
  }

  function handleSubmit(event) {
    event.preventDefault();

    let data = {
      CUST_CONTACT,
      CUST_NAME,
      billItems,
    };

    console.log(data);
    fetch("https://ochre-beetle-cape.cyclic.app/api/bills", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data.TOTAL_AMOUNT)
        setAmount(data.TOTAL_AMOUNT);
      })
      .catch((error) => {
        console.log(error);
        alert("Unexpected Error Occured.\n Please try again.");
      })

  }
  function addInput() {
    console.log(billItems.length)
    if(ProductName === "" || quantity === ""){
      alert("Add details of first product to proceed");
      return;
    }
    if(!billItems.length){
      billItems[0] = {"PRODUCT_NAME" : ProductName ,"QUANTITY" : quantity}
    }
      setInputList(
        inputList.concat(
          <BillProduct btnClick={addInput} handleCallback={Callback} passClearStateFunc={assignClearChildState}/>
        )
      );
    
    }
    const handleClick = (event) => {
        return (
          <h1>Entered Invoice</h1>
        );
      }
  
    //Manage Dropdown
    document?.addEventListener("click", function (event) {
      const isClickInside = specificElement?.contains(event.target);
      if (!isClickInside) {
        // The click occurred outside of the specific element
        setMatchingProducts([]);
        setVisibility(false);
      }
    });
  
    function handleInputChange(event) {
      setVisibility(true);
      const value = event.target.value;
      setProductName(value);
  
      const matching = Products.filter((product) =>
        product.toLowerCase().startsWith(value.toLowerCase())
      );
      setMatchingProducts(matching);
      setActiveIndex(-1);
    }
  
    function handleListItemClick(product) {
      setProductName(product);
      setMatchingProducts([]);
    }
  
    function handleKeyDown(event) {
      if (event.keyCode === 40) {
        // Arrow down
        setActiveIndex((prevIndex) => {
          if (prevIndex === matchingProducts.length - 1) {
            return 0;
          } else {
            return prevIndex + 1;
          }
        });
      } else if (event.keyCode === 38) {
        // Arrow up
        setActiveIndex((prevIndex) => {
          if (prevIndex === 0) {
            return matchingProducts.length - 1;
          } else {
            return prevIndex - 1;
          }
        });
      } else if (event.keyCode === 13) {
        // Enter
        if (activeIndex !== -1) {
          setProductName(matchingProducts[activeIndex]);
          setMatchingProducts([]);
        }
      }
    }
  
  return (
    <div>
      {JSON.parse(sessionStorage.getItem("login"))?.login ? (
        <div className="productlist-page-container">
          <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">User Data</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Amount</th>
                     
                    </tr>
                  </thead>
                  <tbody>{handleClick}</tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
          <div className="billing-horizontal-line"></div>

          <div className="productlist-left">
            <div className="gradient-box"></div>
            <div className="title-container">
              <p className="title">Stockify</p>
            </div>
            <div className="add-product-title-container">Billing</div>
            <div className="label-container">
              <div className="label">Contact Number</div>
              <div className="label">Customer Name</div>
              <div className="label">Product Name</div>
            </div>
          </div>

          <div className="productlist-right">
            <div className="welcome-container-addproduct">
              <p className="welcome-msg">Welcome Back</p>
              <p className="welcome-name">
                {
                  jwt_decode(JSON.parse(sessionStorage.getItem("login"))?.token)
                    ?.result.user_id
                }{" "}
                !
              </p>
            </div>

            <Navbar />
            <div className="billing-form-container">
              <form id="add-product-form" onSubmit={handleSubmit} autoComplete="off">
                <div className="addproduct-input-container">
                  <div className="label">
                    <input
                    required
                      className="addproduct-input"
                      name="CUST_CONTACT"
                      value={CUST_CONTACT}
                      onChange={(e) => setCUST_CONTACT(e.target.value)}
                    />
                  </div>
                  <div className="label">
                    <input
                    required
                      className="addproduct-input"
                      name="CUST_NAME"
                      value={CUST_NAME}
                      onChange={(e) => setCUST_NAME(e.target.value)}
                    />
                  </div>

                  <div className="add-item-bill" onClick={addInput}>
                    <i
                      class="fa-solid fa-cart-plus"
                      style={{ color: "#a27b5c" }}
                    ></i>
                  </div>
                  <div className='billproduct-container'>
        <div className='bill-label'><input
          required
          className="addproduct-input"
          name="PRODUCT_NAME"
          id="autocomplete"
          value={ProductName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <ul
          className={
            visibility ? "autocomplete-results" : "autocomplete-results hide"
          }
        >
          {matchingProducts.map((product, index) => (
            <li
              key={product}
              className={index === activeIndex ? "active" : ""}
              onClick={() => handleListItemClick(product)}
            >
              {product}
            </li>
          ))}
        </ul></div>
        <div className='bill-label'>Quantity</div>
        <div className='bill-label quantity'>  <input
        required
                  className="addproduct-input"
                  name="PRODUCT_NAME"
                  type='number'
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                /></div>
    </div>
                  {inputList}
                  {/* <div className="label">
                <input
                  className="addproduct-input"
                  name="MIN_QUANTITY"
                  value={MIN_QUANTITY}
                  onChange={(e) => setMIN_QUANTITY(e.target.value)}
                />
              </div> */}
                </div>
                <div className="billling-horizontal-line total-line"></div>
                <div className="total">
                  <div className="total-label">Total Amount : &nbsp;&nbsp;</div>
                  <div className="total-display">{amount}</div>
                </div>
                <div className="billing-button-container">
                <button className="billing-button" type="submit">
                  Show Amount
                </button>
                <button className="billing-button" onClick={clearBill}>
                  Reset
                </button>
                <button className="billing-button" onClick={handleClick} data-toggle="modal"
            data-target="#myModal">
                  Create Invoice
                </button>
                </div>
                
              </form>
              
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/signIn" replace />
      )}
    </div>
  );
};
