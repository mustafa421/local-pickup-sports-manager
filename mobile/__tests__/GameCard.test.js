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
import MainScreen from "../screens/MainScreen";

import GameCard from "../components/GameCard";

// test join game (component is sending post requests)
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = () => {
  const mockImpl = new MockAsyncStorage();
  jest.mock("AsyncStorage", () => mockImpl);
};

mock();

describe("Testing GameCard Components", () => {
  test("Component sends post request", () => {
    const customerMock = {
      name: "Bob",
      email: "bobsemail@gmail.com",
      gender: "male"
    };

    fetchMock.getOnce("*", customerMock);
    fetchMock.postOnce(
      "http://local-pickup-sports-manager.herokuapp.com/loginUser",
      customerMock
    );

    // Check to see if we match
    const store = mockStore();
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("Test click event", () => {
    const mockCallBack = jest.fn();

    const button = shallow(<Button onPress={mockCallBack}>Ok!</Button>);
    button.find("button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  test("snapshot", () => {
    const tree = renderer.create(<MainScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
