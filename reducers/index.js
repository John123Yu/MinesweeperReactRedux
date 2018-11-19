import { combineReducers } from "redux";
import DisplayReducer from "./reducer_display";
import ClickedReducer from "./reducer_clicked";
import EndReducer from "./reducer_end";

const rootReducer = combineReducers({
  displayMap: DisplayReducer,
  clickedMap: ClickedReducer,
  game_completed: EndReducer
});

export default rootReducer;
