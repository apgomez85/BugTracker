import {
  GET_USERS,
  GET_USER,
  USERS_ERROR,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER
} from "../actions/types";

const initialState = {
  users: [],
  user: {},
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case ADD_USER:
      return {
        ...state,
        ...payload,
        loading: false
      };
    case UPDATE_USER:
      return {
        ...state,
        ...payload,
        loading: false
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== payload),
        loading: false
      };
    case USERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
