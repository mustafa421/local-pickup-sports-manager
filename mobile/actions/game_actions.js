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

    const games = await request.json();
    dispatch({ type: NEW_GAMES, payload: games });
  } catch (err) {
    console.log(`Error when sending getGames request: ${err}`);
  }
};
