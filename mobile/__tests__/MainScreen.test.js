import React from "react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchMock } from "fetch-mock";
import renderer from "react-test-renderer";
import { getGames } from "../actions/game_actions";
import { NEW_GAMES } from "../actions/types";
import { MainScreen } from "../screens/MainScreen";
import gameReducer from "../reducers/game_reducer";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing Main Screen functionality", () => {
  test("Main screen getGames action creator correctly adds games to store", async () => {
    const store = mockStore();

    // Set up mocked games
    const mockReturnedGames = [
      {
        title: "Basketball",
        skillLevel: "Beginner",
        duration: "2 Hours"
      },
      {
        title: "Football",
        skillLevel: "Intermediate",
        duration: "1 hour"
      },
      {
        title: "Soccer",
        skillLevel: "Expert",
        duration: "30 minutes"
      }
    ];

    // Mock the endpoint
    fetchMock.getOnce("*", mockReturnedGames);

    // Set up expected state
    const expectedActions = [
      {
        type: NEW_GAMES,
        payload: mockReturnedGames
      }
    ];

    // Call the action creator
    await store.dispatch(getGames());

    // Test that the action was received in the store
    expect(store.getActions()).toEqual(expectedActions);

    // Test our reducer correctly sets the required property
    expect(gameReducer({}, expectedActions[0])).toEqual({
      games: mockReturnedGames
    });
  });

  test("Main screen populates fixed games to match snapshopt", () => {
    const games = [
      {
        title: "Basketball",
        skillLevel: "Beginner",
        duration: "2 Hours"
      },
      {
        title: "Football",
        skillLevel: "Intermediate",
        duration: "1 hour"
      },
      {
        title: "Soccer",
        skillLevel: "Expert",
        duration: "30 minutes"
      },
      {
        title: "Hockey",
        skillLevel: "Beginner",
        duration: "1 hour"
      }
    ];

    // Pass dummy dispatch prop that returns our hardcoded games
    const tree = renderer
      .create(<MainScreen dispatch={() => games} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
