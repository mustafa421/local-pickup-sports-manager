import React, { Component } from "react";
import { View, Text, Button, Platform } from "react-native";

class SettingsScreen extends Component {
  // A feature from React Navigation to define a title
  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
    headerRight: (
      <Button
        title="Edit"
        textStyle={{ color: "rgba(0, 122, 255, 1)" }}
        onPress={() => navigation.navigate("updateSettingsScreen")}
        backgroundColor="rgba(0,0,0,0)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === "android" ? 24 : 0 // To prevent overlapping from header in Android devices
    }
  });

  // eslint-disable-next-line class-methods-use-this
  async dispatch() {
    try {
      const request = await fetch(
        `http://local-pickup-sports-manager.herokuapp.com/`,
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
      // const user = await request.json();
      // dispatch({ type: NEW_GAMES, payload: games });
    } catch (err) {
      console.log(`Error sending request to server ${err}`);
    }
  }

  render() {
    return (
      <View>
        <Text
          style={{
            padding: 50,
            color: "grey"
          }}
        >
          Name: Max Glickman
        </Text>
        <Text
          style={{
            padding: 50,
            color: "grey"
          }}
        >
          Email: mglickman@wisc.edu
        </Text>
        <Text
          style={{
            padding: 50,
            color: "grey"
          }}
        >
          Phone Number: Not Provided
        </Text>
      </View>
    );
  }
}

export default SettingsScreen;
