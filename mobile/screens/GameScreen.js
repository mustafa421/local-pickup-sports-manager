import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
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
    title: "Game Screen",
    headerRight: (
      <Button
        title="Return to Main Screen"
        textStyle={{ color: "rgba(0, 122, 255, 1)" }}
        onPress={() => navigation.navigate("main")}
        backgroundColor="rgba(0,0,0,0)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === "android" ? 24 : 0 // To prevent overlapping from header in Android devices
    }
  });

  render() {
    const { gameID, userID } = this.props;

    return (
      <View>
        <Text />
        <Text />
        <View style={{ alignItems: "flex-start" }}>
          <Game
            name="Basketball"
            location="Madison"
            date="Tomorrow"
            time="12:00"
            number_interested={3}
            number_going={4}
            difficulty={1}
          />
        </View>
        <Button
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="Join Game"
          onPress={() =>
            joinGame({
              userID,
              gameID,
              name,
              interested: false
            })
          }
        />
        <Text />
        <Button
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="Interested in Game"
          onPress={() =>
            joinGame({
              userID,
              gameID,
              name,
              interested: true
            })
          }
        />
      </View>
    );
  }
}

export default GameScreen;
