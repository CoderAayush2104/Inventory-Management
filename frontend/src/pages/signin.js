import React, { Component } from "react";
import { Navigate, NavLink } from "react-router-dom";
import "../styles/signin.css";
import { pageLoader as PageLoader } from "../components/pageLoader";

export default class signin extends Component {
  constructor() {
    super();
    setTimeout(()=>window.scrollTo(0,850),2000)
    this.state = {
      animate: true,
      user_id: "",
      password: "",
      login: false,
      token: "",
      loading: "",
    };
  }

  componentDidMount() {
    if (window.sessionStorage.getItem("firstLoadDone") === null) {
      this.setState({ animate: true });
    } else {
      this.setState({ animate: false });
    }
    sessionStorage.clear();
  }

  login(event) {
    this.setState({ loading: true });
    event.preventDefault();

    fetch("https://ochre-beetle-cape.cyclic.app/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.setState({ login: true });
        }
        return data;
      })
      .then((data) => {
        if (data.success) {
          sessionStorage.setItem(
            "login",
            JSON.stringify({
              login: true,
              token: data.token,
            })
          );
        } else {
          this.setState({ loading: false });
          setTimeout(() => alert("Invalid Username or Password"), 500);
        }
      })
      .catch((error) => console.log(error));

    this.setState({ login: false });
    this.setState({ user_id: "" });
    this.setState({ password: "" });
  }

  render() {
    return (
      <div>
        {!this.state.login ? (
          <div>
            {!this.state.loading ? (
              <div className="page-container">
                <div className="signup-left">
                  <div className="gradient-box"></div>

                  <div className="title-container">
                    <p className="title">Stockify</p>
                  </div>
                  <div className="info-container">
                    <div className="title-1">
                      <p>Your Online</p>
                    </div>
                    <div className="title-2">
                      <p>WareHouse</p>
                    </div>
                    <div className="info">
                      <p>
                        Efficiently managing your inventory can make or break
                        your business. Let us help you take control and
                        streamline your operations.
                      </p>
                    </div>
                    <div className="info-button-container">
                      <button className="info-button">Get Started</button>
                      <button className="info-button">Know More</button>
                    </div>
                  </div>
                </div>
                <div className="signup-right">
                  <div className="navigation-button-container">
                    <button className="home-button">Home</button>|
                    <button className="about-US">About Us</button>
                  </div>
                  <div
                    className={
                      this.state.animate
                        ? "fade-in signin-form-container"
                        : "signin-form-container"
                    }
                  >
                    <div className="signup-form-title">
                      <h1>Sign In</h1>
                    </div>
                    <div className="form">
                      <form
                        onSubmit={(event) => {
                          this.login(event);
                        }}
                      >
                        <div className="input-container-login">
                          <input
                            className="input"
                            placeholder="Username"
                            value={this.state.user_id}
                            onChange={(event) => {
                              this.setState({ user_id: event.target.value });
                            }}
                          />
                        </div>
                        <div className="input-container-login">
                          <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(event) => {
                              this.setState({ password: event.target.value });
                            }}
                          />
                        </div>

                        <div className="submit-button-container">
                          <button class="submit-button">Sign In</button>
                        </div>
                      </form>
                    </div>
                    <div className="signup-footer">
                      <p>Don't have an account ?</p>

                      <p>
                        <NavLink className="signin-link" to="/">
                          Sign Up
                        </NavLink>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <PageLoader />
            )}
          </div>
        ) : (
          <Navigate to="/home" replace={true} />
        )}
      </div>
    );
  }
}
