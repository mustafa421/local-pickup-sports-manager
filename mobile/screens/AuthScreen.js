import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { fbLogin } from "../actions/auth_actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

class AuthScreen extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(googleLogin());
    AsyncStorage.removeItem("fb_token");
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
    return <View />;
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
