import React, { Component } from "react";
import { registerUser } from "../../actions/userRegistrationActions";
import { connect } from "react-redux";
import ErrorNotification from "../error";
/*
 * mapStateToProps
 */
const mapStateToProps = (state) => {
  const { registrationReducer } = state;
  return {
    register: registrationReducer.register,
    registrationMessage: registrationReducer.registrationMessage,
    error: registrationReducer.error,
  };
};
/*
 * mapDispatchToProps
 */
const mapDispatchToProps = (dispatch) => ({
  registerUser: (user) => dispatch(registerUser(user)),
});
class Fourth extends Component {
  registerUser = () => {
    window.scroll(0, 0);
    const { form } = this.props;
    this.props.registerUser(form);
  };
  componentWillMount() {
    console.log(this.props.register, this.props.registrationMessage);
    this.registerUser();
  }
  render() {
    const { form } = this.props;
    const { registrationMessage, register, error } = this.props;
    return (
      <div>
        <ErrorNotification message={error} />
        {register === true && (
          <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">{registrationMessage}</h4>
            <p>
              Thank you for registering! A confirmation link is sent to your{" "}
              {form.email}.
            </p>
          </div>
        )}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Fourth);
