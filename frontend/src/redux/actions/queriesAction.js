import axios from "axios";
import { FETCH_QUERIES_SUCCESS, FETCH_QUERIES_FAILURE } from "../type/types";
import { BASE_URL } from "../../utils/config";
export const fetchQueries = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/contact`);
    console.log(res.data); // Ensure this prints the expected array of queries
    dispatch({ type: FETCH_QUERIES_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: FETCH_QUERIES_FAILURE, payload: error.message });
  }
};
export const deleteQuery = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/contact/${id}`);
    dispatch(fetchQueries()); // Optional: Refresh the queries list after deletion
  } catch (error) {
    console.error("Failed to delete query:", error);
  }
};
