import React,{Component} from "react";
import { NavLink } from "react-router-dom";
import "./signup.css";



export default class signup extends Component {
  constructor() {
    super();
    this.state = {
      animate: true,
      user_id: "",
      email: "",
      password:"",
      shop_name: "",
    };
  }
  signup(event){
    event.preventDefault();
    const user_id = this.state.user_id;
    const email = this.state.email;
    const password = this.state.password;
    const shop_name = this.state.shop_name;
    var data = {
     user_id,
     email,
     password,
     shop_name,    
    };
    console.log(data);
    fetch("https://ochre-beetle-cape.cyclic.app/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((resp) => {
        if(resp.success){
          
        };
      });
    })
    .catch((error) => console.log(error));

    this.setState({ user_id: "" });
    this.setState({ email: "" });
    this.setState({ password: "" });
    this.setState({ shop_name: "" });
  }
  
  componentDidMount(){
    sessionStorage.clear();
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
            <button className="home-button">Home</button>|<button className="about-US">About Us</button>
          </div>
          <div className={this.state.animate ? "fade-in signup-form-container" : "signup-form-container"}>
            <div className="signup-form-title">
              <h1>Sign Up</h1>
            </div>
            <div className="form">
              <form>
                <div className="input-container-login">
                  <input
                    className="input"
                    placeholder="UserId"
                  />
                </div>
                <div className="input-container-login">
                  <input className="input" placeholder="Email" />
                </div>
                <div className="input-container-login">
                  <input
                    className="input"
                    placeholder="Password"
                  />
                </div>
                <div className="input-container-login">
                  <input
                    className="input"
                    placeholder="Shop Name"
                  />
                </div>
                <div className="input-container-login upload">
                  <input
                    className="input"
                    type="file"
                    accept="image/*"
                    placeholder="Shop Photo"
                  />
                  Upload Shop Photo
                </div>
                
               <div className="submit-button-container">
               <button class="submit-button">Sign Up</button>
               </div>
              </form>
            </div>
            <div className="signup-footer">
            <p>Already have an account ?</p>
            <p><NavLink className="signin-link"to="/signIn">Sign In</NavLink></p>
            
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


