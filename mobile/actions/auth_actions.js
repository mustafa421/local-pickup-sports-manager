import { AsyncStorage } from "react-native";
import { Facebook } from "expo";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "./types";

// Helper methods
const setupUserData = async (userInfo, token, dispatch) => {
  // Call backend with newly acquired account information to create account
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

  const userAccountData = await request.json(); // check http status
  dispatch({ type: LOGIN_SUCCESS, payload: { token, userAccountData } });
};

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
      // dispatch({ type: LOGIN_SUCCESS, payload: token });
      const response = await fetch(
        `https://graph.facebook.com/v3.2/me?fields=id,name,gender,age_range,email&access_token=${token}`
      );

      const account = await response.json();
      console.log("Retrieve account from facebook login: ");
      console.log(account);

      setupUserData(account, token, dispatch);
      // Call backend with newly acquired account information to create account
      // const request = await fetch(
      //   "http://local-pickup-sports-manager.herokuapp.com/loginUser",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify(account),
      //     json: true
      //   }
      // );

      // console.log((await request.json()).status);
    } catch (err) {
      console.log(`Error saving facebook token ${err}`);
    }
  }
};

export const fbLogin = () => async dispatch => {
  let token;
  try {
    token = await AsyncStorage.getItem("fb_token");
  } catch (err) {
    console.log(`Error getting data from storage: ${err}`);
  }

  // TODO - Check for expired tokens
  // If the user already has a token
  if (token) {
    const response = await fetch(
      `https://graph.facebook.com/v3.2/me?fields=id,name,gender,age_range,email&access_token=${token}`
    );

    const account = await response.json(); // should be in try-catch
    const statusCode = response.status;

    if (statusCode !== 200) {
      // Do something
      dispatch({ type: LOGIN_FAIL });
      console.log(`Server responded ${statusCode}`);
    } else {
      setupUserData(account, token, dispatch);
    }
  } else {
    // Open fb login
    doFacebookLogin(dispatch);
  }
};

export const googleLogin = () => {};
