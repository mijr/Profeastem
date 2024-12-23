import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import ROUTES from "../../../constants/routes";

const Availability = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set Your Availability</Text>

      {/* Placeholder for availability inputs */}
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          Availability settings go here.
        </Text>
      </View>

      {/* Finish Button */}
      <Button
        title="Finish"
        onPress={() => navigation.navigate(ROUTES.HOME)}
        color="#6200EE"
      />

      {/* Back Link */}
      <Text style={styles.text}>
        Want to go back?{" "}
        <Text style={styles.link} onPress={() => navigation.goBack()}>
          Go Back
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  placeholder: {
    width: "100%",
    height: 150,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: "#aaa",
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    color: "#666",
    textAlign: "center",
  },
  link: {
    color: "#6200EE",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default Availability;
