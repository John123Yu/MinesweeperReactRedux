import { INIT_MAP } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case INIT_MAP:
      return action.payload;
  }
  return state;
}
