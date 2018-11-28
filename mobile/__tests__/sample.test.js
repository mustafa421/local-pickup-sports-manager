import "react-native";

import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "../screens/WelcomeScreen";

describe("sample test suite", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });

  test("test", () => {
    expect(1 + 2).toBe(3);
  });

  test("snapshot", () => {
    const tree = renderer.create(<WelcomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
