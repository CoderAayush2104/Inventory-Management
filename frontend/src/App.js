import "./App.css";
import Signin from "./pages/signin"
import  Signup  from "./pages/signup"
import { Route, Routes } from "react-router-dom";
// import Home from "./pages/home";
import {AddProduct} from "./pages/addProduct";
import Productlist from "./pages/productlist"



function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Signup/>} />
        <Route exact path="/signIn" element={<Signin/>} />
        <Route path="/productList" element={<Productlist/>}/>
        {/* <Route path="/home" element={<Home/>} /> */}
        <Route path="/addProduct" element={<AddProduct/>} />
        
      </Routes>
    </>
  );
}

export default App;
