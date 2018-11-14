import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
// import fetchMock from "fetch-mock";
import { AsyncStorage } from "react-native";
import { fbLogin } from "../actions/auth_actions";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Facebook Auth Flow", () => {
  test("Returns token if it exists", async () => {
    // Mock Async item
    await AsyncStorage.setItem("fb_token", "123");
    await AsyncStorage.setItem("fb_token_expire", "1920582852000");

    const customerMock = {
      name: "Bob",
      email: "bobsemail@gmail.com",
      gender: "male"
    };

    // fetchMock.getOnce("*", customerMock);

    // fetchMock.postOnce(
    //   "http://local-pickup-sports-manager.herokuapp.com/loginUser",
    //   customerMock
    // );
    const expectedActions = [
      {
        type: LOGIN_SUCCESS,
        auth_reducer: { token: 123, userAccount: customerMock }
      }
    ];

    const store = mockStore();
    await store.dispatch(fbLogin());
    console.log("Here");
    console.log(store);
    console.log(store.getActions());
    expect(store.getActions()).toBe(expectedActions);
  });
});
