import React, { Component } from "react";
import { StyleSheet, View, Platform, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { UPDATE_ACCOUNT } from "../actions/types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start"
  }
});
export class UpdateSettingsScreen extends Component {
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
  async onPressButton() {
    const { nameVal, emailVal } = this.state;
    const { navigation, userID, username, email, dispatch } = this.props;
    const obj = {
      userID,
      name: !nameVal ? username : nameVal,
      email: !emailVal ? email : emailVal
    };

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

      if (request.status !== 200) {
        throw new Error(await request.json());
      }

      obj.username = obj.name;
      dispatch({ type: UPDATE_ACCOUNT, payload: { userAccountData: obj } });
      navigation.navigate("settings");
    } catch (err) {
      console.log(`Error sending request to server ${err}`);
      // Add alert to tell user that something went wrong
    }
  }

  render() {
    const { username, email } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={{ padding: 50, color: "grey" }}
          placeholder="Name"
          defaultValue={username}
          onChangeText={text => this.setState({ nameVal: text })}
        />
        <TextInput
          style={{ padding: 50, color: "grey" }}
          placeholder="Email address"
          defaultValue={email}
          onChangeText={text => this.setState({ emailVal: text })}
        />
        <Button
          title="Update"
          backgroundColor="blue"
          onPress={() => this.onPressButton()}
        />
      </View>
    );
  }
}
const mapStateToProps = state => state.auth.userAccountData;

export default connect(mapStateToProps)(UpdateSettingsScreen);

UpdateSettingsScreen.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  userID: PropTypes.number,
  username: PropTypes.string,
  email: PropTypes.string
};

UpdateSettingsScreen.defaultProps = {
  userID: null,
  username: "",
  email: ""
};
