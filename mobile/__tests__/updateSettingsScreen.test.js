import React from "react";
import renderer from "react-test-renderer";
import UpdateSettingsScreen from "../screens/UpdateSettingsScreen";

describe("update settings screen tests", () => {
  test("snapshot", () => {
    const tree = renderer.create(<UpdateSettingsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
