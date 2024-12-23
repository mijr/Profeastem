import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "../../constants/routes"; // Ensure this import is correct
import {
  EditProfile,
  
  Help,
  Settings,
  ChatScreen,
  notificationSettings,
} from "../screens";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.SETTINGS} // Start with Settings screen for this example
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={ROUTES.SETTINGS}
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.EDIT_PROFILE}
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.NOTIFICATION_SETTINGS}
        component={notificationSettings}
        options={{ headerShown: false }}
      />
     
      <Stack.Screen
        name={ROUTES.HELP}
        component={Help}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.CHAT_SCREEN}
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
