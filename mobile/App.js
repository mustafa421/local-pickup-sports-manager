import React from "react";
import { Provider } from "react-redux";
import { createBottomTabNavigator } from "react-navigation";
import store from "./store";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthScreen from "./screens/AuthScreen";

export default class App extends React.Component {
  componentDidMount() {
    // Is called when the component is mounted on the screen
  }

  render() {
    const MainNavigator = createBottomTabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen }
    });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
