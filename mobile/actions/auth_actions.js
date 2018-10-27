import { AsyncStorage } from "react-native";
import { Facebook } from "expo";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "./types";

// Helper methods
const doFacebookLogin = async dispatch => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    "314718532447126",
    {
      permissions: ["public_profile", "email"]
    }
  );

  if (type === "cancel") {
    dispatch({ type: LOGIN_FAIL });
  }

  try {
    await AsyncStorage.setItem("fb_token", token);
    dispatch({ type: LOGIN_SUCCESS, payload: token });
  } catch (err) {
    console.log(`Error saving facebook token ${err}`);
  }
};

export const fbLogin = () => async dispatch => {
  let token;
  try {
    token = await AsyncStorage.getItem("fb_token");
  } catch (err) {
    console.log(`Error getting data from storage: ${err}`);
  }
  if (token) {
    // Dispatch succesful login
    dispatch({ type: LOGIN_SUCCESS, payload: token });
  } else {
    // Open fb login
    doFacebookLogin(dispatch);
  }
};

export const googleLogin = () => {};
