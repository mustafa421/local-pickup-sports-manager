import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Picker,
  Button,
  Alert
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
  onPressButton() {
    // Alert.alert("You tapped the button!");
    return (
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
    );
  }

  render() {
    return (
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
        <View style={styles.buttonContainer}>
          <Button
            // onPress={() => {
            // Alert.alert("Not currently working!"); // Want to be able to go to Picker
            // }}
            onPress={this.onPressButton}
            title="Sport"
          />
        </View>
        <TextInput style={{ padding: 25 }} placeholder="Location" />
        <TextInput
          style={{ padding: 25 }}
          placeholder="Skill Level (1-10)"
          keyboardType="numeric"
        />
        <TextInput
          style={{ padding: 25 }}
          placeholder="Min number of players"
          keyboardType="numeric"
        />
        <TextInput
          style={{ padding: 25 }}
          placeholder="Max number of players"
          keyboardType="numeric"
        />
        <View style={styles.ontainer}>
          <Button
            onPress={() => {
              Alert.alert("Not currently working!"); // Want to be able to go to Picker
            }}
            title="Create Game"
          />
        </View>
      </View>
    );
  }
}
export default createGameScreen;
