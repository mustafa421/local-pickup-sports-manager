import React, { Component } from "react";
import { Permissions, Location } from "expo";
import { View, ScrollView, Platform, Alert } from "react-native";
import { Button } from "react-native-elements";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GameCard } from "../components/GameCard";
import { getGames } from "../actions/game_actions";

export class MainScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Active Games",
    headerLeft: (
      <Button
        title="Settings"
        textStyle={{ color: "rgba(0, 122, 255, 1)" }}
        onPress={() => navigation.navigate("settings")}
        backgroundColor="rgba(0,0,0,0)"
      />
    ),
    headerRight: (
      <Button
        title="Create Game"
        textStyle={{ color: "rgba(0, 122, 255, 1)" }}
        onPress={() => navigation.navigate("createGameScreen")}
        backgroundColor="rgba(0,0,0,0)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === "android" ? 24 : 0 // To prevent overlapping from header in Android devices
    }
  });

  componentDidMount() {
    this.getLocationAsyncAndGetGames();
  }

  getLocationAsyncAndGetGames = async () => {
    const { dispatch } = this.props;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Alert.alert(
        "Unable to get location",
        "Permission to get location denied, unable to get games by location, you may have to reenable permissions in settings",
        [{ text: "OK" }],
        { cancelable: false }
      );
      dispatch(getGames(null, null));
    }
    const location = await Location.getCurrentPositionAsync({});
    dispatch(getGames(location.coords.latitude, location.coords.longitude));
  };

  render() {
    const { games } = this.props;

    return (
      <View>
        <ScrollView>
          {games
            ? games.map(game => (
                // eslint-disable-next-line react/jsx-indent
                <GameCard
                  key={game.gameId}
                  title={game.title}
                  skillLevel={game.skillLevel}
                  duration={game.duration}
                />
              ))
            : null}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ game }) => ({ games: game.games });

export default connect(mapStateToProps)(MainScreen);

MainScreen.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func.isRequired
};

MainScreen.defaultProps = {
  games: null
};
