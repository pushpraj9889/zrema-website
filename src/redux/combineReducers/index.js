import { combineReducers } from "redux";
import { productReducer } from "../reducers";
import { userDetailsReducer } from "../reducers";

const rootReducer = combineReducers({
  product: productReducer,
  userDetailsReducer: userDetailsReducer,
  // Add other reducers here
});

export default rootReducer;
