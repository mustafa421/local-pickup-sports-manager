import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
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
  async onPressButton(state) {
    const obj = {
      sport: state.sportValue,
      minVal: state.minValue,
      maxVal: state.maxVal,
      skill: state.skill,
      chosenDate: state.chosenDate,
      location: state.location,
      duration: state.duration
    };
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
      console.log(await request.json());
      navigation.navigate("main");
    } catch (err) {
      console.log(`Error sending request to server ${err}`);
      // Add alert to alert user that something went wrong
    }
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
              color: "grey"
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
            <Picker.Item label="Basketball" value="basketball" />
            <Picker.Item label="Football" value="football" />
            <Picker.Item label="Ultimate Frisbee" value="frisbee" />
            <Picker.Item label="Soccer" value="soccer" />
            <Picker.Item label="Tennis" value="tennis" />
          </Picker>
          <Text
            style={{
              paddingLeft: 50,
              paddingTop: 50,
              color: "grey"
            }}
          >
            Min Number of Players
          </Text>
          <Picker
            itemStyle={{ height: 144 }}
            style={{ width: 200 }}
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
              color: "grey"
            }}
          >
            Max Number of Players
          </Text>
          <Picker
            itemStyle={{ height: 144 }}
            style={{ width: 200 }}
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
              color: "grey"
            }}
          >
            Date
          </Text>
          <DatePickerIOS date={chosenDate} onDateChange={this.setDate} />
          <TextInput
            style={{ padding: 50 }}
            placeholder="Duration (in hours)"
            keyboardType="numeric"
            maxLength={1}
            selectedValue={(this.state && duration) || "a"}
            onChangeText={text => this.setState({ duration: text })}
          />
          <Text
            style={{
              paddingLeft: 50,
              paddingTop: 50,
              color: "grey"
            }}
          >
            Skill Level
          </Text>
          <Picker
            itemStyle={{ height: 144 }}
            style={{ width: 200 }}
            selectedValue={(this.state && skill) || "a"}
            onValueChange={value => {
              this.setState({ skill: value });
            }}
          >
            <Picker.Item label="Beginner" value="beginner" />
            <Picker.Item label="Intermediate" value="intermediate" />
            <Picker.Item label="Expert" value="expert" />
          </Picker>
          <Text
            style={{
              paddingLeft: 50,
              paddingTop: 50,
              color: "grey"
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
            <Picker.Item label="Shell" value="shell" />
            <Picker.Item label="Natatorium" value="Natatorium" />
            <Picker.Item label="Nielsen Tennis" value="nielson" />
            <Picker.Item label="Gordon's Field" value="gordon's" />
            <Picker.Item label="Edward Klief Park" value="klief" />
            <Picker.Item label="Sellery basketball" value="sellery" />
            <Picker.Item label="James Madison Park" value="james" />
          </Picker>
          <View style={{ padding: 75 }}>
            <Button
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
