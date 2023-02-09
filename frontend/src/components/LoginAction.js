// Login functionality adapted from https://saasitive.com/tutorial/react-token-based-authentication-django/


import axios from "axios";
const SET_TOKEN = "SET_TOKEN";
const SET_CURRENT_USER = "SET_CURRENT_USER";
const UNSET_CURRENT_USER = "UNSET_CURRENT_USER";



export const setAxiosAuthToken = (token) => {
    if (typeof token !== "undefined" && token) {
      // Apply for every request
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
    }
};



export const getCurrentUser = redirectTo => dispatch => {
  axios
    .get("localhost:8000/api/users/me/")
    .then(response => {
      const user = {
        username: response.data.username,
        email: response.data.email
      };
      dispatch(setCurrentUser(user, redirectTo));
    })
    .catch(error => {
      dispatch(unsetCurrentUser());
      console.log(error);
    });
};

export const setCurrentUser = (user, redirectTo) => dispatch => {
  localStorage.setItem("user", JSON.stringify(user));
  dispatch({
    type: SET_CURRENT_USER,
    payload: user
  });

  console.log("set user" + redirectTo);
  if (redirectTo !== "") {
    // dispatch(push(redirectTo));
  }
};

export const setToken = token => dispatch => {
  setAxiosAuthToken(token);
  localStorage.setItem("token", token);
  dispatch({
    type: SET_TOKEN,
    payload: token
  });
};

export const unsetCurrentUser = () => dispatch => {
  setAxiosAuthToken("");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: UNSET_CURRENT_USER
  });
};

export const logout = () => dispatch => {
  axios
    .post("localhost:8000/api/token/logout/")
    .then(response => {
      dispatch(unsetCurrentUser());
      // dispatch(push("/"));
      console.log("Logout successful.");
    })
    .catch(error => {
      dispatch(unsetCurrentUser());
      console.log(error);
    });
};