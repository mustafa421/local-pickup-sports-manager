import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { Card, Button } from "react-native-elements";

const styles = StyleSheet.create({
  text: {
    marginBottom: 10
  }
});

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
      throw Error("Failed to connect to join game");
    }
  } catch (ex) {
    console.log(ex);
    Alert.alert(
      "Unable to join game",
      "Error in attempting to join game. Please try again later.",
      [{ text: "OK" }],
      { cancelable: false }
    );
  }
};

const interestedGame = async userInfo => {
  try {
    const request = await fetch(
      "http://local-pickup-sports-manager.herokuapp.com/interestedGame",
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
      throw new Error("Failed to send interested game");
    }
  } catch (err) {
    console.log(err);
    Alert.alert(
      "Unable to set interest",
      "Error in attempting to show interest in game. Please try again later.",
      [{ text: "OK" }],
      { cancelable: false }
    );
  }
};

export function GameCard(props) {
  const {
    title,
    skillLevel,
    duration,
    userID,
    username,
    sport,
    gameID
  } = props;

  return (
    <Card title={title}>
      <Text style={styles.text}>Sport = {sport} </Text>
      <Text style={styles.text}>Skill Level = {skillLevel}</Text>
      <Text style={styles.text}>Time = {duration} </Text>
      <Text style={styles.text}>Join this game now!</Text>

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
            name: username
          })
        }
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
        onPress={() =>
          interestedGame({
            userID,
            gameID,
            name: username
          })
        }
      />
    </Card>
  );
}

const mapStateToProps = state => state.auth.userAccountData;

export default connect(mapStateToProps)(GameCard);

GameCard.propTypes = {
  title: PropTypes.string,
  sport: PropTypes.string,
  skillLevel: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  userID: PropTypes.number.isRequired,
  gameID: PropTypes.number.isRequired,
  username: PropTypes.string
};

GameCard.defaultProps = {
  username: null,
  sport: null,
  title: null
};
