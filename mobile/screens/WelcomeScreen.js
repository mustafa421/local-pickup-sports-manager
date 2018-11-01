import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Local Pickup Sports Manager!</Text>
      <Button title="Sign in" onPress={() => navigation.navigate("auth")} />
    </View>
  );
}
