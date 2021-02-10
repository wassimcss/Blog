import { GET_USER, LOGIN, LOGOUT } from "../actions/Types";

const initialState = {
  isAuth: false,
  isAdmin: false,
  user: {},
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, isAuth: true };
    case GET_USER:
      return { ...state, user: payload.user, isAdmin: payload.isAdmin };

    case LOGOUT:
      return { ...state, isAuth: false };

    default:
      return state;
  }
};
export default authReducer;
