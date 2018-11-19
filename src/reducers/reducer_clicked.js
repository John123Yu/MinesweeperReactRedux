import {
  CHANGE_CLICKED,
  INIT_CLICKED,
  MOVE_BACK_CLICK,
  MOVE_FORWARD_CLICK
} from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case INIT_CLICKED:
      return action.payload;
    case CHANGE_CLICKED:
      return action.payload;
    case MOVE_BACK_CLICK:
      return action.payload;
    case MOVE_FORWARD_CLICK:
      return action.payload;
  }
  return state;
}
