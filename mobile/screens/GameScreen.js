//Import Statements
import React, { Component } from "react";
import { View, Text } from "react-native";
import Game from "../components/Game";



class GameScreen extends Component {

    render() {
        return (
          <View>
            <Text></Text>
            <Text></Text>
            <Text>GameScreen - Hello world</Text>
            <Game
              location={"madison"}
              date={"Tomorrow"}
              time={"12:00"}
              number_interested={3}
              number_going={4}
              difficulty={1}/>
            <Text>Ahoy!</Text> 
          </View>
        );
      }
}

export default GameScreen;