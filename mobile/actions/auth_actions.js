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

  if (type === "success") {
    try {
      await AsyncStorage.setItem("fb_token", token);
      dispatch({ type: LOGIN_SUCCESS, payload: token });
      const response = await fetch(
        `https://graph.facebook.com/v3.2/me?fields=id,name,gender,age_range,email&access_token=${token}`
      );
      // Call backend with newly acquired account information to create account
      const account = await response.json();
      AsyncStorage.setItem("account", JSON.stringify(account));
      // console.log(await response.json());
    } catch (err) {
      console.log(`Error saving facebook token ${err}`);
    }
  }
};

export const fbLogin = () => async dispatch => {
  let token;
  let account;
  try {
    token = await AsyncStorage.getItem("fb_token");
    account = JSON.parse(await AsyncStorage.getItem("account"));
  } catch (err) {
    console.log(`Error getting data from storage: ${err}`);
  }
  if (token) {
    // Dispatch succesful login
    console.log(`${account.name} logged in`);
    dispatch({ type: LOGIN_SUCCESS, payload: token });
  } else {
    // Open fb login
    doFacebookLogin(dispatch);
  }
};

export const googleLogin = () => {};
