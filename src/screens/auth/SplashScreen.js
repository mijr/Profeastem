import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../../constants/routes"; 

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate(ROUTES.LOGIN);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Find the right mentor for your Academic journey
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/land.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.line} /> 
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF097", 
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: width * 0.08, 
    textAlign: "center",
    color: "#000000", 
    marginBottom: height * 0.05,
    fontFamily: "sans-serif-medium", 
  },
  imageContainer: {
    width: width * 0.6, 
    height: height * 0.3,
    marginBottom: height * 0.02, 
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  line: {
    width: "100%",
    height: 2,
    backgroundColor: "#000", 
    marginTop: height * 0.02, 
  },
  button: {
    backgroundColor: "#FFAAF7", 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: height * 0.05, 
  },
  buttonText: {
    color: "#FFFFFF", 
    fontSize: width * 0.05, 
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SplashScreen;
