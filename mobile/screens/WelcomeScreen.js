import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text>Open up App.js to start working on your project!</Text>
=======
      <Text>Welcome to Local Pickup Sports Manager!</Text>
      <Button title="Sign in" onPress={() => navigation.navigate("auth")} />
>>>>>>> master
    </View>
  );
}
