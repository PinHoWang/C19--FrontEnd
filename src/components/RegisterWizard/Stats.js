import React from "react";
/**
 * Stats Component - to illustrate the possible functions
 * Could be used for nav buttons or overview
 */

class Stats extends React.Component {
  render() {
    const {
      // currentStep,
      // firstStep,
      // goToStep,
      // lastStep,
      nextStep,
      previousStep,
      // totalSteps,
      step,
      form,
    } = this.props;
    const hasValue = (obj, key) => {
      let bool = obj.hasOwnProperty(key) && obj[key] !== "" && obj[key] != null;
      return bool;
    };
    const isTermsChecked = (obj, key) => {
      let bool = obj.hasOwnProperty(key) && obj[key] === true;
      return bool;
    };
    const validateRequired = () => {
      if (step === 1) {
        let result =
          form !== undefined &&
          hasValue(form, "firstName") &&
          hasValue(form, "lastName") &&
          hasValue(form, "dateofBirth");
        if (!result) {
          ///alert the user to input required
          alert("Please input all the required fields!");
          return;
        }
      } else if (step === 2) {
        const {
          isEmailAddress,
          isEmailAlreadyExists,
          isPasswordMatch,
        } = this.props;
        let result =
          form !== undefined &&
          hasValue(form, "email") &&
          isEmailAddress &&
          !isEmailAlreadyExists &&
          hasValue(form, "password") &&
          hasValue(form, "confirmpassword") &&
          isPasswordMatch;
        if (!result) {
          ///alert the user to input required
          alert("Please input all the required fields!");
          return;
        }
      } else if (step === 3) {
        let result =
          form !== undefined &&
          hasValue(form, "type") &&
          hasValue(form, "education") &&
          hasValue(form, "skills") &&
          hasValue(form, "portfolioLink") &&
          isTermsChecked(form, "terms");
        if (!result) {
          ///alert the user to input required
          alert("Please input all the required fields!");
          return;
        }
      }
      nextStep();
    };
    return (
      <div>
        <hr />
        {step > 1 && (
          <div className="container-backBtn">
            <button className="backBtn" onClick={previousStep}>
              Go Back
            </button>
            <br />
          </div>
        )}
        {step === 3 ? (
          <div className="container-registerBtn">
            <button className="registerBtn" onClick={validateRequired}>
              Register
            </button>
          </div>
        ) : (
          <div class="container-continueBtn">
            <button className="continueBtn" onClick={validateRequired}>
              Continue
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Stats;
