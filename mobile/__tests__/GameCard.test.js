import React from "react";

import renderer from "react-test-renderer";

import GameCard from "../components/GameCard";

// test game card
describe("GameCard tests", () => {
  test("snapshot", () => {
    const tree = renderer.create(<GameCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
