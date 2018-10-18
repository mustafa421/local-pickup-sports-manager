import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

class MainScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Main",
    headerRight: (
      <Button
        title="Settings"
        onPress={() => navigation.navigate("settings")}
      />
    )
  });

  render() {
    return (
      <View>
        <Text>MainScreen - Hello world</Text>
      </View>
    );
  }
}

export default MainScreen;
