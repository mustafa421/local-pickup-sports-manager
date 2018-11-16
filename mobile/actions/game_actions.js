import { NEW_GAMES } from "./types";

export const createGame = () => async dispatch => {};

/**
 *
 * @param {*} location - a string representing the users location
 * TODO - Expo gives us locations via lat/long coordinates, this should
 * be added to this function
 * @param {*} preferences - a fixed array representing the user's preferences
 */
export const getGames = (location, preferences) => async dispatch => {
  try {
    // TODO - Update link after merge to cloud
    const request = await fetch(
      `http://192.168.1.2:3000/getGames?location=${location}&preferences=${preferences}`,
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
