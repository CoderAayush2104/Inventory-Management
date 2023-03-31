import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css"
import { Product } from './../pages/Product';
export default function Navbar() {
  function resetToken(){
    sessionStorage.clear();
  }
  return (
    <div className="navbar-container">
      <div className="navbar-item">Home</div>
      <div className="navbar-item menu-container">
        <nav>
          <ul class="menu">
            <li class="dropdown dropdown-1">
              Product
              <ul class="dropdown_menu dropdown_menu-1">
                <NavLink className="navlink" to="/addProduct">
                  <li class="dropdown_item-1">Add Product</li>
                </NavLink>
                <li class="dropdown_item-2 ">Update Product</li>
                <NavLink className="navlink" to="/productlist">
                <li class="dropdown_item-3 last-item">Display Products</li>
                </NavLink>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div className="navbar-item">Supplier</div>
      <div className="navbar-item">Order</div>
      <div className="navbar-item last"><button className="logout" onClick={resetToken}><NavLink className = "logout-link"to = "/signIn">Logout</NavLink></button></div>
    </div>
  );
}
