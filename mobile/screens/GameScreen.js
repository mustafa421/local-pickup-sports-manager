//Import Statements
import React, { Component } from "react";
import { View, Text } from "react-native";
import Game from "../components/game";

class GameScreen extends Component {
  render() {
    return (
      <View>
        <Text />
        <Text />
        <Text>GameScreen - Hello world</Text>
        <Game
          location={"Madison"}
          date={"11/30/18"}
          time={"12:00"}
          number_interested={3}
          number_going={4}
          difficulty={1}
        />
        <Text>Ahoy!</Text>
      </View>
    );
  }
}

export default GameScreen;
