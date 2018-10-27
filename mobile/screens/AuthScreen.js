import React from "react";
import { View, Text, StyleSheet } from "react-native";
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
    dispatch(fbLogin());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Not supposed to show</Text>
      </View>
    );
  }
}

export default connect()(AuthScreen);
