import { GET_USERS, USERS_ERROR, ADD_USER } from "../actions/types";

const initialState = {
  users: [],
  user: null,
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
    case ADD_USER:
      return {
        ...state,
        ...payload,
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
