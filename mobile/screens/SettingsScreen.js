import React, { Component } from "react";

import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Button } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { doLogout } from "../actions/auth_actions";

const styles = StyleSheet.create({
  prefButton: {
    position: "absolute",
    width: 76,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 0,
    backgroundColor: "#03A9F4",
    borderRadius: 20,
    elevation: 8
  },
  prefIcon: {
    fontSize: 11,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  logoutButton: {
    flex: 1,
    height: 80,
    padding: 100
  }
});

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

  render() {
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

        <View style={styles.logoutButton}>
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
        <View style={{flex: 2}}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PreferencesScreen")}
            style={styles.prefButton}
          >
            <Text style={styles.prefIcon}>Game Preferences</Text>
          </TouchableOpacity>
        </View>
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

