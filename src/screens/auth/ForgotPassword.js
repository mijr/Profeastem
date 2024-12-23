import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React from "react";
import ROUTES from "../../../constants/routes"; // Ensure this import is correct


const ForgotPassword = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate(ROUTES.LOGIN)}
      />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 16,
    fontSize: 14,
    color: "#333",
  },
  link: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});
export default ForgotPassword;
