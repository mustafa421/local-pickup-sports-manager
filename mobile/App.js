import React from "react";
import { Provider } from "react-redux";
import { TabNavigator } from "react-navigation";
import store from "./store";
import WelcomeScreen from "./screens/WelcomeScreen";

export default class App extends React.Component {
  componentDidMount() {
    // Is called when the component is mounted on the screen
  }

  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen }
    });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
