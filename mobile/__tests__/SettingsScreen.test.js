import React from "react";
import renderer from "react-test-renderer";
import SettingsScreen from "../screens/SettingsScreen";

describe("sample test suite", () => {
  test("test", () => {
    expect(1 + 2).toBe(3);
  });

  test("snapshot", () => {
    const tree = renderer.create(<SettingsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
