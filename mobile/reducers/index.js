import { combineReducers } from "redux";
import auth from "./auth_reducer";
import game from "./game_reducer";

/**
 * What our store contains:
 * token -> a string representing the user's token from their vendor
 * userAccountData -> { name, email, gender, age }
 * preferences - TODO -> Define what this looks like
 * games -> array of game objects
 *  e.g [{ title: "basketball", skillLevel: "begginner", duration: "1hr" }]
 */
export default combineReducers({
  auth,
  game
});
