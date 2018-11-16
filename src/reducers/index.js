import { combineReducers } from "redux";
import DisplayReducer from "./reducer_display";
import MapReducer from "./reducer_map";

const rootReducer = combineReducers({
  displayMap: DisplayReducer,
  map: MapReducer
});

export default rootReducer;
