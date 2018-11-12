import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { Button } from "react-native-elements";
import Game from '../components/Game';

class MainScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Main",
    headerLeft: (
      <Button
        title="Settings"
        textStyle={{ color: "rgba(0, 122, 255, 1)" }}
        onPress={() => navigation.navigate("settings")}
        backgroundColor="rgba(0,0,0,0)"
      />
    ),
    headerRight: (
      <Button
        title="Create Game"
        textStyle={{ color: "rgba(0, 122, 255, 1)" }}
        onPress={() => navigation.navigate("createGameScreen")}
        backgroundColor="rgba(0,0,0,0)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === "android" ? 24 : 0 // To prevent overlapping from header in Android devices
    }
  });

  render() {
    return (
      <View>
        <Text>MainScreen - Hello world</Text>
        <Game location='Bascom' date='11/12/2018' time='1:00'
              number_going='2' number_interested='3'
              difficulty='8'/>
      </View>
    );
  }
}

export default MainScreen;
