import axios from "axios";
import { FETCH_REVIEWS } from "../type/types";
// GET ALL REVIEWS
export const fetchReviews = () => async (dispatch) => {
  const response = await axios.get("/reviews");

  dispatch({ type: FETCH_REVIEWS, payload: response.data });
};
