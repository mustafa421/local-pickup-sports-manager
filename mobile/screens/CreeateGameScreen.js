import React, { Component } from "react";
import { Location } from "expo";
import {
  StyleSheet,
  View,
  Picker,
  ScrollView,
  DatePickerIOS,
  Platform,
  Text
} from "react-native";
import { Button } from "react-native-elements";
// import {Text, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center"
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
      console.log(`[DEBUG] Server responded with ${request.status}`);
      // console.log(obj);
      console.log(await request.json());
      navigation.navigate("main");
    } catch (err) {
      console.log(`Error sending request to server ${err}`);
      // Add alert to alert user that something went wrong
    }
    this.setState({
      sportValue: "Basketball",
      minVal: 1,
      maxVal: 1,
      skill: 1,
      location: "Current Location",
      duration: 1
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
          <Text
            style={{
              paddingLeft: 50,
              paddingTop: 50,
              color: "blue"
            }}
          >
            Sport
          </Text>
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
          <Text
            style={{
              paddingLeft: 50,
              paddingTop: 50,
              color: "blue"
            }}
          >
            Min Number of Players
          </Text>
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
          <Text
            style={{
              paddingLeft: 50,
              paddingTop: 50,
              color: "blue"
            }}
          >
            Max Number of Players
          </Text>
          <Picker
            itemStyle={{ height: 144 }}
            // style={{ width: 200 }}
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
          <Text
            style={{
              paddingLeft: 50,
              paddingTop: 50,
              color: "blue"
            }}
          >
            Date
          </Text>
          <DatePickerIOS date={chosenDate} onDateChange={this.setDate} />
          <Text
            style={{
              paddingLeft: 50,
              paddingTop: 50,
              color: "blue"
            }}
          >
            Duration (in hours)
          </Text>
          <Picker
            itemStyle={{ height: 144 }}
            // style={{ width: 200 }}
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
          <Text
            style={{
              paddingLeft: 50,
              paddingTop: 50,
              color: "blue"
            }}
          >
            Skill Level
          </Text>
          <Picker
            itemStyle={{ height: 144 }}
            // style={{ width: 200 }}
            selectedValue={(this.state && skill) || "a"}
            onValueChange={value => {
              this.setState({ skill: value });
            }}
          >
            <Picker.Item label="Beginner" value="Beginner" />
            <Picker.Item label="Intermediate" value="Intermediate" />
            <Picker.Item label="Expert" value="Expert" />
          </Picker>
          <Text
            style={{
              paddingLeft: 50,
              paddingTop: 50,
              color: "blue"
            }}
          >
            Location
          </Text>
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
            <Picker.Item label="Nielsen Tennis" value="Nielson Tennis" />
            <Picker.Item label="Gordon's Field" value="Gordon's Field" />
            <Picker.Item label="Edward Klief Park" value="Edward Klief Park" />
            <Picker.Item
              label="Sellery basketball"
              value="Sellery basketball"
            />
            <Picker.Item
              label="James Madison Park"
              value="James Madison Park"
            />
          </Picker>
          <View style={{ padding: 75 }}>
            <Button
              color="blue"
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
