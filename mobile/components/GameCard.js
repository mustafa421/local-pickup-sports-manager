import React from "react";

import { View, Text, Image } from "react-native";

import { Card, ListItem, Button, Icon } from "react-native-elements";

const joinGame = () => {
  const { navigation } = this.props;
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
  //
};

const showInterest=()=>{
  //
  const { navigation } = this.props;
    try {
      const request = await fetch(
        "http://local-pickup-sports-manager.herokuapp.com/showInterest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userInfo),
          json: true
        }

}

export default function GameCard(props) {
  // implemented with Text and Button as children

  const { title, skillLevel, duration } = props;

  return (
    <Card title={title}>
      <Text style={{ marginBottom: 10 }}>Skill Level = {skillLevel}</Text>

      <Text style={{ marginBottom: 10 }}>Time= {duration} </Text>

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
        onClick={joinGame}
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
        onClick={showInterest}
      />
    </Card>
  );
}

const mapStateToProps = state => ({ userInfo });

export default connect(mapStateToProps)(GameCard);

GameCard.propTypes = {
  token: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

GameCard.defaultProps = {
  token: null
};
