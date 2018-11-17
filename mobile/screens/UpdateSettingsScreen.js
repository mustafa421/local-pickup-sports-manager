import React, { Component } from "react";
import { StyleSheet, View, Platform, TextInput } from "react-native";
import { Button } from "react-native-elements";
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
    headerRight: (
      <Button
        title="Update"
        textStyle={{ color: "rgba(0, 122, 255, 1)" }}
        onPress={() => this.onPressButton(this.state)}
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
    const obj = {
      phoneVal: state.phone,
      emailVal: state.email,
      nameVal: state.name
    };

    const { navigation } = this.props;

    try {
      const request = await fetch(
        "http://local-pickup-sports-manager.herokuapp.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(obj),
          json: true
        }
      );
      console.log(`[DEBUG] Server responded with ${request.status}`);
      console.log(await request.json());
      navigation.navigate("settings");
    } catch (err) {
      console.log(`Error sending request to server ${err}`);
      // Add alert to tell user that something went wrong
    }
  }

  render() {
    const { phone, email, name } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={{ padding: 50, color: "grey" }}
          placeholder="Name"
          selectedValue={(this.state && name) || "a"}
          onChangeText={text => this.setState({ name: text })}
        />
        <TextInput
          style={{ padding: 50, color: "grey" }}
          placeholder="Email address (optional)"
          selectedValue={(this.state && email) || "a"}
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          style={{ padding: 50, color: "grey" }}
          placeholder="Phone Number (optional)"
          keyboardType="numeric"
          maxLength={10}
          selectedValue={(this.state && phone) || "a"}
          onChangeText={text => this.setState({ phone: text })}
        />
      </View>
    );
  }
}
export default UpdateSettingsScreen;
