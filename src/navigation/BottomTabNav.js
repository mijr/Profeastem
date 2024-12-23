import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Settings, Chats, Resources, Schedule, HomeScreen } from "../screens";
import ROUTES from "../../constants/routes";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME_TAB} // Set Home as the default screen
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
      <Tab.Screen name={ROUTES.SCHEDULE_TAB} component={Schedule} />
      <Tab.Screen name={ROUTES.CHATS_TAB} component={Chats} />
      <Tab.Screen name={ROUTES.HOME_TAB} component={HomeScreen} />
      <Tab.Screen name={ROUTES.RESOURCES_TAB} component={Resources} />
      <Tab.Screen name={ROUTES.SETTINGS_TAB} component={Settings} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
