import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, Button } from 'react-native';
import { Constants } from 'expo';
import { CheckBox } from 'react-native-elements';
import {AsyncStorage} from 'react-native';
import "@expo/vector-icons";


const items = ['Basketball','Football', 'Ultimate Frisbee', 'Soccer' , 'Tennis'];
const defaultPreferences = ['Football', 'Soccer'];
var userPref = defaultPreferences;

const storePreferences = async userPref => {
  if (userPref == null) {
    userPref = defaultPreferences;
  }
  try {
    await AsyncStorage.setItem('user_Preferences', userPref);
  } catch (error) {
    console.log(error.message);
  }
};

const getPreferences = async () => {
  let userPref = '';
  if (userPref == null) {
    userPref = defaultPreferences;
  }
  try {
    userPref = await AsyncStorage.getItem('user_Preferences') || 'none';
  } catch (error) {
    console.log(error.message);
  }
  return userPref;
}
export default class PreferencesScreen extends Component {
  userPref = getPreferences;
  state = {
    checked: userPref,
  };

  handleSubmit = () => {
    storePreferences;
    console.log('SUBMITTED');
    this.props.navigation.navigate('MainScreen');
  }

  handleCancel = () => {
    console.log('Canceled');
    this.props.navigation.navigate('MainScreen');
  }

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
    return (
      
      <View style={styles.container}>
        <Text style={styles.welcome}>
          User Prefernces
        </Text>
        <Text style={styles.category}>
          Sports
        </Text>
        <Text style={styles.description}>
          Select any of the following that interest you
        </Text>

        <FlatList
          data={items}
          extraData={this.state}
          renderItem={({ item }) => (
            <CheckBox
              title={item}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              onPress={() => this.checkItem(item)}
              checked={this.state.checked.includes(item)}
            />
          )}
        />

        <Button
          title="Cancel"
          color = "#D3D3D3"
          onPress={this.handleCancel}
        />

        <Button
          title="Save"
          onPress={this.handleSubmit}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#ecf0f1',
  },
    welcome: {
    fontSize: 20,
    paddingTop: Constants.statusBarHeight,
    textAlign: 'center',
    margin: 2,
  },
  category: {
    fontSize: 16,
    paddingTop: Constants.statusBarHeight,
    textAlign: 'center',
    margin: 2,
  }
});
