import React, { Component } from "react";
import { Platform, ScrollView, RefreshControl } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Button } from "react-native-elements";
import Game from "../components/Game";

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
    joined: [],
    refreshing: false
  };

  async getJoined(gameID) {
    this.setState({ refreshing: true });
    try {
      const request = await fetch(
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
  }

  async getInterested(gameID) {
    try {
      const request = await fetch(
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

      this.setState({ interested: await request.json(), refreshing: false });
    } catch (err) {
      console.log(`Error getting joined users: ${err}`);
    }
  }

  render() {
    const { navigation } = this.props;
    const { joined, interested, refreshing } = this.state;
    const {
      title,
      sport,
      location,
      date,
      skillLevel,
      gameID
    } = navigation.state.params;

    /* eslint-disable react/jsx-wrap-multilines */
    return (
      <ScrollView
        contentContainerStyle={{ alignItems: "flex-start" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              this.getJoined(gameID);
              this.getInterested(gameID);
            }}
          />
        }
      >
        <NavigationEvents
          onWillFocus={() => {
            this.getJoined(gameID);
            this.getInterested(gameID);
          }}
        />
        <Game
          title={title}
          sport={sport}
          location={location}
          date={date}
          interested={interested}
          joined={joined}
          skillLevel={skillLevel}
        />
      </ScrollView>
    );
  }
}

export default GameScreen;
