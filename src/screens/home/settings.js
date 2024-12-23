import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Settings = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Clear user session and tokens
    // Navigate to login screen
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Icon name="person-outline" size={24} style={styles.icon} />
          <Text style={styles.optionText}>My profile</Text>
          <Icon
            name="chevron-forward-outline"
            size={24}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Icon name="notifications-outline" size={24} style={styles.icon} />
          <Text style={styles.optionText}>Notifications</Text>
          <Icon
            name="chevron-forward-outline"
            size={24}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Availability")}
        >
          <Icon name="lock-closed-outline" size={24} style={styles.icon} />
          <Text style={styles.optionText}>Availability</Text>
          <Icon
            name="chevron-forward-outline"
            size={24}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Help")}
        >
          <Icon name="help-circle-outline" size={24} style={styles.icon} />
          <Text style={styles.optionText}>Help</Text>
          <Icon
            name="chevron-forward-outline"
            size={24}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#FFF3C4",
    height: 170,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  optionContainer: {
    padding: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
  },
  arrowIcon: {
    color: "#A9A9A9",
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#000000",
  },
});

export default Settings;
