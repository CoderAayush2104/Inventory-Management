import React from 'react'
import "./pageLoader.css"

export const pageLoader = () => {
  return (
    <div class = "Loading">    
<div class="wrapper">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle-shadow"></div>
        <div class="circle-shadow"></div>
        <div class="circle-shadow"></div>
        <span>Loading</span>
    </div>
</div>

  )
}
