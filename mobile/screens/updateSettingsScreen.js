import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Text,
  TextInput,
  Switch
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
class updateSettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "updateSettings",
    headerRight: (
      <Button
        title="Cancel"
        textStyle={{ color: "rgba(0, 122, 255, 1)" }}
        onPress={() => navigation.navigate("settings")}
        backgroundColor="rgba(0,0,0,0)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === "android" ? 24 : 0 // To prevent overlapping from header in Android devices
    }
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { phone, football, email } = this.state;
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
            Preferred Sports (Some Component will go here)
          </Text>
          <Switch
            style={{
              paddingLeft: 100,
              paddingRight: 100
            }}
            placeholder="Hello"
            selectedValue={(this.state && football) || "a"}
            onValueChange={value => {
              this.setState({ football: value });
            }}
          >
            He
          </Switch>
          <TextInput
            style={{ padding: 50 }}
            placeholder="Phone Number (optional)"
            keyboardType="numeric"
            maxLength={10}
            selectedValue={(this.state && phone) || "a"}
            onChangeText={text => this.setState({ phone: text })}
          />
          <TextInput
            style={{ padding: 50 }}
            placeholder="Email address (optional)"
            selectedValue={(this.state && email) || "a"}
            onChangeText={text => this.setState({ email: text })}
          />
        </View>
      </ScrollView>
    );
  }
}
export default updateSettingsScreen;
