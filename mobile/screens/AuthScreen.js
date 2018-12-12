import React from "react";
import PropTypes from "prop-types";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  AsyncStorage
} from "react-native";
import { withNavigationFocus } from "react-navigation";
import { connect } from "react-redux";
import { LOGOUT } from "../actions/types";
import { fbLogin, googleLogin } from "../actions/auth_actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "paleturquoise"
  },
  horizontal: {
    flexDirection: "row",
    padding: 10
  }
});

class AuthScreen extends React.Component {
  componentDidMount() {
    this.initiateLogin();
  }

  componentDidUpdate() {
    const { isFocused } = this.props;

    if (isFocused) {
      this.onAuthComplete();
    }
  }

  onAuthComplete() {
    const { dispatch, token, navigation, logoutStatus } = this.props;
    if (token) {
      navigation.navigate("main");
      return;
    }

    if (logoutStatus) {
      this.initiateLogin();
    } else {
      dispatch({ type: LOGOUT });
      AsyncStorage.removeItem("fb_token"); // invalidate any existing tokens
      navigation.navigate("welcome");
    }
  }

  initiateLogin() {
    const { dispatch, navigation } = this.props;
    const { loginMethod } = navigation.state.params;
    if (loginMethod === "fb") {
      dispatch(fbLogin());
    } else if (loginMethod === "google") {
      dispatch(googleLogin());
    }
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text>Loading... </Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  token: auth.token,
  logoutStatus: auth.logoutStatus
});

export default withNavigationFocus(connect(mapStateToProps)(AuthScreen));

AuthScreen.propTypes = {
  token: PropTypes.string,
  isFocused: PropTypes.bool.isRequired,
  logoutStatus: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

AuthScreen.defaultProps = {
  token: null,
  logoutStatus: false
};
