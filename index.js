import "setimmediate";
// Polyfill setImmediate if it doesn't exist
if (typeof global.setImmediate === "undefined") {
  global.setImmediate = (fn, ...args) => {
    return global.setTimeout(fn, 0, ...args);
  };
}

// Ensure react-native-gesture-handler is imported first
import "react-native-gesture-handler";

// Import necessary modules from React Native and Expo
import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

// Register the main component
AppRegistry.registerComponent(appName, () => App);

// Register root component with Expo
registerRootComponent(App);
