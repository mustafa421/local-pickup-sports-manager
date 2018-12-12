import React, { Component } from "react";
import { Permissions, Location } from "expo";
import {
  View,
  Platform,
  Alert,
  ScrollView,
  RefreshControl,
  AsyncStorage,
  Dimensions
} from "react-native";
import { Button, Text } from "react-native-elements";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// eslint-disable-next-line import/no-named-as-default
import GameCard from "../components/GameCard";
import { getGames } from "../actions/game_actions";

export class MainScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "",
    headerLeft: (
      <View style={{ flexDirection: "row" }}>
        <Button
          title="Settings"
          textStyle={{ color: "black" }}
          onPress={() => navigation.navigate("settings")}
          buttonStyle={{ padding: 10 }}
          backgroundColor="paleturquoise"
          buttonStyle={{
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 5,
            paddingRight: 5
          }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 15 }}> Active Games</Text>
      </View>
    ),
    headerRight: (
      <Button
        title="Create Game"
        textStyle={{ color: "black" }}
        onPress={() => navigation.navigate("createGameScreen")}
        backgroundColor="paleturquoise"
        buttonStyle={{ borderColor: "black", borderWidth: 1, borderRadius: 5 }}
      />
    ),
    headerStyle: {
      backgroundColor: "#03A9F4",
      marginTop: Platform.OS === "android" ? 24 : 0, // To prevent overlapping from header in Android devices
      textAlign: "center"
    }
  });

  state = { refreshing: false }; // For use with pull to refresh

  componentDidMount() {
    this.getLocationAsyncAndGetGames();
  }

  getLocationAsyncAndGetGames = async () => {
    this.setState({ refreshing: true });
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
    this.setState({ refreshing: false });
    dispatch(getGames(location.coords.latitude, location.coords.longitude));
  };

  render() {
    const { games } = this.props;
    const { refreshing } = this.state;

    /* eslint-disable react/jsx-wrap-multilines */
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.getLocationAsyncAndGetGames}
          />
        }
        style={{
          backgroundColor: "lightblue",
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
        }}
      >
        {games && games.length > 0 ? (
          games.map(game => (
            // eslint-disable-next-line react/jsx-indent
            <GameCard
              key={game.gameID}
              gameID={game.gameID}
              interested={game.interested}
              joined={game.joined}
              sport={game.sport}
              title={game.title}
              skillLevel={game.skillLevel}
              duration={game.duration}
            />
          ))
        ) : (
          <Text style={{ textAlign: "center" }}>
            No games available. Be the first! Click Create Game in the top right
            corner of your screen.
          </Text>
        )}
      </ScrollView>
    );
    /* eslint-enable react/jsx-wrap-multilines */
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
