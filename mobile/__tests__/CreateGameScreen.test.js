import React from "react";
import renderer from "react-test-renderer";
import CreateGameScreen from "../screens/CreateGameScreen";

describe("createGameScreen tests", () => {
  test("snapshot", () => {
    const tree = renderer.create(<CreateGameScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
