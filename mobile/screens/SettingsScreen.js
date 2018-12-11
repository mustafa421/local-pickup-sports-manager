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
import { Constants } from 'expo';

const styles = StyleSheet.create({
  prefButton: {
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

          <Button
            raised
            title="Logout"
            backgroundColor="#E31414"
            containerStyle={{ 
              margin: 5,
              padding: 10,
              flex: 1
            }}
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
        <View style={styles.prefButton}>
          <Button
            onPress={() => navigation.navigate("PreferencesScreen")}
            containerStyle={{flex: 1}}
            buttonStyle={{
              width: 200,
              height: 50
            }}
            title="Game Preferences"
            backgroundColor="#0000FF"
          >
          </Button>
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

