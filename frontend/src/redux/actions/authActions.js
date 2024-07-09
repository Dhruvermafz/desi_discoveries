import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOG_OUT,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../type/types";
import { setAuthToken } from "../../utils/setAuthToken";
import { setAlert } from "./alertAction";
import { BASE_URL } from "../../utils/config";
const API_URL = `${BASE_URL}/api/v1`;

// LOAD USER
export const loadUser = (user) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const response = await axios.get(`${API_URL}/users/${user}`);
    dispatch({ type: USER_LOADED, payload: response.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// LOG IN USER
export const logIn = (formValues, navigate) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formValues);

  try {
    const response = await axios.post(`${API_URL}/auth/login`, body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    dispatch(loadUser(response.data.user.id));

    navigate("/");
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
    const error = err.response.data;
    if (error) dispatch(setAlert(error.message));
  }
};

// LOG OUT USER
export const logout = (navigate) => async (dispatch) => {
  try {
    await axios.get(`${API_URL}/auth/logout`);
    dispatch({ type: LOG_OUT });
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

// REGISTER USER
export const signUp = (formValues, navigate) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formValues);

  try {
    const response = await axios.post(`${API_URL}/auth/signup`, body, config);
    dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    dispatch(loadUser(response.data.user.id));

    navigate("/");
  } catch (err) {
    dispatch({ type: SIGNUP_FAIL });
    const error = err.response.data;
    if (error) dispatch(setAlert(error.message));
  }
};

// FORGOT PASSWORD
export const forgotPassword = (formValues, navigate) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formValues);
  try {
    const response = await axios.post(
      `${API_URL}/users/forgotPassword`,
      body,
      config
    );
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
    navigate("/forgot-password-confirm");
  } catch (err) {
    dispatch({ type: FORGOT_PASSWORD_FAIL });
    const error = err.response.data;
    if (error) dispatch(setAlert(error.message));
  }
};

// UPDATE USER PROFILE & PASSWORD
export const updateUserProfile =
  (type, formValues, navigate) => async (dispatch) => {
    try {
      const url =
        type === "password"
          ? `${API_URL}/users/updateMyPassword`
          : `${API_URL}/users/updateMe`;

      const form = new FormData();
      if (formValues.name) form.append("name", formValues.name);
      if (formValues.photo) form.append("photo", formValues.photo[0]);

      const response = await axios.patch(url, form);
      dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
      dispatch(loadUser(response.data.user.id));
    } catch (err) {
      dispatch({ type: UPDATE_USER_FAIL });
      console.log(err);
    }
  };
