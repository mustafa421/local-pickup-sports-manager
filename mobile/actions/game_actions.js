import { AsyncStorage } from "react-native";
import { NEW_GAMES } from "./types";

export const createGame = () => async dispatch => {};

/**
 *
 * @param {*} latitude - a number
 * @param {*} longitude - a number
 * @param {*} preferences - a fixed array representing the user's preferences
 */
export const getGames = (
  latitude,
  longitude,
  preferences
) => async dispatch => {
  try {
    const request = await fetch(
      `http://local-pickup-sports-manager.herokuapp.com/getGames?latitude=${latitude}&longitude=${longitude}&preferences=${preferences}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (request.status !== 200) {
      throw new Error(`Request returned ${request.status}`);
    }

    let games = await request.json();

    // Check interested and joined games
    let interested = await AsyncStorage.getItem("interestedGames");
    let joined = await AsyncStorage.getItem("joinedGames");

    if (interested) {
      interested = JSON.parse(interested);
    }

    if (joined) {
      joined = JSON.parse(joined);
    }

    // Filter the games that were joined/interested and disable their buttons
    if (games) {
      games = games.map(game => {
        const ret = Object.assign({}, game);
        if (interested && interested.includes(game.gameID)) {
          ret.interested = true;
        }

        if (joined && joined.includes(game.gameID)) {
          ret.joined = true;
        }

        return ret;
      });
    }

    dispatch({ type: NEW_GAMES, payload: games });
  } catch (err) {
    console.log(`Error when sending getGames request: ${err}`);
  }
};
