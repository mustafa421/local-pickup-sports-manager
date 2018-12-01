import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    width: 76,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#03A9F4",
    borderRadius: 20,
    elevation: 8
  },
  fabIcon: {
    fontSize: 11,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  }
});

export class SettingsScreen extends Component {
  // A feature from React Navigation to define a title
  static navigationOptions = ({ navigation }) => ({
    title: "Profile",
    headerRight: (
      <Button
        title="Edit"
        textStyle={{ color: "rgba(0, 122, 255, 1)" }}
        onPress={() => navigation.navigate("updateSettingsScreen")}
        backgroundColor="rgba(0,0,0,0)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === "android" ? 24 : 0 // To prevent overlapping from header in Android devices
    }
  });

  render() {
    const { name, email, phone, navigation } = this.props;
    console.log(`${name}, ${email}, ${phone}`);
    return (
      <View>
        <Text
          style={{
            padding: 50,
            color: "blue"
          }}
        >
          Name:
          {name}
        </Text>
        <Text
          style={{
            padding: 50,
            color: "blue"
          }}
        >
          Email:
          {email}
        </Text>
        <Text
          style={{
            padding: 50,
            color: "blue"
          }}
        >
          Phone Number:
          {phone}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("PreferencesScreen")}
          style={styles.fab}
        >
          <Text style={styles.fabIcon}> Preferences</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => state.auth.userAccountData;

export default connect(mapStateToProps)(SettingsScreen);

SettingsScreen.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string
};

SettingsScreen.defaultProps = {
  name: "",
  email: "",
  phone: "Not provided"
};
