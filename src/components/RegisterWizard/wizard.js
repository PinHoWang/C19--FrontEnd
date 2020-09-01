import React, { useState } from "react";
import StepWizard from "react-step-wizard";
import Nav from "./nav";
import "./wizard.css";
import styles from "./wizard.less";
import transitions from "./transitions.less";
import "react-datepicker/dist/react-datepicker.css";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import Fourth from "./Fourth";
import { FaUser } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import { skillsData } from "../../constants";
/* eslint react/prop-types: 0 */

/**
 * A basic demonstration of how to use the step wizard
 */
const Wizard = (props) => {
  const [onRegister, setOnRegister] = useState(false);
  const [state, updateState] = useState({
    form: {
      skills: skillsData.toString(),
    },
    transitions: {
      enterRight: `${transitions.animated} ${transitions.enterRight}`,
      enterLeft: `${transitions.animated} ${transitions.enterLeft}`,
      exitRight: `${transitions.animated} ${transitions.exitRight}`,
      exitLeft: `${transitions.animated} ${transitions.exitLeft}`,
      intro: `${transitions.animated} ${transitions.intro}`,
    },
    //demo: true, // uncomment to see more
  });

  const updateForm = (key, value) => {
    const { form } = state;
    form[key] = value;
    console.log("After state update : " + JSON.stringify(form));
    updateState({
      ...state,
      form,
    });
  };

  // Do something on step change
  const onStepChange = (stats) => {
    // console.log(stats);
  };

  const setInstance = (SW) =>
    updateState({
      ...state,
      SW,
    });
  const register = () => {
    console.log(state);
    setOnRegister(true);
  };
  const signIn = () => {
    props.history.push("/login");
  };
  // const { SW, demo } = state;

  return (
    <div className={"jumbotron wizardContainer"}>
      <div className="signIn">
        <div className="text-muted">Already have an account?</div>{" "}
        <div className="container-signInBtn">
          {" "}
          <button className="signInBtn" onClick={signIn}>
            Sign In <FaUser />
          </button>
        </div>
      </div>
      <div className="row">
        <div className={`col-12 col-sm-6 offset-sm-3 ${styles["rsw-wrapper"]}`}>
          {onRegister === true ? (
            <Fourth form={state.form} />
          ) : (
            <StepWizard
              onStepChange={onStepChange}
              transitions={state.transitions} // comment out for default transitions
              nav={<Nav />}
              instance={setInstance}
            >
              <First
                hashKey={"FirstStep"}
                form={state.form}
                update={updateForm}
              />
              <Second form={state.form} update={updateForm} />
              <Third
                form={state.form}
                update={updateForm}
                register={register}
              />
            </StepWizard>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Wizard);
