import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAsyncStorage from "mock-async-storage";
import fetchMock from "fetch-mock";
import { AsyncStorage } from "react-native";
import { fbLogin } from "../actions/auth_actions";
import { LOGIN_SUCCESS } from "../actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/**
 * Prepare mock for AsyncStorage since we don't have a physical device
 * during testing
 */

const mock = () => {
  const mockImpl = new MockAsyncStorage();
  jest.mock("AsyncStorage", () => mockImpl);
};

mock();

describe("Facebook Auth Flow", () => {
  test("Authenticates user with existing token", async () => {
    // Our mocked customer
    const customerMock = {
      name: "Bob",
      email: "bobsemail@gmail.com",
      gender: "male"
    };

    // Add fake tokens to storage
    AsyncStorage.setItem("fb_token", "123");
    AsyncStorage.setItem("fb_token_expire", "1604206800000");

    /**
     *  Mock our fetch calls to immediately return our fake
     *  customer data.
     */
    fetchMock.getOnce("*", customerMock);
    fetchMock.postOnce(
      "http://local-pickup-sports-manager.herokuapp.com/loginUser",
      customerMock
    );

    // Describe the actions that we expect our store to have
    const expectedActions = [
      {
        type: LOGIN_SUCCESS,
        payload: { token: "123", userAccountData: customerMock }
      }
    ];

    // Create our mock store and dispatch our login flow
    const store = mockStore();
    await store.dispatch(fbLogin());
    // Check to see if we match
    expect(store.getActions()).toEqual(expectedActions);
  });
});
