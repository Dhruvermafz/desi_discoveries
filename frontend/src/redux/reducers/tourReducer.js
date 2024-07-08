// reducers/tourReducer.js
import {
  FETCH_TOURS,
  FETCH_TOUR,
  CREATE_TOUR,
  UPDATE_TOUR,
  DELETE_TOUR,
} from "../type/types";

const initialState = {
  tours: [],
  tour: null,
  loading: false,
  error: null,
};

const tourReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOURS:
      return { ...state, tours: action.payload, loading: false };
    case FETCH_TOUR:
      return { ...state, tour: action.payload, loading: false };
    case CREATE_TOUR:
      return {
        ...state,
        tours: [...state.tours, action.payload],
        loading: false,
      };
    case UPDATE_TOUR:
      return {
        ...state,
        tours: state.tours.map((tour) =>
          tour.id === action.payload.id ? action.payload : tour
        ),
        loading: false,
      };
    case DELETE_TOUR:
      return {
        ...state,
        tours: state.tours.filter((tour) => tour.id !== action.payload),
        loading: false,
      };
    case "LOADING":
      return { ...state, loading: true };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default tourReducer;
