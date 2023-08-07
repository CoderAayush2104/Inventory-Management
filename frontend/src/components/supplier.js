import React from "react";
import "./styles/supplier.css";

export const Supplier = ({ supplier_id, supplier_name, contact_no, email }) => {
  return (
    <div className="supplierlist-row-container">
      <div className="list-item">{supplier_id}</div>
      <div className="list-item">{supplier_name}</div>
      <div className="list-item">{contact_no}</div>
      <div className="list-item last">{email}</div>
    </div>
  );
};
