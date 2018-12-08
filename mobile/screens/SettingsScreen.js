import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { Button } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { doLogout } from "../actions/auth_actions";

export class SettingsScreen extends Component {
  // A feature from React Navigation to define a title
  static navigationOptions = ({ navigation }) => ({
    title: "Profile",
    headerRight: (
      <Button
        title="Edit"
        textStyle={{ color: "rgba(0, 122, 255, 1)" }}
        onPress={() => navigation.navigate("updateSettingsScreen")}
        backgroundColor="rgba(0,0,0,0)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === "android" ? 24 : 0 // To prevent overlapping from header in Android devices
    }
  });

  setupUserData = async (userInfo, token, dispatch) => {
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
      const userAccountData = await request.json();
      dispatch({ payload: { token, userAccountData } });
    } catch (err) {
      console.log(`Error retrieving user account from backend: ${err}`);
    }
  };

  render() {
    this.setupUserData();
    const { username, email, navigation, dispatch } = this.props;
    return (
      <View>
        <Text
          style={{
            padding: 50,
            color: "blue"
          }}
        >
          Name:
          {username}
        </Text>
        <Text
          style={{
            padding: 50,
            color: "blue"
          }}
        >
          Email:
          {email}
        </Text>
        <Button
          raised
          title="Logout"
          backgroundColor="#E31414"
          onPress={() => {
            dispatch(doLogout(navigation));
            // Reset history so we won't directed back to the settings screen
            navigation.reset(
              [NavigationActions.navigate({ routeName: "mainScreen" })],
              0
            );
            navigation.navigate("welcome");
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => state.auth.userAccountData;

export default connect(mapStateToProps)(SettingsScreen);

SettingsScreen.propTypes = {
  dispatch: PropTypes.func,
  username: PropTypes.string,
  email: PropTypes.string
};

SettingsScreen.defaultProps = {
  dispatch: null,
  username: "",
  email: ""
};
