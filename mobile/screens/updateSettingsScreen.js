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
class updateSettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Edit",
    headerRight: (
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
export default updateSettingsScreen;
