import React from "react";
import "react-native";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAsyncStorage from "mock-async-storage";
import fetchMock from "fetch-mock";
import { AsyncStorage } from "react-native";
import { shallow } from "enzyme";
import Button from "./Button";
import renderer from "react-test-renderer";

import GameCard from "../components/GameCard";

// test join game (component is sending post requests)
describe("GameCard tests", () => {
  test("snapshot", () => {
    const tree = renderer.create(<GameCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
