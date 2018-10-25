import React, { Component } from "react";
import { View, Text } from "react-native";

class SettingsScreen extends Component {
  // A feature from React Navigation to define a title
  static navigationOptions = () => ({
    title: "Settings"
  });

  render() {
    return (
      <View>
        <Text>SettingsScreen - Hello World</Text>
      </View>
    );
  }
}

export default SettingsScreen;
