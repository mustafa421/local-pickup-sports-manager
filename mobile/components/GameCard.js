import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  StyleSheet,
  Alert,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
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

    let joinedGames = await AsyncStorage.getItem("joinedGames");

    if (!joinedGames) {
      const arr = [];
      await AsyncStorage.setItem("joinedGames", JSON.stringify(arr));
      joinedGames = arr;
    } else {
      joinedGames = JSON.parse(joinedGames);
    }

    if (!joinedGames.includes(userInfo.gameID)) {
      joinedGames.push(userInfo.gameID);
    }

    await AsyncStorage.setItem("joinedGames", JSON.stringify(joinedGames));

    Alert.alert("Success", "Successfully joined game", [{ text: "OK" }], {
      cancelable: false
    });
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

    let interestedGames = await AsyncStorage.getItem("interestedGames");

    if (!interestedGames) {
      const arr = [];
      await AsyncStorage.setItem("interestedGames", JSON.stringify(arr));
      interestedGames = arr;
    } else {
      interestedGames = JSON.parse(interestedGames);
    }

    // Maybe remove interest?
    if (!interestedGames.includes(userInfo.gameID)) {
      interestedGames.push(userInfo.gameID);
    }

    await AsyncStorage.setItem(
      "interestedGames",
      JSON.stringify(interestedGames)
    );

    Alert.alert(
      "Success",
      "Successfully showed interest in game.",
      [{ text: "OK" }],
      { cancelable: false }
    );
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
    gameID,
    interested,
    joined,
    navigation
  } = props;

  return (
    <TouchableOpacity onPress={() => navigation.navigate("gameScreen")}>
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
          disabled={joined}
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
          disabled={interested}
          onPress={() =>
            interestedGame({
              userID,
              gameID,
              name: username
            })
          }
        />
      </Card>
    </TouchableOpacity>
  );
}

const mapStateToProps = state => state.auth.userAccountData;

export default withNavigation(connect(mapStateToProps)(GameCard));

GameCard.propTypes = {
  title: PropTypes.string,
  sport: PropTypes.string,
  skillLevel: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  userID: PropTypes.number.isRequired,
  gameID: PropTypes.number.isRequired,
  interested: PropTypes.bool,
  joined: PropTypes.bool,
  username: PropTypes.string
};

GameCard.defaultProps = {
  username: null,
  sport: null,
  title: null,
  interested: false,
  joined: false
};
