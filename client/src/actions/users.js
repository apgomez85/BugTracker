import axios from "axios";
import { setAlert } from "./alert";
import { GET_USERS, USERS_ERROR, ADD_USER } from "./types";

// Get users
export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get("/api/users");
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add user
export const addUser = submitData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/api/users", submitData, config);
    dispatch({
      type: ADD_USER,
      payload: res.data
    });
    dispatch(setAlert("User Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
