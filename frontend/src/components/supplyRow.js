import React from "react";
import "./supplyRow.css";


export const SupplyRow = ({ order_id, product_name, user_id,date, quantity}) => {

  function handleClick(e){
    if(e.target.className === "fa-solid fa-circle-check"){
      const data = {"order_id" : order_id,"status" : 1}
      fetch('https://ochre-beetle-cape.cyclic.app/api/orders/',{
        method : 'PATCH',
        headers : {
          "Authorization" : "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
          "Content-Type": "application/json",
        },
        body : JSON.stringify(data)
      })  
      .then((resp)=>resp.json())
      .then((result)=>console.log(result))
      .then(()=> {return fetch(
          "https://ochre-beetle-cape.cyclic.app/api/orders/",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
             
            },
          
          })})
        .then((resp)=>resp.json())  
        .then((data)=>data.map((item)=>{if(item.ORDER_ID === order_id){
          const result = {"PRODUCT_ID" : item.PRODUCT_ID ,"ORDER_ID" : item.ORDER_ID}
          return fetch(
              "https://ochre-beetle-cape.cyclic.app/api/products/update-product",
              {
                method: "PATCH",
                headers: {
                  Authorization:
                    "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(result),
              }
            );
        }
        }))
        .then((result)=>console.log(result)  )
      .catch((error)=>console.log(error));
    }
    else if(e.target.className === "fa-sharp fa-solid fa-circle-xmark"){
      const data = {"order_id" : order_id,"status" : -1}
      fetch('https://ochre-beetle-cape.cyclic.app/api/orders/',{
        method : "PATCH",
        headers : {
          "Authorization" : "Bearer " + JSON.parse(sessionStorage.getItem("login")).token,
          "Content-Type": "application/json",
        },
        body : JSON.stringify(data)
      })
      .then((resp)=>resp.json())
      .then((result)=>console.log(result))
      .catch((error)=>console.log(error));
    }
  }

  
  return (
    <div className="supplylist-row-container">
      <div className="supplylist-item">{order_id}</div>
      <div className="supplylist-item">{product_name}</div>
      <div className="supplylist-item">{user_id}</div>
      <div className="supplylist-item ">{date}</div>
      <div className="supplylist-item ">{quantity}</div>
      <div className="supplylist-item last">
        <button className = "accept" onClick={handleClick}>
        <i class="fa-solid fa-circle-check" style={{color: "#00ff2a"}}></i>
        </button>
        <button className = "reject"onClick={handleClick}>
        <i class="fa-sharp fa-solid fa-circle-xmark" style={{color: "#ff0000"}}></i>
        </button>
      </div>
      
    </div>
  );
};