//import libraries

import React from "react";
import { Text, View, SectionList, Dimensions, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { Card, Button, Rating } from "react-native-elements";

//Create Game Component
function Game(props) {
  return (
    <View
      style={{
        backgroundColor: "lightblue",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
      }}
    >
      <Card
        title={props.title}
        titleStyle={{ fontSize: 32, fontWeight: "bold", color: "black" }}
        containerStyle={{
          backgroundColor: "#03A9F4",
          borderColor: "black"
        }}
      >
        <Text
          style={{
            marginBottom: 0,
            marginRight: 0,
            marginTop: 0,
            marginLeft: 0,
            fontWeight: "bold",
            fontSize: 32
          }}
        >
          {" "}
          {props.date + ", " + props.time}
        </Text>

        <Text
          style={{
            marginBottom: 0,
            marginRight: 0,
            marginTop: 0,
            marginLeft: 0,
            fontWeight: "bold",
            fontSize: 24
          }}
        >
          {"@" + props.location}
        </Text>
      </Card>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            paddingLeft: 15,
            fontWeight: "bold",
            fontSize: 30,
            paddingVertical: 5
          }}
        >
          Difficulty:
        </Text>
        <Rating
          type="star"
          fractions={1}
          ratingCount={10}
          startingValue={props.difficulty}
          readonly
          imageSize={15}
          onFinishRating={this.ratingCompleted}
          onStartRating={this.ratingStarted}
          style={{ paddingLeft: 15, paddingVertical: 20, paddingRight: 15 }}
        />
      </View>
      <SectionList
        containerStyle={{
          marginLeft: 10,
          marginTop: 10,
          marginBottom: 0,
          paddingVertical: 0
        }}
        renderItem={({ item, index, section }) => (
          <Text key={index} style={{ paddingLeft: 15 }}>
            {item}
          </Text>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontWeight: "bold", fontSize: 30, paddingLeft: 15 }}>
            {title}
          </Text>
        )}
        sections={[
          { title: "Participants: ", data: [props.number_going] },
          { title: "Interested: ", data: [props.number_interested] } //user profiles could go here
        ]}
        keyExtractor={(item, index) => item + index}
      />
      <Button
        backgroundColor="paleturquoise"
        color="black"
        buttonStyle={{
          borderRadius: 5,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          borderColor: "black",
          borderWidth: 1
        }}
        title="Join Game"
        onPress={() =>
          joinGame({
            userID,
            gameID,
            name,
            interested: false
          })
        }
      />
      <Text />
      <Button
        backgroundColor="paleturquoise"
        color="black"
        buttonStyle={{
          borderRadius: 5,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          borderColor: "black",
          borderWidth: 1
        }}
        title="Interested in Game"
        onPress={() =>
          joinGame({
            userID,
            gameID,
            name,
            interested: true
          })
        }
      />
    </View>
  );
}

Game.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  number_going: PropTypes.number.isRequired,
  number_interested: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired
};
//Render the Game Component to the Device
export default Game;
