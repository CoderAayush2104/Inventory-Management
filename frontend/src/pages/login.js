import React, { Component } from 'react'
import "./login.css";

export default class Login extends Component {
  render() {
    return (
      <div id="container">
        {/* <!-- Cover Box --> */}
        <div id="cover">
          {/* <!-- Sign Up Section --> */}
          <h1 class="sign-up">Hello, Friend!</h1>
          <p class="sign-up">
            Enter your personal details
            <br /> and start a journey with us
          </p>
          <a class="button sign-up" href="#cover">
            Sign Up
          </a>
          {/* <!-- Sign In Section --> */}
          <h1 class="sign-in">Welcome Back!</h1>
          <p class="sign-in">
            To keep connected with us please
            <br /> login with your personal info
          </p>
          <br />
          <a className="button sub sign-in" href="#">
            Sign In
          </a>
        </div>
        {/* <!-- Login Box --> */}
        <div id="login">
          <h1>Sign In</h1>
          {/* 
  <p>or use your email account:</p> */}
          <form>
            <input type="email" placeholder="Email" autocomplete="off" />
            <br />
            <input type="password" placeholder="Password" autocomplete="off" />
            <br />
            {/* <a id="forgot-pass" href="#">Forgot your password?</a><br/> */}
            <input class="submit-btn" type="submit" value="Sign In" />
          </form>
        </div>
        {/* <!-- Register Box --> */}
        <div id="register">
          <h1>Create Account</h1>
  
          {/* <p>or use your email for registration:</p> */}
          <form>
            <input type="text" placeholder="Name" autocomplete="off" />
            <br />
            <input type="email" placeholder="Email" autocomplete="off" />
            <br />
            <input type="password" placeholder="Password" autocomplete="off" />
            <br />
            <input class="submit-btn" type="submit" value="Sign Up" />
          </form>
        </div>
      </div>
    );
  }
}
