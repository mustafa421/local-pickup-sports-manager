import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, AsyncStorage } from 'react-native';
import { Constants } from 'expo';
import { CheckBox } from 'react-native-elements';
import { Button } from 'react-native';
import axios from 'axios';
import "@expo/vector-icons";

//list of all sports (should pull from database)
const items = ['Badminton','Basketball','Football', 'Soccer', 'Softball' , 'Volleyball'];

//default user prefernces
const defaultPreferences = ['Football', 'Soccer'];
var userPref = defaultPreferences;

const storePreferences = async userPref => {
  if (userPref == null) {
    userPref = defaultPreferences;
  }
  try {
    await AsyncStorage.setItem('user_Preferences', userPref);
  } catch (error) {
    // Error retrieving data
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
    // Error retrieving data
    console.log(error.message);
  }
  return userPref;
}
export default class CustomizePreferences extends Component {
  userPref = getPreferences;
  state = {
    checked: userPref,
  };

  //local data submission method
  handleSubmit = () => {
    storePreferences;
    console.log('SUBMITTED');
    // navigate('MainScreen', {name: 'MainScreen'})
    this.props.navigation.navigate('MainScreen')
  }

  //unused alternative db submission
  onSubmit = (e) => {
    e.preventDefault();
    let arr = [];
    for (var key in this.state) {
      if(this.state[key] === true) {
        arr.push(key);
      }
    }
    let data = {
      check: arr.toString() 
    };
    axios.post('http://localhost:4000/checks/add', data)
          .then(res => console.log(res.data));
  }

  checkItem = item => {
    const { checked } = this.state;
    console.log(item, ' added');
    if (!checked.includes(item)) {
      this.setState({ checked: [...checked, item] });
    } else {
      this.setState({ checked: checked.filter(a => a !== item) });
    }
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
          title="Save"
          onPress={this.handleSubmit}
        />
        <Button
          title="Cancel"
          color = "#D3D3D3"
          onPress={() => this.props.navigation.navigate('MainScreen')}
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
