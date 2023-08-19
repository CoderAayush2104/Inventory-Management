import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/navbar.css";
import jwt_decode from "jwt-decode";
import { Supplier } from './supplier';

export default function Navbar() {
  function resetToken() {
    sessionStorage.clear();
  }
  return (
    <div className="navbar-container">
      <div className={jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin" ? "navbar-item" : "navbar-item user-navitem"}>
        <NavLink className="logout-link" to="/home">
          Home
        </NavLink>
      </div>
      <div className="separator"></div>
      <div className={jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin" ? "navbar-item " : "navbar-item  user-navitem"}>
        
    
              Product
              <ul class="dropdown_menu dropdown_menu-1">
                <NavLink className={jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin" ? "navlink" : "hide"} to="/addProduct">
                  <li class="dropdown_item-1">Add Product</li>
                </NavLink>

                <NavLink className="navlink" to="/productlist">
                  <li class="dropdown_item-3 last-item">Display Products</li>
                </NavLink>
              </ul>

        
      </div>
      <div className="separator"></div>
      <div className={jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin"?"navbar-item" : "hide"}>
          
              Supplier
              <ul class="dropdown_menu dropdown_menu-1">
              <li class="dropdown_item-1">
                <NavLink className="navlink" to="/addSupplier">
                  Add Supplier
                </NavLink>
                </li>

                <NavLink className="navlink" to="/supplierList">
                  <li class="dropdown_item-3 last-item">Display Suppliers</li>
                </NavLink>
              </ul>
   
        
      </div>
      <div className="separator"></div>
      <div className={jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin"?"navbar-item " : "hide"}>
        
         
              Order
              <ul class="dropdown_menu dropdown_menu-1 order">
                <NavLink className="navlink" to="/addOrder">
                  <li class="dropdown_item-1">Place Order</li>
                </NavLink>

                <NavLink className="navlink" to="/orderList">
                  <li class="dropdown_item-2 last-item">Display Orders</li>
                </NavLink>
              </ul>
 
        
      </div>
      <div className="separator"></div>
      <div className={jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin" ? "navbar-item mneu-container" : "navbar-item  user-navitem"}>
        
       
              Billing
              <ul class="dropdown_menu dropdown_menu-1 billing">
                <NavLink className="navlink" to="/billing">
                  <li class="dropdown_item-1">Create Bill</li>
                </NavLink>

                <NavLink className="navlink" to="/billingHistory">
                  <li class="dropdown_item-2 last-item">Billing History</li>
                </NavLink>
              </ul>
     
        
      </div>
      <div className="separator"></div>
     
      <div className={jwt_decode(JSON.parse(sessionStorage.getItem("login")).token).result
        .ROLE === "admin" ? "navbar-item last" : "navbar-item last user-navitem"}>
        <button className="logout" onClick={resetToken}>
          <NavLink className="logout-link" to="/signIn">
            Logout
          </NavLink>
        </button>
      </div>
    </div>
  );
}
