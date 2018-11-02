import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Local Pickup Sports Manager!</Text>

      <Button
        title="Sign in with Facebook"
        backgroundColor="#3B5998"
        onPress={() => navigation.navigate("auth", { loginMethod: "fb" })}
      />
      <Button
        title="Sign in with Google"
        backgroundColor="#f2a60c"
        onPress={() => navigation.navigate("auth", { loginMethod: "google" })}
      />

    </View>
  );
}
