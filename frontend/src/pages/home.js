import React from 'react'
import Navbar from '../components/Navbar'
import { Navigate } from 'react-router-dom'
import "./home.css"
export const home = () => {
  return (
    <div>
        {JSON.parse(sessionStorage.getItem("login"))?.login ? (
        <div className='home-page'>
          <div className='home-header'>
          <div className="title-container">
              <p className="title">Stockify</p>
            </div>
            <Navbar/>
        </div>
        <div className='home-main'>
          <p className='title small'>Welcome to Stockify</p>
        </div>
        <div className='home-footer'>
       
        </div></div>) : (
        <Navigate to="/signIn" replace />
      )}
        
    </div>
    
  )
}
