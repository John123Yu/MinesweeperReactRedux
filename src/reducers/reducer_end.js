import { END_GAME } from "../actions/index";

export default function(state = false, action) {
  switch (action.type) {
    case END_GAME:
      return action.payload;
  }
  return state;
}
