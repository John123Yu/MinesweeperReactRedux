import { INIT_DISPLAY, CLICK_ACTION } from "../actions/index";

export default function(state = [], action) {
  console.log(action.type);
  switch (action.type) {
    case INIT_DISPLAY:
      console.log(action.payload);
      return action.payload;
    case CLICK_ACTION:
      return action.payload;
  }
  return state;
}
