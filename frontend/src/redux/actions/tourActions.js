import axios from "axios";
import {
  FETCH_TOURS,
  FETCH_TOUR,
  CREATE_TOUR,
  UPDATE_TOUR,
  DELETE_TOUR,
} from "../type/types";
import { BASE_URL } from "../../utils/config";
const API_URL = `${BASE_URL}`;

// Example of adding error handling to fetchTours action
export const fetchTours = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/tours`);
    dispatch({ type: FETCH_TOURS, payload: response.data });
  } catch (error) {
    console.error("Error fetching tours:", error);
    // Optionally dispatch an action to update Redux state with the error
    dispatch({ type: FETCH_TOURS, payload: [] }); // Update with appropriate error handling
  }
};

// Example of adding error handling to createTour action
export const createTour = (formValues) => async (dispatch) => {
  try {
    const formData = new FormData();
    // Append form values to formData as needed
    const response = await axios.post(`${API_URL}/tours`, formData);
    dispatch({ type: CREATE_TOUR, payload: response.data });
  } catch (err) {
    console.error("Error creating tour:", err);
    // Optionally dispatch an action to update Redux state with the error
    dispatch({ type: CREATE_TOUR, payload: null }); // Update with appropriate error handling
  }
};

// Similarly, apply error handling to fetchTour, updateTour, and deleteTour actions as needed

// GET ONE TOUR
export const fetchTour = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/tours/${id}`);
    dispatch({ type: FETCH_TOUR, payload: response.data });
  } catch (error) {
    console.error("Error fetching tour:", error);
  }
};

// UPDATE TOUR
export const updateTour = (id, formValues) => async (dispatch) => {
  try {
    const formData = new FormData();
    if (formValues.name) formData.append("name", formValues.name);
    if (formValues.summary) formData.append("summary", formValues.summary);
    if (formValues.description)
      formData.append("description", formValues.description);
    if (formValues.difficulty)
      formData.append("difficulty", formValues.difficulty);
    if (formValues.price) formData.append("price", formValues.price);
    if (formValues.maxGroupSize)
      formData.append("maxGroupSize", formValues.maxGroupSize);
    if (formValues.duration) formData.append("duration", formValues.duration);
    if (formValues.startLocation)
      formData.append("startLocation", formValues.startLocation);
    if (formValues.startDates)
      formData.append("startDates", formValues.startDates);

    if (formValues.imageCover)
      formData.append("imageCover", formValues.imageCover[0]);
    if (formValues.image1) formData.append("image1", formValues.image1[0]);
    if (formValues.image2) formData.append("image2", formValues.image2[0]);
    if (formValues.image3) formData.append("image3", formValues.image3[0]);

    const response = await axios.patch(`${API_URL}/tours/${id}`, formData);
    dispatch({ type: UPDATE_TOUR, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

// DELETE TOUR
export const deleteTour = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/tours/${id}`);
    dispatch({ type: DELETE_TOUR, payload: id });
  } catch (err) {
    console.log(err);
  }
};
