import React,{Component} from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./signin.css";



export default class signup extends Component {
  constructor() {
    super();
    this.state = {
      animate: true,
    };
  }
  render() {
    return (
      <div className="page-container">
        <div className="signup-left">
        <div className="gradient-box"></div>

          <div className="title-container">
            <p className="title">Stockify</p>
          </div>
          <div className="info-container">
          <div className="title-1"><p>Your Online</p></div>
          <div className="title-2"><p>WareHouse</p></div>
          <div className="info"><p>Efficiently managing your inventory can make or break your business. Let us help you take control and streamline your operations.</p></div>
          <div className="info-button-container">
            <button className="info-button">Get Started</button>
            <button className="info-button">Know More</button>
          </div>
          </div>
          
        </div>
        <div className="signup-right">
          <div className="navigation-button-container">
            <button className="home-button">Home</button>
            |
            <button className="about-US">About Us</button>
          </div>
          <div className={this.state.animate ? "fade-in signin-form-container" : "signin-form-container"}>
            <div className="signup-form-title">
              <h1>Sign In</h1>
            </div>
            <div className="form">
              <form>
                
                <div className="input-container">
                  <input className="input" placeholder="Email" />
                </div>
                <div className="input-container">
                  <input
                    className="input"
                    placeholder="Password"
                  />
                </div>
            
            
                
               <div className="submit-button-container">
               <button class="submit-button">Sign In</button>
               </div>
              </form>
            </div>
            <div className="signup-footer">
            <p>Don't have an account ?</p>
            
            <p><NavLink className="signin-link" to="/">Sign Up</NavLink></p>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    if (window.sessionStorage.getItem("firstLoadDone") === null) {
      this.setState({ animate: true });
    } else {
      this.setState({ animate: false });
    }
  }
}


