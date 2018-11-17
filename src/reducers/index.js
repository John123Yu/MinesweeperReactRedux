import { combineReducers } from "redux";
import DisplayReducer from "./reducer_display";
import ClickedReducer from "./reducer_clicked";
import MapReducer from "./reducer_map";

const rootReducer = combineReducers({
  displayMap: DisplayReducer,
  clickedMap: ClickedReducer
});

export default rootReducer;
