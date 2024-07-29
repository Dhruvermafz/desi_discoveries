import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { reviewReducer } from "./reviewReducer";
import { alertReducer } from "./alertReducer";
import { checkoutReducer } from "./checkoutReducer";
import tourReducer from "./tourReducer";
import queryReducer from "./queryReducer";
import blogReducer from "./blogReducer";
import { userReducer } from "./userReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  tour: tourReducer,
  reviews: reviewReducer,
  alert: alertReducer,
  pay: checkoutReducer,
  query: queryReducer,
  blog: blogReducer,
});

export default rootReducer;
