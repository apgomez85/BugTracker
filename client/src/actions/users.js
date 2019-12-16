import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_USERS,
  GET_USER,
  USERS_ERROR,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER
} from "./types";

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

// Get user
export const getUser = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}`);
    dispatch({
      type: GET_USER,
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

// Update user
export const updateUser = (id, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.put(`/api/users/${id}`, formData, config);

    dispatch({
      type: UPDATE_USER,
      payload: res.data
    });
    dispatch(setAlert("User Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete User
export const deleteUser = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`);

    dispatch({
      type: DELETE_USER,
      payload: id
    });
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }

    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
