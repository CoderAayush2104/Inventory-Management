import "./App.css";
import Signin from "./pages/signin"
import  Signup  from "./pages/signup"
import { Route, Routes } from "react-router-dom";
// import Home from "./pages/home";
import {AddProduct} from "./pages/addProduct";
import Productlist from "./pages/productlist"
import Orderlist from "./pages/orderlist";



function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Signup/>} />
        <Route exact path="/signIn" element={<Signin/>} />
        <Route path="/productList" element={<Productlist/>}/>
        {/* <Route path="/home" element={<Home/>} /> */}
        <Route path="/addProduct" element={<AddProduct/>} />
        <Route path="/orderList" element={<Orderlist/>}/>
      </Routes>
    </>
  );
}

export default App;
