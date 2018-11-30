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
import createGameScreen from "./screens/createGameScreen";
import UpdateSettingsScreen from "./screens/UpdateSettingsScreen";

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
            createGameScreen: { screen: createGameScreen },
            main: { screen: MainScreen }
          })
        },
        main: {
          screen: createStackNavigator({
            mainScreen: { screen: MainScreen },
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
