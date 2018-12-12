import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import Game from "../components/Game";

const getJoined = async gameID => {
  try {
    const request = fetch(
      `http://local-pickup-sports-manager.herokuapp.com/getJoined?gameID=${gameID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (request.status !== 200) {
      throw new Error(`Request returned ${request.status}`);
    }

    this.setState({ joined: await request.json() });
  } catch (err) {
    console.log(`Error getting joined users: ${err}`);
  }
};

const getInterested = async gameID => {
  try {
    const request = fetch(
      `https://local-pickup-sports-manager.herokuapp.com/getInterested?gameID=${gameID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (request.status !== 200) {
      throw new Error(`Request returned ${request.status}`);
    }

    this.setState({ interested: await request.json() });
  } catch (err) {
    console.log(`Error getting joined users: ${err}`);
  }
};

class GameScreen extends Component {
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

  state = {
    interested: [],
    joined: []
  };

  componentDidMount() {
    const { navigation } = this.props;
    const { gameID } = navigation.state.params;
    getJoined(gameID);
    getInterested(gameID);
  }

  render() {
    const { joined, interested } = this.state;
    return (
      <ScrollView contentContainerStyle={{ alignItems: "flex-start" }}>
        <Game
          title="2v2 Pickup Basketball"
          name="Basketball"
          location="Madison"
          date="Tomorrow"
          time="12:00"
          number_interested={interested.length}
          number_going={joined.length}
          difficulty={1}
        />
      </ScrollView>
    );
  }
}

export default GameScreen;
