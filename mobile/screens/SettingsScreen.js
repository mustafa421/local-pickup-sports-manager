import React, { Component } from "react";
import { View, Text, Platform, Dimensions } from "react-native";
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
        backgroundColor="paleturquoise"
        buttonStyle={{ borderColor: "black", borderWidth: 1, borderRadius: 5 }}
      />
    ),
    headerStyle: {
      backgroundColor: "#03A9F4",
      marginTop: Platform.OS === "android" ? 24 : 0 // To prevent overlapping from header in Android devices
    }
  });

  render() {
    const { username, email, navigation, dispatch } = this.props;
    return (
      <View
        style={{
          backgroundColor: "paleturquoise",
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
        }}
      >
        <Text
          style={{
            padding: 50,
            color: "blue"
          }}
        >
          {"Name: " + username}
        </Text>
        <Text
          style={{
            padding: 50,
            color: "blue"
          }}
        >
          {"Email: " + email}
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
