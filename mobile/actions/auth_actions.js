import { AsyncStorage } from "react-native";
import { Facebook } from "expo";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "./types";

// Helper methods

// Call backend with newly acquired account information to create account or to retrieve existing account stats
const setupUserData = async (userInfo, token, dispatch) => {
  try {
    const request = await fetch(
      "http://local-pickup-sports-manager.herokuapp.com/loginUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo),
        json: true
      }
    );

    // check whether our API failed or not
    if (request.status !== 200) {
      dispatch({ type: LOGIN_FAIL });
    }

    const userAccountData = await request.json();
    dispatch({ type: LOGIN_SUCCESS, payload: { token, userAccountData } });
  } catch (err) {
    console.log(`Error retrieving user account from backend: ${err}`);
  }
};

// Gets facebook login token
const doFacebookLogin = async dispatch => {
  const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync(
    "314718532447126",
    {
      permissions: ["public_profile", "email"]
    }
  );

  if (type === "cancel") {
    dispatch({ type: LOGIN_FAIL });
    return null;
  }

  if (type === "success") {
    try {
      await AsyncStorage.setItem("fb_token", token); // save the user's token to their device
      await AsyncStorage.setItem(
        "fb_token_expire",
        (expires * 1000).toString() // since expired token is in seconds since epoch and not milliseconds
      );
    } catch (err) {
      console.log(`Error saving facebook token ${err}`);
    }
  }

  return token;
};

export const fbLogin = () => async dispatch => {
  let token;
  let expiration;
  try {
    token = await AsyncStorage.getItem("fb_token");
    expiration = await AsyncStorage.getItem("fb_token_expire");
  } catch (err) {
    console.log(`Error getting data from storage: ${err}`);
  }

  // If the user doesn't have a token or their token has expired, have them sign in
  if (!token || parseInt(expiration, 10) < Date.now()) {
    token = await doFacebookLogin(dispatch);
    if (!token) {
      return;
    }
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v3.2/me?fields=id,name,gender,age_range,email&access_token=${token}`
    );

    const account = await response.json();
    await setupUserData(account, token, dispatch);
  } catch (err) {
    console.log(`Error fetching user account data: ${err}`);
  }
};

export const googleLogin = () => {};
