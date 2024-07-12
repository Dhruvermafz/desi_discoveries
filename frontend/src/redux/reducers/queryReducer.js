import { FETCH_QUERIES_SUCCESS, FETCH_QUERIES_FAILURE } from "../type/types";

const initialState = {
  queries: [],
  error: null,
};

const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUERIES_SUCCESS:
      return {
        ...state,
        queries: action.payload,
        error: null,
      };
    case FETCH_QUERIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default queryReducer;
