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
import UpdateSettingsScreen from "./screens/UpdateSettingsScreen";
import PreferencesScreen from "./screens/PreferencesScreen";
import GameScreen from "./screens/GameScreen";

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
            mainScreen: { screen: MainScreen },
            PreferencesScreen: { screen: PreferencesScreen },
            settings: { screen: SettingsScreen }
          })
        },
        game: {
          screen: createStackNavigator({
            gameScreen: { screen: GameScreen },
            main: { screen: MainScreen },
            settings: { screen: SettingsScreen }
          })
        },
        updateSettingsScreen: {
          screen: createStackNavigator({
            updateSettings: { screen: UpdateSettingsScreen },
            settingsScreen: { screen: SettingsScreen }
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
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
