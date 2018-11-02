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

      const account = await response.json();
      console.log(account);

      // Call backend with newly acquired account information to create account
      const request = await fetch("http://192.168.1.242:3000/createGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(account),
        json: true
      });

      console.log((await request.json()).status);

      // AsyncStorage.setItem("account", JSON.stringify(account));
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

export const googleLogin = () => async dispatch => {
  try {
  const result = await Expo.Google.logInAsync({
    androidClientId:
      "481589760389-kjshadjlhbrfgquvf5iqv7u037s24heq.apps.googleusercontent.com",
    //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
    scopes: ["profile", "email"]
  })

  if (result.type === "success") {
    this.setState({
      signedIn: true,
      name: result.user.name,
      photoUrl: result.user.photoUrl
    })
  } else {
    console.log("cancelled")
  }
} catch (e) {
  console.log("error", e)
}
};
