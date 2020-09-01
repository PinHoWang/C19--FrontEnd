import React from "react";
import "./css/login.component.css";
import "./css/util.css";
import axios from "axios";
import * as Constants from "../constants";
import { withRouter } from "react-router";
import { withCookies } from "react-cookie";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      error: false,
      errorMessage: "",
      statusCode: "",
    };
  }
  componentWillMount() {
    const { cookies } = this.props;
    const accessInfo = cookies.get("access_info");
    if (accessInfo !== undefined) {
      ///user logged in
      this.props.history.push("/dashboard");
    }
  }
  handleEmail = (e) => {
    const { form } = this.state;
    form["email"] = e.target.value;
    this.setState({
      form,
    });
  };
  handlePassword = (e) => {
    const { form } = this.state;
    form["password"] = e.target.value;
    this.setState({
      form,
    });
  };
  handleSignIn = (e) => {
    e.preventDefault();
    const { form } = this.state;
    console.log(form);
    axios
      .post(Constants.SIGNIN_USER_API, form)
      .then((res) => {
        if (res.data.message.hasOwnProperty("token")) {
          const { cookies } = this.props;
          cookies.set("access_info", res.data.message);
          console.log(cookies);
          this.props.history.push("/dashboard");
        } else {
          ////invalid password
          this.setState({
            error: true,
            errorMessage: res.data.message,
            statusCode: res.status,
          });
        }
      })
      .catch((err) => {
        if (!err.response) {
          //network error
          let message = `Server down! Network error`;
          this.setState({
            error: true,
            errorMessage: message,
          });
        } else {
          console.log(err.response);
          console.log(
            `Error while sign in ${err.message},${err.response.data.message}`
          );
          let message = `${err.response.data.message},
                     ${err.message}`;
          this.setState({
            error: true,
            errorMessage: message,
            statusCode: err.response.status,
          });
        }
      });
  };
  render() {
    const signUp = () => {
      this.props.history.push("/register");
    };
    const { error, errorMessage, statusCode } = this.state;
    return (
      <div class="limiter">
        <div class="container-login100">
          <div class="wrap-login100">
            <form
              class="login100-form validate-form"
              onSubmit={this.handleSignIn}
            >
              {error && (
                <div class="alert alert-danger" role="alert">
                  {errorMessage}{" "}
                  {statusCode === 400 && (
                    <div>
                      Please <a href="/forgotPassword">reset</a> your password
                      to login!
                    </div>
                  )}
                </div>
              )}
              <span class="login100-form-title p-b-43">Login to continue</span>

              <div
                class="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  class="input100"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleEmail}
                />
              </div>

              <div
                class="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  class="input100"
                  type="password"
                  name="pass"
                  placeholder="Password "
                  onChange={this.handlePassword}
                />
              </div>

              <div class="flex-sb-m w-full p-t-3 p-b-32">
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div>
                  <a href="/forgotPassword" class="txt1">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div class="container-login100-form-btn">
                <button type="submit" class="login100-form-btn">
                  Login
                </button>
              </div>
              <br />

              <div class="container-login100-form-btn">
                <button class="login100-form-btn" onClick={signUp}>
                  Sign Up
                </button>
              </div>
            </form>

            <div class="login100-more"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(withRouter(Login));
