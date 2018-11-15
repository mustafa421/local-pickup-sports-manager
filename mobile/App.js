import React from "react";
import { Provider } from "react-redux";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import store from "./store";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthScreen from "./screens/AuthScreen";
import MainScreen from "./screens/MainScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CreateGameScreen from "./screens/CreateGameScreen";
import Game from "./components/Game";

export default class App extends React.Component {
  componentDidMount() {
    // Is called when the component is mounted on the screen
  }

  render() {
    const MainNavigator = createBottomTabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        createGame: {
          screen: createStackNavigator({
            createGameScreen: { screen: CreateGameScreen },
            main: { screen: MainScreen }
          })
        },
        main: {
          screen: createStackNavigator({
            mainScreen: { screen: Game },
            settings: { screen: SettingsScreen }
          })
        }
      },
      {
        navigationOptions: {
          tabBarVisible: false
        }
      }
    );

    return (
      // <Provider store={store}>
      //   <MainNavigator />
      // </Provider>
      <Game
        location={"madison"}
        date={"Tomorrow"}
        time={"12:00"}
        number_interested={3}
        number_going={4}
        difficulty={1}
        />
    );
  }
}
