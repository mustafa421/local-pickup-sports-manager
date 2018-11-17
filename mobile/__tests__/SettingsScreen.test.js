import React from "react";
import renderer from "react-test-renderer";
import SettingsScreen from "../screens/SettingsScreen";

describe("Settings screen test", () => {
  test("snapshot", () => {
    const tree = renderer.create(<SettingsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
