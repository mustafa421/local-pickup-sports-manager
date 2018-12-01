import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import { connect } from "react-redux";
import { Card, Button } from "react-native-elements";

const joinGame = async userInfo => {
  try {
    const request = await fetch(
      "http://local-pickup-sports-manager.herokuapp.com/joinGame",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo),
        json: true
      }
    );

    if (request.status !== 200) {
      throw Error("Failed to connect to API");
    }
  } catch (ex) {
    console.log(ex);
  }
};

export function GameCard(props) {
  const {
    title,
    skillLevel,
    duration,
    userID,
    name,
    gameID,
    navigation
  } = props;

  return (
    <Card title={title}>
      onPress
      {() => navigation.navigate("GameScreen")}
      <Text style={{ marginBottom: 10 }}>Skill Level ={skillLevel} </Text>
      <Text style={{ marginBottom: 10 }}>Time = {duration} </Text>
      <Button
        backgroundColor="#03A9F4"
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0
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
      <Text style={{ marginBottom: 10 }} />
      <Button
        backgroundColor="#03A9F4"
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0
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
    </Card>
  );
}

const mapStateToProps = state => state.auth.userAccountData;

export default connect(mapStateToProps)(GameCard);

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  userID: PropTypes.number.isRequired,
  name: PropTypes.string,
  gameID: PropTypes.number.isRequired
};

GameCard.defaultProps = {
  name: null
};
