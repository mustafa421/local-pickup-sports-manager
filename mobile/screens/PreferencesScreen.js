import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Button,
  TextInput,
  AsyncStorage
} from "react-native";
import { Constants } from "expo";
import { CheckBox } from "react-native-elements";
// import "@expo/vector-icons";

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

const items = [
  "Basketball",
  "Football",
  "Ultimate Frisbee",
  "Soccer",
  "Tennis"
];
const defaultPreferences = ["Football", "Soccer"];
let userPref = defaultPreferences;
const defaultDistance = 5;
let userDistance = defaultDistance;

const storePreferences = async userPref => {
  if (userPref == null) {
    userPref = defaultPreferences;
  }
  try {
    await AsyncStorage.setItem("user_Preferences", userPref);
    await AsyncStorage.setItem("user_Distance", userDistance);
  } catch (error) {
    console.log(error.message);
  }
};

const getPreferences = async () => {
  if (userPref == null) {
    userPref = defaultPreferences;
  }
  try {
    userDistance = (await AsyncStorage.getItem("user_Distance")) || "none";
    userPref = (await AsyncStorage.getItem("user_Preferences")) || "none";
  } catch (error) {
    console.log(error.message);
  }
  return userPref;
};

class PreferencesScreen extends Component {
  userPref = getPreferences;
  state = {
    checked: userPref
  };

  handleSubmit = () => {
    storePreferences;
    const { navigation } = this.props;
    console.log("SUBMITTED" + checked);
    navigation.navigate("MainScreen");
  };

  // handleCancel = () => {
  //   const { navigation } = this.props;
  //   console.log("Canceled");
  //   navigation.navigate("settings");
  // };

  checkItem = item => {
    const { checked } = this.state;

    if (!checked.includes(item)) {
      this.setState({ checked: [...checked, item] });
    } else {
      this.setState({ checked: checked.filter(a => a !== item) });
    }
    userPref = checked;
  };

  render() {
    console.log(this.props);
    const {goBack} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Game Preferences</Text>
        <Text style={styles.category}>Sports</Text>
        <Text style={styles.description}>
          Select any of the following that interest you
        </Text>

        <FlatList
          data={items}
          extraData={this.state}
          renderItem={({ item }) => (
            <CheckBox
              title={item}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              onPress={() => this.checkItem(item)}
              checked={this.state.checked.includes(item)}
            />
          )}
        />

        <Text style={styles.description}>
          Please add the max distance you are willing to play from (default is 5
          miles)
        </Text>
        <TextInput
          style={{ padding: 30, color: "grey" }}
          placeholder="5 (miles)"
          keyboardType="numeric"
          maxLength={4}
          selectedValue={this.state || "a"}
          onChangeText={text => this.setState({ distance: text })}
          userDistance={this.state.messageBody}
        />

        <Button 
        title="Cancel" 
        color="#D3D3D3" 
        onPress={() => goBack()}
        />

        <Button 
        title="Save" 
        onPress={() => this.handleSubmit} 
        />
      </View>
    );
  }
}

export default PreferencesScreen;
