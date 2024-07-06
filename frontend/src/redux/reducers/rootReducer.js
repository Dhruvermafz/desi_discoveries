import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { tourReducer } from "./tourReducer";
import { reviewReducer } from "./reviewReducer";
import { alertReducer } from "./alertReducer";
import { checkoutReducer } from "./checkoutReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  tours: tourReducer,
  reviews: reviewReducer,
  alert: alertReducer,
  pay: checkoutReducer,
});

export default rootReducer;
