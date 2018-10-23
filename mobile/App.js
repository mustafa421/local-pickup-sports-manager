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

export default class App extends React.Component {
  componentDidMount() {
    // Is called when the component is mounted on the screen
  }

  render() {
    const MainNavigator = createBottomTabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        createGame: { screen: createGameScreen },
        main: {
          screen: createStackNavigator({
            mainScreen: { screen: MainScreen },
            settings: { screen: SettingsScreen }
          })
        }
      },
      {
        navigationOptions: {
          tabBarVisible: true
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
