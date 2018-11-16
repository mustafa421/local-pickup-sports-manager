import { NEW_GAMES } from "./types";

export const createGame = () => async dispatch => {};

export const getGames = (location, preferences) => async dispatch => {
  try {
    const request = await fetch("http://192.168.1.2:3000/getGames", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      qs: { location, preferences }
    });

    if (request.status !== 200) {
      throw new Error(`Request returned ${request.status}`);
    }

    const games = await request.json();
    dispatch({ type: NEW_GAMES, payload: games });
  } catch (err) {
    console.log(`Error when sending getGames request: ${err}`);
  }
};
