import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Button,
  TextInput,
  Alert,
  AsyncStorage
} from "react-native";
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

const storePreferences = async (userPref, userDistance) => {
  console.log('start store');
  if (userPref == null) {
    console.log('userPref is null');
    userPref = defaultPreferences;
  }
  if (userDistance == null) {
    userDistance = defaultDistance;
  }
  try {
    await AsyncStorage.setItem("user_Preferences", JSON.stringify(userPref));
    await AsyncStorage.setItem("user_Distance", JSON.stringify(userDistance));
  } catch (error) {
    console.log(error.message);
  }
  console.log('end store');
};

const getPreferences = async () => {
  console.log('start getPreferences');
  try {
    const retrievedPreferences = (await AsyncStorage.getItem("user_Preferences"));
    const parsedPreferences = JSON.parse(retrievedPreferences);
    if (parsedPreferences == null) {
      return defaultPreferences;
    }
    return parsedPreferences;
  } catch (error) {
    console.log(error.message);
  }
  console.log('end getPreferences');
  return;
};

const getDistance = async () => {
  console.log('start getDistance');
  try {
    const retrievedDistance = (await AsyncStorage.getItem("user_Distance"));
    const parsedDistance = JSON.parse(retrievedDistance);
    if (parsedDistance == null) {
      return defaultDistance;
    }
    return parsedDistance;
  } catch (error) {
    console.log(error.message);
  }
  console.log('end getDistance');
  return;
};

class PreferencesScreen extends Component {
  userPref = getPreferences;
  userDistance = getDistance;
  state = {
    checked: userPref
  };

    
  handleSave = () => {
    console.log('start save');
    storePreferences(userPref, userDistance);
    const {goBack} = this.props.navigation;

    Alert.alert(
      'Save Successful',
      'Click "Cancel" to continue editing, or "Ok" to save and return.',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        {text: 'Ok', onPress: () => goBack(), style: 'description'},
      ],
      { cancelable: false }
    )
    console.log("SUBMITTED");
  };

  //force checks the supposed numeric input
  onChanged(text){
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            alert("please enter numbers only");
        }
    }
    this.setState({ myNumber: newText });
}

  checkItem = item => {
    const { checked } = this.state;

    if (!checked.includes(item)) {
      this.setState({ checked: [...checked, item] });
    } else {
      this.setState({ checked: checked.filter(a => a !== item) });
    }
    userPref = checked;
    console.log(item);
    console.log(checked);
  };

  render() {
    // console.log(this.props);
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
        title="Back" 
        color="#D3D3D3" 
        onPress={() => goBack()}
        />

        <Button 
        title="Save" 
        onPress={this.handleSave.bind(this)} 
        />
      </View>
    );
  }
}

export default PreferencesScreen;
