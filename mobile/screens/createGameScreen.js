import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Picker,
  Button,
  Alert,
  ScrollView,
  DatePickerIOS
} from "react-native";
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
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  // onPressButton() {
  // Alert.alert("You tapped the button!");
  // return (
  // );
  // }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Picker
            selectedValue={(this.state && this.state.pickerValue) || "a"}
            onValueChange={value => {
              this.setState({ pickerValue: value });
            }}
          >
            <Picker.Item label="Basketball" value="basketball" />
            <Picker.Item label="Football" value="football" />
            <Picker.Item label="Ultimate Frisbee" value="frisbee" />
            <Picker.Item label="Soccer" value="soccer" />
            <Picker.Item label="Tennis" value="tennis" />
          </Picker>
          <TextInput
            style={{ padding: 50 }}
            placeholder="Min number of players"
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            style={{ padding: 50 }}
            placeholder="Max number of players"
            keyboardType="numeric"
            maxLength={2}
          />
          <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={this.setDate}
          />
          <TextInput
            style={{ padding: 50 }}
            placeholder="Duration"
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            style={{ padding: 50 }}
            placeholder="Skill Level (1-10)"
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput style={{ padding: 50 }} placeholder="Location" />
          <View style={{ padding: 75 }}>
            <Button
              onPress={() => {
                Alert.alert("Not currently working!"); // Want to be able to go to Picker
              }}
              title="Create Game"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default createGameScreen;
