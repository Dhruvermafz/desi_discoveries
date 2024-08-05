import axios from "axios";
import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../type/types";
import { setAlert } from "./alertAction";
import { BASE_URL } from "../../utils/config";

const API_URL = `${BASE_URL}/users`;

// Fetch all users
export const fetchAllUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data.data });
  } catch (err) {
    dispatch({ type: FETCH_USERS_FAIL });
    dispatch(setAlert(err.response?.data?.message || "Failed to fetch users"));
  }
};

// Update user profile photo
export const updateProfilePhoto = (userId, photo) => async (dispatch) => {
  try {
    const response = await axios.patch(`${API_URL}/${userId}/photo`, {
      avatar: photo,
    });
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data.user });
    dispatch(setAlert("Profile photo updated successfully", "success"));
  } catch (err) {
    dispatch({ type: UPDATE_USER_FAIL });
    dispatch(
      setAlert(err.response?.data?.message || "Failed to update profile photo")
    );
  }
};

// Update user password
export const updateUserPassword =
  (userId, oldPassword, newPassword) => async (dispatch) => {
    try {
      const response = await axios.patch(`${API_URL}/${userId}/password`, {
        oldPassword,
        newPassword,
      });
      dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data.user });
      dispatch(setAlert("Password updated successfully", "success"));
    } catch (err) {
      dispatch({ type: UPDATE_USER_FAIL });
      dispatch(
        setAlert(err.response?.data?.message || "Failed to update password")
      );
    }
  };

// Delete user
export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${userId}`);
    dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
    dispatch(setAlert("User deleted successfully", "success"));
  } catch (err) {
    dispatch({ type: DELETE_USER_FAIL });
    dispatch(setAlert(err.response?.data?.message || "Failed to delete user"));
  }
};
