import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import ROUTES from "../../../constants/routes";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome, we are glad to have you on board. To get started, we need to
        set up your profile in order to provide you with the best experience.
      </Text>
      <Image
        source={require("../../assets/onboard.png")}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(ROUTES.ROLE_CHOOSE)}
      >
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  welcomeText: {
    width: width * 0.85,
    fontSize: 18,
    color: "#333333",
    textAlign: "center",
    position: "absolute",
    top: height * 0.1,
  },
  image: {
    width: 250,
    height: 275,
    position: "absolute",
    top: height * 0.3,
  },
  button: {
    width: width * 0.9, // 90% of screen width
    height: 63,
    position: "absolute",
    bottom: 30, // Slightly up from the very bottom
    left: width * 0.05, // Centered horizontally
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFAAF7",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default OnboardingScreen;
