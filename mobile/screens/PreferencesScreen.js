import React, { Component } from "react";
import { View, StyleSheet, FlatList, Text, AsyncStorage } from "react-native";
import { Constants } from "expo";
import { CheckBox } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#ecf0f1"
  },
  welcome: {
    fontSize: 20,
    paddingTop: Constants.statusBarHeight,
    textAlign: "center",
    margin: 2
  },
  description: {
    fontSize: 13,
    paddingTop: Constants.statusBarHeight,
    textAlign: "center",
    margin: 2
  },
  category: {
    fontSize: 16,
    paddingTop: Constants.statusBarHeight,
    textAlign: "center",
    margin: 2
  }
});

class PreferencesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedSports: ["Football", "Soccer"],
      defaultList: [
        "Basketball",
        "Football",
        "Ultimate Frisbee",
        "Soccer",
        "Tennis"
      ]
    };
  }

  componentDidMount() {
    this.getPreferences();
  }

  async getPreferences() {
    const { checkedSports } = this.state;
    let sportsPreferences = await AsyncStorage.getItem("sports");
    if (!sportsPreferences) {
      sportsPreferences = checkedSports;
      await AsyncStorage.setItem(
        "sports",
        JSON.stringify(["Tennis", "Basketball"])
      );
    } else {
      sportsPreferences = JSON.parse(sportsPreferences);
    }

    this.setState({ checkedSports: sportsPreferences });
    return checkedSports;
  }

  async checkItem(checkedSport) {
    let { checkedSports } = this.state;
    if (checkedSports.includes(checkedSport)) {
      checkedSports = checkedSports.filter(sport => sport !== checkedSport);
    } else {
      checkedSports.push(checkedSport);
    }
    await AsyncStorage.setItem("sports", JSON.stringify(checkedSports));
    this.setState({ checkedSports });
  }

  render() {
    const { checkedSports, defaultList } = this.state;
    return (
      <View>
        <Text style={styles.welcome}>Game Preferences</Text>
        <Text style={styles.category}>Sports</Text>
        <Text style={styles.description}>
          Select any of the following that interest you
        </Text>
        <FlatList
          data={defaultList}
          extraData={this.state}
          renderItem={({ item }) => (
            <CheckBox
              title={item}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              onPress={() => this.checkItem(item)}
              checked={checkedSports.includes(item)}
            />
          )}
          keyExtractor={item => item}
        />
      </View>
    );
  }
}

export default PreferencesScreen;
