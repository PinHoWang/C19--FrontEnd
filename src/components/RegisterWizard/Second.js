import React from "react";
import Stats from "./Stats";
import Alert from "@material-ui/lab/Alert";
import { validateEmail } from "../../actions/userRegistrationActions";
import { connect } from "react-redux";
import ErrorNotification from "../error";
import SuccessNotification from "../success";
/*
 * mapDispatchToProps
 */
const mapDispatchToProps = (dispatch) => ({
  validateEmail: (email) => dispatch(validateEmail(email)),
});
const mapStateToProps = (state) => {
  const { registrationReducer } = state;
  return {
    isEmailExists: registrationReducer.isEmailExists,
    isEmailValid: registrationReducer.isEmailValid,
  };
};
class Second extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      isPasswordMatch: null,
      email: null,
      password: null,
      confirmpassword: null,
    };
  }
  checkEmail = (event) => {
    event.preventDefault();
    this.props.validateEmail(event.target.value);
  };

  updateEmailInForm = (e) => {
    console.log("testemail");
    this.setState({
      email: e.target.value,
    });
    this.props.update("email", e.target.value);
  };
  render() {
    const { isPasswordMatch } = this.state;
    const validate = () => {
      this.props.previousStep();
    };

    const updatePasswordForm = (e) => {
      this.setState({
        password: e.target.value,
      });
      this.props.update("password", e.target.value);
    };
    const updateCOnfirmpasswordForm = (e) => {
      this.setState({
        confirmpassword: e.target.value,
      });
      this.props.update("confirmpassword", e.target.value);
    };
    const validateConfirmPassword = (e) => {
      const { form } = this.props;
      console.log(form);
      if (form["password"] === e.target.value) {
        this.setState({
          isPasswordMatch: true,
        });
      } else {
        this.setState({
          isPasswordMatch: false,
        });
      }
    };
    return (
      <div>
        <div>
          {" "}
          <label>
            Email <span className="requiredColor">*</span>
          </label>
          <input
            required
            autoComplete="email"
            type="email"
            className="form-control"
            name="email"
            value={this.state.email}
            placeholder="Email"
            onBlur={this.checkEmail}
            onChange={this.updateEmailInForm}
          />
          <div className="text-muted">
            <a
              href="https://www.northeastern.edu/privacy-information/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Please see our privacy policy
            </a>
          </div>
          {this.props.isEmailExists != null &&
            (this.props.isEmailExists ? (
              <ErrorNotification message="Email address already exists!" />
            ) : (
              <SuccessNotification message="Email address is unique!" />
            ))}
          {this.props.isEmailValid != null &&
            (this.props.isEmailValid ? (
              <SuccessNotification message="Email address entered is valid!" />
            ) : (
              <ErrorNotification message="Email address entered is invalid!" />
            ))}
          <label>
            Password <span className="requiredColor">*</span>
          </label>
          <input
            type="password"
            autoComplete="password"
            className="form-control"
            id="inputPassword4"
            placeholder="Password"
            value={this.state.password}
            onChange={updatePasswordForm}
          />
          <label>
            Confirm Password <span className="requiredColor">*</span>
          </label>
          <input
            type="password"
            autoComplete="confirmpass"
            className="form-control"
            id="inputConfirmPassword4"
            value={this.state.confirmpassword}
            placeholder="Confirm Password"
            onBlur={validateConfirmPassword}
            onChange={updateCOnfirmpasswordForm}
          />
          {isPasswordMatch != null &&
            (isPasswordMatch ? (
              <Alert severity="success">Passwords match!</Alert>
            ) : (
              <Alert severity="error">Passwords do not match!</Alert>
            ))}
          <Stats
            step={2}
            isEmailAddress={this.props.isEmailValid}
            isEmailAlreadyExists={this.props.isEmailExists}
            isPasswordMatch={isPasswordMatch}
            {...this.props}
            previousStep={validate}
          />{" "}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Second);
