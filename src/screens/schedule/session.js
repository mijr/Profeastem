import React from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";

const Session = ({ route, navigation }) => {
  const { session } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{session.name}</Text>
      <Text style={styles.instructor}>Instructor: {session.instructor}</Text>
      <Text style={styles.time}>Time: {session.time}</Text>
      <Text style={styles.date}>Date: {session.date}</Text>
      <Text style={styles.description}>Description: {session.description}</Text>
      <Button
        title="Start Session"
        onPress={() => {
          /* Add functionality to start session */
        }}
      />
      <Button
        title="Cancel Session"
        onPress={() => {
          /* Add functionality to cancel session */
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  instructor: {
    fontSize: 18,
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
  },
});

export default Session;
