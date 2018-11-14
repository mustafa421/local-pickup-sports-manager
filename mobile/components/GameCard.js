import React from "react";

import { View, Text, Image } from "react-native";

import { Card, ListItem, Button, Icon } from "react-native-elements";

export default function GameCard(props) {
  // implemented with Text and Button as children

  const { title, skillLevel, duration } = props;

  return (
    <Card title={title}>
      <Text style={{ marginBottom: 10 }}>Skill Level= </Text>
      {skillLevel}

      <Text style={{ marginBottom: 10 }}>Time= </Text>
      {duration}

      <Text style={{ marginBottom: 10 }}>Join this game now!</Text>

      <Button
        backgroundColor="#03A9F4"
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0
        }}
        title="Join Game"
      />
      <Text style={{ marginBottom: 10 }} />

      <Text style={{ marginBottom: 10 }}>Show interest in this game!</Text>

      <Button
        backgroundColor="#03A9F4"
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0
        }}
        title="Interested in Game"
      />
    </Card>
  );
}
