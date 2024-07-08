import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { reviewReducer } from "./reviewReducer";
import { alertReducer } from "./alertReducer";
import { checkoutReducer } from "./checkoutReducer";
import tourReducer from "./tourReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  tour: tourReducer,
  reviews: reviewReducer,
  alert: alertReducer,
  pay: checkoutReducer,
});

export default rootReducer;
