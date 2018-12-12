import React from "react";
import { Text, View, SectionList, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { Card } from "react-native-elements";

// Create Game Component
function Game(props) {
  const {
    joined,
    interested,
    title,
    date,
    location,
    sport,
    skillLevel
  } = props;
  return (
    <View
      style={{
        backgroundColor: "lightblue",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
      }}
    >
      <Card
        title={title}
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
          {date.toLocaleString()}
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
          @{location}
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
          Sport:
          {`  ${sport}`}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            paddingLeft: 15,
            fontWeight: "bold",
            fontSize: 30,
            paddingVertical: 5
          }}
        >
          Skill Level:
          {`  ${skillLevel}`}
        </Text>
      </View>
      <SectionList
        containerStyle={{
          marginLeft: 10,
          marginTop: 10,
          marginBottom: 0,
          paddingVertical: 0
        }}
        renderItem={({ item, index }) => (
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
          {
            title: "Participants: ",
            data: [joined]
          },
          {
            title: "Interested: ",
            data: [interested]
          }
        ]}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
}

Game.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  joined: PropTypes.arrayOf(PropTypes.string).isRequired,
  interested: PropTypes.arrayOf(PropTypes.string).isRequired,
  sport: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired
};

export default Game;
