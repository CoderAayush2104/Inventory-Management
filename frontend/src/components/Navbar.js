import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  function resetToken() {
    sessionStorage.clear();
  }
  return (
    <div className="navbar-container">
      <div className="navbar-item">
        <NavLink className="logout-link" to="/home">
          Home
        </NavLink>
      </div>
      <div className="navbar-item menu-container">
        <nav>
          <ul class="menu">
            <li class="dropdown dropdown-1">
              Product
              <ul class="dropdown_menu dropdown_menu-1">
                <NavLink className="navlink" to="/addProduct">
                  <li class="dropdown_item-1">Add Product</li>
                </NavLink>

                <NavLink className="navlink" to="/productlist">
                  <li class="dropdown_item-3 last-item">Display Products</li>
                </NavLink>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div className="navbar-item menu-container">
        <nav>
          <ul class="menu">
            <li class="dropdown dropdown-1">
              Supplier
              <ul class="dropdown_menu dropdown_menu-1">
                <NavLink className="navlink" to="/addSupplier">
                  <li class="dropdown_item-1">Add Supplier</li>
                </NavLink>

                <NavLink className="navlink" to="/supplierList">
                  <li class="dropdown_item-3 last-item">Display Suppliers</li>
                </NavLink>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div className="navbar-item menu-container">
        <nav>
          <ul class="menu">
            <li class="dropdown dropdown-1 ">
              Order
              <ul class="dropdown_menu dropdown_menu-1 order">
                <NavLink className="navlink" to="/addOrder">
                  <li class="dropdown_item-1">Place Order</li>
                </NavLink>

                <NavLink className="navlink" to="/orderList">
                  <li class="dropdown_item-2 last-item">Display Orders</li>
                </NavLink>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div className="navbar-item menu-container">
        <nav>
          <ul class="menu">
            <li class="dropdown dropdown-1 ">
              Billing
              <ul class="dropdown_menu dropdown_menu-1 order">
                <NavLink className="navlink" to="/billing">
                  <li class="dropdown_item-1">Create Bill</li>
                </NavLink>

                <NavLink className="navlink" to="/billingHistory">
                  <li class="dropdown_item-2 last-item">Billing History</li>
                </NavLink>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
     
      <div className="navbar-item last">
        <button className="logout" onClick={resetToken}>
          <NavLink className="logout-link" to="/signIn">
            Logout
          </NavLink>
        </button>
      </div>
    </div>
  );
}
