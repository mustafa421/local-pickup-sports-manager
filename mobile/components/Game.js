//import libraries

import React from "react";
import { Text, View, SectionList } from "react-native";
import PropTypes from "prop-types";

//Create Game Component
function Game(props) {
  return (
    <View>
      <SectionList
        renderItem={({ item, index, section }) => (
          <Text key={index}>{item}</Text>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>{title}</Text>
        )}
        sections={[
          { title: props.date, data: [] },
          { title: props.time, data: [] },
          { title: "@" + props.location, data: [] },
          { title: "Participants: ", data: [props.number_going] },
          { title: "Interested: ", data: [props.number_interested] } //user profiles could go here
        ]}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
}

Game.propTypes = {
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  number_going: PropTypes.number.isRequired,
  number_interested: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired
};
//Render the Game Component to the Device
export default Game;
