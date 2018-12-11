import React, { Component } from "react";
import { View, Text, Platform, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import Game from "../components/Game";

const joinGame = async userInfo => {
  try {
    // TODO - Swap out ip for backend value
    const request = await fetch(
      "http://local-pickup-sports-manager.herokuapp.com/joinGame",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo),
        json: true
      }
    );

    if (request.status !== 200) {
      throw Error("failed to connect to API");
    }
  } catch (ex) {
    console.log(ex);
  }
};

class GameScreen extends Component {
  componentDidMount() {
    const { gameID, userID } = this.props;
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Button
        title="Settings"
        textStyle={{ color: "black" }}
        onPress={() => navigation.navigate("settings")}
        backgroundColor="paleturquoise"
        buttonStyle={{ borderColor: "black", borderWidth: 1, borderRadius: 5 }}
      />
    ),
    headerLeft: (
      <Button
        title="Return to Main Screen"
        textStyle={{ color: "black" }}
        onPress={() => navigation.navigate("main")}
        backgroundColor="paleturquoise"
        buttonStyle={{ borderColor: "black", borderWidth: 1, borderRadius: 5 }}
      />
    ),
    headerStyle: {
      backgroundColor: "#03A9F4",
      marginTop: Platform.OS === "android" ? 24 : 0 // To prevent overlapping from header in Android devices
    }
  });

  render() {
    const { gameID, userID } = this.props;

    return (
      <ScrollView contentContainerStyle={{ alignItems: "flex-start" }}>
        <Game
          title="2v2 Pickup Basketball"
          name="Basketball"
          location="Madison"
          date="Tomorrow"
          time="12:00"
          number_interested={3}
          number_going={4}
          difficulty={1}
        />
      </ScrollView>
    );
  }
}

export default GameScreen;
