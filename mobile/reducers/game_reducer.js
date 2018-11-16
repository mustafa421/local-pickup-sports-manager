import { NEW_GAMES } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case NEW_GAMES: {
      const games = action.payload;
      return { games };
    }
    default:
      return state;
  }
};
