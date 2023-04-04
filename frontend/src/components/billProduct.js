import React from 'react'
import "./billProduct.css"

export const billProduct = () => {
  return (
    <div className='billproduct-container'>
        <div className='bill-label'><input
                  className="addproduct-input"
                  name="PRODUCT_NAME"
 
                /></div>
        <div className='bill-label'>Quantity</div>
        <div className='bill-label quantity'>  <input
                  className="addproduct-input"
                  name="PRODUCT_NAME"
                  type='number'
       
                /></div>
        <div className='bill-label'>
            <div className='price-label'>Price &nbsp;&nbsp;|</div>
            <input
                  className="addproduct-input"
                  name="PRODUCT_NAME"
                  type='number'
       
                /></div>
       
    </div>
  )
}
