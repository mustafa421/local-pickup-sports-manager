import React from "react";
import renderer from "react-test-renderer";
import updateSettingsScreen from "../screens/updateSettingsScreen";

describe("sample test suite", () => {
  test("test", () => {
    expect(1 + 2).toBe(3);
  });

  test("snapshot", () => {
    const tree = renderer.create(<updateSettingsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
