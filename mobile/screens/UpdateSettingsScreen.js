import React, { Component } from "react";
import { StyleSheet, View, Platform, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import {Text, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start"
  }
});
class UpdateSettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Edit",
    headerLeft: (
      <Button
        title="Cancel"
        textStyle={{ color: "rgba(0, 122, 255, 1)" }}
        onPress={() => navigation.navigate("settings")}
        backgroundColor="rgba(0,0,0,0)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === "android" ? 24 : 0 // To prevent overlapping from header in Android devices
    }
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  // eslint-disable-next-line class-methods-use-this
  async onPressButton(state) {
    const { navigation, userID, email, username } = this.props;
    const obj = {
      userID,
      name: state.nameVal,
      email: state.emailVal
    };
    // console.log(obj);
    if (obj.email === undefined || obj.email === "") {
      obj.email = email;
    }
    if (obj.name === undefined || obj.name === "") {
      obj.name = username;
    }
    try {
      const request = await fetch(
        "http://local-pickup-sports-manager.herokuapp.com/editUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(obj),
          json: true
        }
      );
      console.log(obj);
      console.log(`[DEBUG] Server responded with ${request.status}`);
      console.log(await request.json());
      navigation.navigate("settings");
    } catch (err) {
      console.log(`Error sending request to server ${err}`);
      // Add alert to tell user that something went wrong
    }
  }

  render() {
    const { emailVal, nameVal } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={{ padding: 50, color: "grey" }}
          placeholder="Name"
          selectedValue={(this.state && nameVal) || "a"}
          onChangeText={text => this.setState({ nameVal: text })}
        />
        <TextInput
          style={{ padding: 50, color: "grey" }}
          placeholder="Email address"
          selectedValue={(this.state && emailVal) || "a"}
          onChangeText={text => this.setState({ emailVal: text })}
        />
        <Button
          title="Update"
          backgroundColor="blue"
          onPress={() => this.onPressButton(this.state)}
        />
      </View>
    );
  }
}
const mapStateToProps = state => state.auth.userAccountData;

export default connect(mapStateToProps)(UpdateSettingsScreen);

UpdateSettingsScreen.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  userID: PropTypes.number
};

UpdateSettingsScreen.defaultProps = {
  userID: null
};
