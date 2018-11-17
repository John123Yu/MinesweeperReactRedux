import { CHANGE_CLICKED, INIT_CLICKED } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case INIT_CLICKED:
      return action.payload;
    case CHANGE_CLICKED:
      return action.payload;
  }
  return state;
}
