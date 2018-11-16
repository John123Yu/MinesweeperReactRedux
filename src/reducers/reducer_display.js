import { INIT_DISPLAY, CLICK_ACTION } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case INIT_DISPLAY:
      return action.payload;
    case CLICK_ACTION:
      return action.payload;
  }
  return state;
}
