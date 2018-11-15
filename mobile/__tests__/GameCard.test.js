import React from "react";
import "react-native";
import renderer from "react-test-renderer";

import GameCard from "../components/GameCard";

//test snapshots with different parameters

//test join game (component is sending post requests)

describe("sample test suite", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });

  test("test", () => {
    expect(1 + 2).toBe(3);
  });

  test("snapshot", () => {
    const tree = renderer.create(<GameCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
