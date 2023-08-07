import React, { useEffect, useRef, useState, Fragment } from "react";
import "../styles/billing.css";
import jwt_decode from "jwt-decode";
import { PDFViewer } from "@react-pdf/renderer";

import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import { BillProduct } from "../components/billProduct";
import Invoice from "../components/Invoice";
const specificElement = document.getElementById("autocomplete");

export const Billing = () => {
  console.log("rendered");
  const ProductsDropdown = [];

  const [items, setItems] = useState();
  const [ProductName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [billItems, setbillItems] = useState([]);
  const Name = useRef("");
  const Contact = useRef("");

  const [inputList, setInputList] = useState([]);
  const [amount, setAmount] = useState("");

  const match = useRef();

  const [activeIndex, setActiveIndex] = useState(-1);
  const [visibility, setVisibility] = useState(false);

  const [billData, setBillData] = useState({});
  const [billDataLoaded,setBillDataLoaded] = useState();

  useEffect(() => {
    clearBill();
    if (sessionStorage.length !== 0) {
      fetch("https://ochre-beetle-cape.cyclic.app/api/products", {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
        },
      })
        .then((data) => data.json())
        .then((json) => {
          json.forEach((element, index) => {
            ProductsDropdown[index] = element.PRODUCT_NAME;
          });
          setItems(ProductsDropdown);
        })

        .catch((error) => console.log(error));
    }
  }, []);

  //Function to access Child Data
  function Callback(ChildData) {
    setbillItems(billItems.concat(ChildData));
  }

  //Function to clear states
  function clearBill() {
    Name.current.value = "";
    Contact.current.value = "";
    setbillItems((billItems) => (billItems = []));
    setInputList((inputList) => (inputList = []));
    setProductName("");
    setQuantity("");
    setAmount("");
    setBillData({});
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!billItems.length) {
      billItems[0] = { PRODUCT_NAME: ProductName, QUANTITY: quantity };
      console.log(billItems);
    }

    const CUST_CONTACT = Contact.current.value;
    const CUST_NAME = Name.current.value;
    let data = {
      CUST_CONTACT,
      CUST_NAME,
      billItems,
    };

    const current = new Date();

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
        if (data.error) {
          alert(data.error);
          return;
        }
        setAmount(data.TOTAL_AMOUNT);
        
        return data;
        // setBillData({
        //   name: CUST_NAME,
        //   contact: CUST_CONTACT,
        //   items: billItems,
        //   date: `${current.getDate()}/${
        //     current.getMonth() + 1
        //   }/${current.getFullYear()}`,
        //   total_amount: data.TOTAL_AMOUNT,
        // });
      })
      .then((data)=>
        fetch(`https://ochre-beetle-cape.cyclic.app/api/bills/${data.BILL_ID}`, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
          },
        })
          .then((data) => data.json())
          .then((json) => {
            console.log(json);
            setBillData(json);
            setBillDataLoaded(true);
          })

          .catch((error) => console.log(error))
      )

      .catch((error) => {
        console.log(error);
        alert("Unexpected Error Occured.\n Please try again.");
      });
  }
  function addInput() {
    if (ProductName === "" || quantity === "") {
      alert("Add details of first product to proceed");
      return;
    }
    if (!billItems.length) {
      billItems[0] = { PRODUCT_NAME: ProductName, QUANTITY: quantity };
      console.log(billItems);
    }
    setInputList(
      inputList.concat(
        <BillProduct
          btnClick={addInput}
          handleCallback={Callback}
          dropdown={items}
        />
      )
    );
  }

  //Manage Dropdown
  document?.addEventListener("click", function (event) {
    const isClickInside = specificElement?.contains(event.target);
    if (!isClickInside) {
      // The click occurred outside of the specific element
      match.current = [];
      setVisibility(false);
    }
  });

  function handleInputChange(event) {
    setVisibility(true);
    const value = event.target.value;
    setProductName(value);

    const matching = items.filter((product) =>
      product.toLowerCase().startsWith(value.toLowerCase())
    );
    match.current = matching;

    setActiveIndex(-1);
  }

  function handleListItemClick(product) {
    setProductName(product);

    match.current = [];
  }

  function handleKeyDown(event) {
    if (event.keyCode === 40) {
      // Arrow down
      setActiveIndex((prevIndex) => {
        if (prevIndex === match.current.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    } else if (event.keyCode === 38) {
      // Arrow up
      setActiveIndex((prevIndex) => {
        if (prevIndex === 0) {
          return match.current.length - 1;
        } else {
          return prevIndex - 1;
        }
      });
    } else if (event.keyCode === 13) {
      // Enter
      if (activeIndex !== -1) {
        setProductName(match.current[activeIndex]);

        match.current = [];
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
                  <h4 className="modal-title">Invoice</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <Fragment>
                    <PDFViewer className="pdf">
                      {billDataLoaded?( <Invoice invoice={billData[0]} />) : ""}
                     
                    </PDFViewer>
                  </Fragment>
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
              <form
                id="add-product-form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <div className="addproduct-input-container">
                  <div className="label">
                    <input
                      required
                      className="addproduct-input"
                      name="Contact"
                      pattern="[0-9]{10}"
                      minLength={10}
                      maxLength={10}
                      ref={Contact}
                    />
                  </div>
                  <div className="label">
                    <input
                      required
                      className="addproduct-input"
                      name="Name"
                      ref={Name}
                    />
                  </div>

                  <div className="add-item-bill" onClick={addInput}>
                    <i
                      class="fa-solid fa-cart-plus"
                      style={{ color: "#a27b5c" }}
                    ></i>
                  </div>
                  <div className="billproduct-container">
                    <div className="bill-label">
                      <input
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
                          visibility
                            ? "autocomplete-results"
                            : "autocomplete-results hide"
                        }
                      >
                        {match?.current?.map((product, index) => (
                          <li
                            key={product}
                            className={index === activeIndex ? "active" : ""}
                            onClick={() => handleListItemClick(product)}
                          >
                            {product}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bill-label">Quantity</div>
                    <div className="bill-label quantity">
                      {" "}
                      <input
                        required
                        className="addproduct-input"
                        name="PRODUCT_NAME"
                        type="number"
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)}
                      />
                    </div>
                  </div>
                  {/* {Rendering additional component if clicked on cart button} */}
                  {inputList}
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
                  <button
                    className="billing-button"
                    data-toggle="modal"
                    data-target="#myModal"
                  >
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
