import React from "react";
import "./css/register.component.css";
import RegisterWizard from "./RegisterWizard/wizard";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";

class Register extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentWillMount() {
    const { cookies } = this.props;
    const accessInfo = cookies.get("access_info");
    if (accessInfo !== undefined) {
      ///user logged in
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return <RegisterWizard />;
  }
}

export default withRouter(withCookies(Register));
