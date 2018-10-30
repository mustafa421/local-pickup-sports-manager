import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Picker,
  Alert,
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
            itemStyle={{ height: 144 }}
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
            selectedValue={(this.state && this.state.pickerValue) || "a"}
            onValueChange={value => {
              this.setState({ pickerValue: value });
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
          </Picker>
          <TextInput style={{ padding: 50 }} placeholder="Location" />
          <View style={{ padding: 75 }}>
            <Button
              onPress={() => {
                Alert.alert("Not currently working!"); // Want to create Game
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
