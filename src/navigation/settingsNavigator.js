import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ROUTES from "../../constants/routes"; // Ensure this import is correct
import BottomTabNavigator from "./BottomTabNav";
import AddSchedule from "../screens/home/Add_Schedule";

const Stack = createStackNavigator();

const settingsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.SPLASHSCREEN}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === ROUTES.SCHEDULE_TAB) {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === ROUTES.CHATS_TAB) {
            iconName = focused ? "mail" : "mail-outline";
          } else if (route.name === ROUTES.HOME_TAB) {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === ROUTES.RESOURCES_TAB) {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === ROUTES.SETTINGS_TAB) {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Stack.Screen
        name={ROUTES.SPLASHSCREEN}
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.SIGNUP}
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ONBOARDING_SCREEN}
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.PROFILE_SETUP}
        component={ProfileSetUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ROLE_CHOOSE}
        component={ChooseRole}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.MENTEE_PROFILE_SETUP}
        component={MenteeProfileSetup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.MENTOR_PROFILE_SETUP}
        component={MentorProfileSetUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.AVAILABILITY}
        component={Availability}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ADD_SCHEDULE}
        component={AddSchedule}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.HOME}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default settingsNavigator;
