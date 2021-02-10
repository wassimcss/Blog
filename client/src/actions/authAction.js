import axios from "axios";
import { getError } from "./errorActions";
import { LOGIN, GET_USER, GET_TOKEN, LOGOUT } from "./Types";

export const login = () => ({
  type: LOGIN,
});

export const logout = () => (dispatch) => {
  axios
    .get("/user/logout")
    .then((res) => dispatch({ type: LOGOUT }))
    .catch((err) => getError(err.response.data, err.response.status));
};

export const get_token = () => (dispatch) => {
  axios
    .post("/user/refresh_token", null)
    .then((res) => dispatch({ type: GET_TOKEN, payload: res.data.accessToken }))
    .catch((err) => dispatch(getError(err.response.data, err.response.status)));
};

export const load_user = (token) => (dispatch) => {
  axios
    .get("/user/info", { headers: { authtoken: token } })
    .then((res) =>
      dispatch({
        type: GET_USER,
        payload: {
          user: res.data,
          isAdmin: res.data.role === "Admin" ? true : false,
        },
      })
    )
    .catch((err) => dispatch(getError(err.response.data, err.response.status)));
};

export const edit_profile = ({ name, age, profession, avatar }, token) => (
  dispatch
) => {
  axios
    .put(
      "/user/profile",
      { name, age, profession, avatar },
      { headers: { authtoken: token } }
    )
    .then((res) =>
      dispatch({
        type: GET_USER,
        payload: {
          user: res.data,
          isAdmin: res.data.role === "Admin" ? true : false,
        },
      })
    )
    .catch((err) => dispatch(getError(err.response.data, err.response.status)));
};

export const tokenConfig = (getState) =>{
  const token = getState().token;

  const config = {
      headers:{
          'Content-type':'application/json'
      }
  }

  if(token) {
      config.headers['authtoken'] = token;
  }

  return config;
}
