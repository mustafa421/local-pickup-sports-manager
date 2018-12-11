import React, { Component } from "react";
import { Location } from "expo";
import {
  StyleSheet,
  View,
  Picker,
  ScrollView,
  DatePickerIOS,
  Platform,
  Text,
  Alert,
  TextInput
} from "react-native";
import { Button } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center"
  },
  text: {
    paddingLeft: 50,
    paddingTop: 50,
    color: "blue"
  },
  input: {
    paddingLeft: 50,
    paddingTop: 50
  }
});
class createGameScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Create Game",
    headerRight: (
      <Button
        title="Cancel"
        textStyle={{ color: "rgba(0, 122, 255, 1)" }}
        onPress={() => navigation.navigate("main")}
        backgroundColor="rgba(0,0,0,0)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === "android" ? 24 : 0 // To prevent overlapping from header in Android devices
    }
  });

  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };

    this.setDate = this.setDate.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  async onPressButton(states) {
    const state = states;
    if (state.minVal === undefined) {
      state.minVal = "1";
    }
    if (state.maxVal === undefined) {
      state.maxVal = "1";
    }
    if (state.duration === undefined) {
      state.duration = "1";
    }
    const obj = {
      title: state.title,
      sport: state.sportValue,
      minVal: parseInt(state.minVal, 10),
      maxVal: parseInt(state.maxVal, 10),
      skill: state.skill,
      chosenDate: state.chosenDate,
      location: state.location,
      latitude: 0.0,
      longitude: 0.0,
      duration: parseInt(state.duration, 10)
    };
    if (obj.sport === undefined) {
      obj.sport = "Basketball";
    }
    if (obj.skill === undefined) {
      obj.skill = "Beginner";
    }
    if (obj.location === "Current Location" || obj.location === undefined) {
      const location = await Location.getCurrentPositionAsync({});
      obj.location = "Current Location";
      obj.latitude = location.coords.latitude;
      obj.longitude = location.coords.longitude;
    }

    if (obj.location === "Shell") {
      obj.latitude = 43.0699;
      obj.longitude = -89.411;
    } else if (obj.location === "Natatorium") {
      obj.latitude = 43.0768;
      obj.longitude = -89.4201;
    } else if (obj.location === "Nielson Tennis") {
      obj.latitude = 43.0796;
      obj.longitude = -89.4303;
    } else if (obj.location === "Gordon's Field") {
      obj.latitude = 43.0712;
      obj.longitude = -89.3986;
    } else if (obj.location === "Edward Klief Park") {
      obj.latitude = 43.066663;
      obj.longitude = -89.4065082;
    } else if (obj.location === "James Madison Park") {
      obj.latitude = 43.0814;
      obj.longitude = -89.3829;
    } else if (obj.location === "Sellery Basketball") {
      obj.latitude = 43.0716;
      obj.longitude = -89.4003;
    } else if (obj.location === "Near East Fields") {
      obj.latitude = 43.077;
      obj.longitude = -89.4172;
    } else if (obj.location === "Near West Fields") {
      obj.latitude = 43.0775;
      obj.longitude = -89.4235;
    } else if (obj.location === "University Bay Fields") {
      obj.latitude = 43.0818;
      obj.longitude = -89.4346;
    }
    const { navigation } = this.props;
    try {
      const request = await fetch(
        "http://local-pickup-sports-manager.herokuapp.com/createGame",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(obj),
          json: true
        }
      );
      if (request.status !== 200) {
        throw new Error();
      }
      navigation.navigate("main");
    } catch (err) {
      console.log(`Error sending request to server ${err}`);
      Alert.alert("Error", "An error occured while creating a game", [
        { text: "OK" }
      ]);
    }
    this.setState({
      sportValue: "Basketball",
      minVal: 1,
      maxVal: 1,
      skill: 1,
      location: "Current Location",
      duration: 1,
      title: ""
    });
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  render() {
    const {
      sportValue,
      minVal,
      maxVal,
      skill,
      chosenDate,
      location,
      duration
    } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Game Title Here</Text>
          <TextInput
            style={styles.input}
            placeholder="Basketball Game"
            onChangeText={text => this.setState({ title: text })}
          />
          <Text style={styles.text}>Sport</Text>
          <Picker
            itemStyle={{ height: 144 }}
            selectedValue={(this.state && sportValue) || "a"}
            onValueChange={value => {
              this.setState({ sportValue: value });
            }}
          >
            <Picker.Item label="Basketball" value="Basketball" />
            <Picker.Item label="Football" value="Football" />
            <Picker.Item label="Ultimate Frisbee" value="Ultimate Frisbee" />
            <Picker.Item label="Soccer" value="Soccer" />
            <Picker.Item label="Tennis" value="Tennis" />
          </Picker>
          <Text style={styles.text}>Min Number of Players</Text>
          <Picker
            itemStyle={{ height: 144 }}
            // style={{ width: 200 }}
            selectedValue={(this.state && minVal) || "a"}
            onValueChange={value => {
              this.setState({ minVal: value });
            }}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
            <Picker.Item label="13" value="13" />
            <Picker.Item label="14" value="14" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="16" value="16" />
            <Picker.Item label="17" value="17" />
            <Picker.Item label="18" value="18" />
            <Picker.Item label="19" value="19" />
            <Picker.Item label="20" value="20" />
          </Picker>
          <Text style={styles.text}>Max Number of Players</Text>
          <Picker
            itemStyle={{ height: 144 }}
            selectedValue={(this.state && maxVal) || "a"}
            onValueChange={value => {
              this.setState({ maxVal: value });
            }}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
            <Picker.Item label="13" value="13" />
            <Picker.Item label="14" value="14" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="16" value="16" />
            <Picker.Item label="17" value="17" />
            <Picker.Item label="18" value="18" />
            <Picker.Item label="19" value="19" />
            <Picker.Item label="20" value="20" />
          </Picker>
          <Text style={styles.text}>Date</Text>
          <DatePickerIOS date={chosenDate} onDateChange={this.setDate} />
          <Text style={styles.text}>Duration (in hours)</Text>
          <Picker
            itemStyle={{ height: 144 }}
            selectedValue={(this.state && duration) || "a"}
            onValueChange={value => {
              this.setState({ duration: value });
            }}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="1.5" value="1.5" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="2.5" value="2.5" />
            <Picker.Item label="3" value="3" />
          </Picker>
          <Text style={styles.text}>Skill Level</Text>
          <Picker
            itemStyle={{ height: 144 }}
            selectedValue={(this.state && skill) || "a"}
            onValueChange={value => {
              this.setState({ skill: value });
            }}
          >
            <Picker.Item label="Beginner" value="Beginner" />
            <Picker.Item label="Intermediate" value="Intermediate" />
            <Picker.Item label="Expert" value="Expert" />
          </Picker>
          <Text style={styles.text}>Location</Text>
          <Picker
            itemStyle={{ height: 144 }}
            selectedValue={(this.state && location) || "a"}
            onValueChange={value => {
              this.setState({ location: value });
            }}
          >
            <Picker.Item label="Current Location" value="Current Location" />
            <Picker.Item label="Shell" value="Shell" />
            <Picker.Item label="Natatorium" value="Natatorium" />
            <Picker.Item label="Near East Fields" value="Near East Fields" />
            <Picker.Item label="Near West Fields" value="Near West Fields" />
            <Picker.Item
              label="Sellery Basketball"
              value="Sellery Basketball"
            />
            <Picker.Item label="Nielsen Tennis" value="Nielson Tennis" />
            <Picker.Item label="Gordon's Field" value="Gordon's Field" />
            <Picker.Item label="Edward Klief Park" value="Edward Klief Park" />
            <Picker.Item
              label="University Bay Fields"
              value="University Bay Fields"
            />
            <Picker.Item
              label="James Madison Park"
              value="James Madison Park"
            />
          </Picker>
          <View style={{ padding: 75 }}>
            <Button
              backgroundColor="blue"
              onPress={() => this.onPressButton(this.state)}
              title="Create Game"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default createGameScreen;
