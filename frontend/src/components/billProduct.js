import React, { useEffect, useState } from 'react'
import "./billProduct.css"

export const BillProduct = (props) => {
  const[productId,setProductId] = useState();
  const[quantity,setQuantity] = useState();
  const[price,setPrice] = useState();
  // useEffect(()=>{if(!productId || !quantity ) {
  //   setProductId("")
  //   setQuantity()
  // }},[])
  //Method to clear state in child component
  function clearState(){
    setProductId("");
    setQuantity("");
    setPrice("");
  }
  //Pass clearState function to parent
  props.passClearStateFunc(clearState);

  return (
    <div className='billproduct-container'>
        <div className='bill-label'><input
                  className="addproduct-input"
                  name="PRODUCT_NAME"
                  value={productId}
                  onChange={(event)=>setProductId(event.target.value)}
                /></div>
        <div className='bill-label'>Quantity</div>
        <div className='bill-label quantity'>  <input
                  className="addproduct-input"
                  name="PRODUCT_NAME"
                  type='number'
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                /></div>
        {/* <div className='bill-label'>
            <div className='price-label'>Price &nbsp;&nbsp;|</div>
            <input
                  className="addproduct-input"
                  name="PRODUCT_NAME"
                  type='number'
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                /></div> */}
       {props.handleCallback({"PRODUCT_ID": productId,"QUANTITY" : quantity})}
    </div>
  )
}
