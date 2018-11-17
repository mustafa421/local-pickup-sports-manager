import React, { Component } from "react";
import { View, Text, Button, Platform } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
    const { name, email, phone } = this.props;
    console.log(`${name}, ${email}, ${phone}`);
    return (
      <View>
        <Text
          style={{
            padding: 50,
            color: "grey"
          }}
        >
          Name:
          {name}
        </Text>
        <Text
          style={{
            padding: 50,
            color: "grey"
          }}
        >
          Email:
          {email}
        </Text>
        <Text
          style={{
            padding: 50,
            color: "grey"
          }}
        >
          Phone Number:
          {phone}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => state.auth.userAccountData;

export default connect(mapStateToProps)(SettingsScreen);

SettingsScreen.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string
};

SettingsScreen.defaultProps = {
  phone: "Not provided"
};

// export default SettingsScreen;
