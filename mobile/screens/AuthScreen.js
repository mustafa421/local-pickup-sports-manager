import React from "react";
import PropTypes from "prop-types";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { fbLogin, googleLogin } from "../actions/auth_actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    padding: 10
  }
});

class AuthScreen extends React.Component {
  componentDidMount() {
    const { dispatch, navigation } = this.props;
    const { loginMethod } = navigation.state.params;
    if (loginMethod === "fb") {
      dispatch(fbLogin());
    } else if (loginMethod === "google") {
      dispatch(googleLogin());
    }
    // AsyncStorage.removeItem("fb_token");
  }

  componentDidUpdate() {
    this.onAuthComplete();
  }

  onAuthComplete() {
    const { token, navigation } = this.props;
    if (token) {
      navigation.navigate("main");
    } else {
      navigation.navigate("welcome");
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

const mapStateToProps = ({ auth }) => ({ token: auth.token });

export default connect(mapStateToProps)(AuthScreen);

AuthScreen.propTypes = {
  token: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

AuthScreen.defaultProps = {
  token: null
};
