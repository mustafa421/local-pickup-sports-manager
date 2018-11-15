import React, { Component } from "react";
import { View, ScrollView, Platform } from "react-native";
import { Button } from "react-native-elements";
import { GameCard } from "../components/GameCard";

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

  componentDidMount() {
    // TODO - Implement fetch
  }

  render() {
    const games = [
      {
        title: "Basketball",
        skillLevel: "Beginner",
        duration: "2 Hours"
      },
      {
        title: "Football",
        skillLevel: "Intermediate",
        duration: "1 hour"
      },
      {
        title: "Soccer",
        skillLevel: "Expert",
        duration: "30 minutes"
      },
      {
        title: "Hockey",
        skillLevel: "Beginner",
        duration: "1 hour"
      }
    ];
    return (
      <View>
        <ScrollView>
          {games.map(game => (
            <GameCard
              title={game.title}
              skillLevel={game.skillLevel}
              duration={game.duration}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default MainScreen;
