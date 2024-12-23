import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebaseApp }  from "./src/firebase/firebase";
import AuthNavigator from "./src/navigation/AuthNavigator";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
     <AuthNavigator/>
    </NavigationContainer>
  );
};

export default App;

// Only import react-native-gesture-handler on native platforms
//TODO : add {import 'react-native-gesture-handler'} when building project