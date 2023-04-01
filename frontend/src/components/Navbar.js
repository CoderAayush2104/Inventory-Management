import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  function resetToken() {
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
                  <li class="dropdown_item-1">Add <br/>Product</li>
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
      <div className="navbar-item menu-container"><nav>
          <ul class="menu">
            <li class="dropdown dropdown-1">
              Supplier
              <ul class="dropdown_menu dropdown_menu-1">
                <NavLink className="navlink" to="/addProduct">
                  <li class="dropdown_item-1">Add<br/>Supplier</li>
                </NavLink>
                <li class="dropdown_item-2 ">Update Supplier</li>
                <NavLink className="navlink" to="/productlist">
                  <li class="dropdown_item-3 last-item">Display Suppliers</li>
                </NavLink>
              </ul>
            </li>
          </ul>
        </nav></div>
      <div className="navbar-item menu-container">
        <nav>
          <ul class="menu">
            <li class="dropdown dropdown-1">
              Order
              <ul class="dropdown_menu dropdown_menu-1">
                <NavLink className="navlink" to="/addProduct">
                  <li class="dropdown_item-1">Place Order</li>
                </NavLink>

                <NavLink className="navlink" to="/productlist">
                  <li class="dropdown_item-2 last-item">Display Orders</li>
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
