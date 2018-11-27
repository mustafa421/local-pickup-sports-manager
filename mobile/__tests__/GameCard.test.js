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
          skillLevel="Begginner"
          duration="1 hour"
          name="Bob"
          title="Basketball"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
