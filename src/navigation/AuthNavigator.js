import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "../../constants/routes"; // Ensure this import is correct
import { firebaseApp } from "../firebase/firebase";
import BottomTabNavigator from "./BottomTabNav";
import {
  Availability,
  ChooseRole,
  Login,
  SignUp,
  SplashScreen,
  ForgotPassword,
  MenteeProfileSetup,
  MentorProfileSetUp,
  OnboardingScreen,
  ProfileSetUp,
  ProfileEdit,
  Schedule,
  ADD_SCHEDULE,
} from "../screens";

import Goals from '../screens/home/goals';
import Session from '../screens/home/session';
import GoalSetUp from '../screens/home/goalSetUp';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.SPLASHSCREEN}
      screenOptions={{
        headerShown: false, // Hide headers for all screens
      }}
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
        name={ROUTES.FORGOT_PASSWORD}
        component={ForgotPassword}
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
        name={ROUTES.GOALS}
        component={Goals}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name={ROUTES.HOME}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={ROUTES.PROFILE_EDIT}
        component={ProfileEdit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.SCHEDULE_TAB}
        component={Schedule}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.SESSION}
        component={Session}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.GOAL_SETUP}
        component={GoalSetUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
