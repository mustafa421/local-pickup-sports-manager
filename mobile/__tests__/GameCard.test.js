import React from "react";
import renderer from "react-test-renderer";
import { GameCard } from "../components/GameCard";

// test game card
describe("GameCard tests", () => {
  test("snapshot", () => {
    const tree = renderer
      .create(
        <GameCard
          userID={123}
          gameID={211}
          skillLevel="Begginner"
          duration={1}
          name="Bob"
          title="Basketball"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
