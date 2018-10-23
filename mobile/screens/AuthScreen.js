import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <Text>AuthScreen - Hello world</Text>
    </View>
  );
}
