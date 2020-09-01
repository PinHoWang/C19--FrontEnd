import axios from "axios";
import { ADD_USER_API, GET_USERS } from "../../constants";
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  NETWORK_ERROR,
  VALID_EMAIL,
  INVALID_EMAIL,
  ALREADY_EXISTS,
  DOES_NOT_EXISTS,
  RESET_REGISTRATION,
} from "../types";

export function registerUser(user) {
  return function (dispatch) {
    dispatch({
      type: RESET_REGISTRATION,
    });
    return axios
      .post(ADD_USER_API, user)
      .then((res) => {
        dispatch({ type: REGISTRATION_SUCCESS, payload: res.data.message });
      })
      .catch((err) => {
        if (!err.response) {
          dispatch({ type: NETWORK_ERROR, payload: err.message });
        } else {
          dispatch({ type: REGISTRATION_FAILURE, payload: err.message });
        }
      });
  };
}

export function validateEmail(email) {
  return function (dispatch) {
    dispatch({
      type: RESET_REGISTRATION,
    });
    var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailValidate = re.test(String(email).toLowerCase());
    if (emailValidate) {
      dispatch({
        type: VALID_EMAIL,
      });
    } else {
      dispatch({
        type: INVALID_EMAIL,
      });
      return;
    }
    return axios
      .get(GET_USERS)
      .then((res) => {
        let users = res.data.message;
        let matchedUser = users.find((v) => v.email === email);
        if (matchedUser != null) {
          ///user already found in database
          dispatch({
            type: ALREADY_EXISTS,
          });
        } else {
          ///user not found in database
          dispatch({
            type: DOES_NOT_EXISTS,
          });
        }
      })
      .catch((err) => {
        if (!err.response) {
          dispatch({ type: NETWORK_ERROR, payload: err.message });
        } else {
          dispatch({ type: REGISTRATION_FAILURE, payload: err.message });
        }
      });
  };
}

