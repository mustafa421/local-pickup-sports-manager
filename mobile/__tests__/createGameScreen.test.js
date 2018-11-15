import React from "react";
import renderer from "react-test-renderer";
import CreateGameScreen from "../screens/CreateGameScreen";

describe("sample test suite", () => {
  test("test", () => {
    expect(1 + 2).toBe(3);
  });

  test("snapshot", () => {
    const tree = renderer.create(<CreateGameScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
