import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { db } from "../../firebase/firebase"; // Adjust the path as necessary
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods
import { getAuth } from "firebase/auth"; // Import Auth to get user information
import ROUTES from "../../../constants/routes";

const MentorProfileSetUp = ({ navigation }) => {
  const [about, setAbout] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [expertise, setExpertise] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleProfileSubmit = async () => {
    if (!about.trim() || !qualifications.trim() || !expertise.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const auth = getAuth(); // Initialize Firebase Auth
      const user = auth.currentUser; // Get the current user

      if (!user) {
        Alert.alert("Error", "You must be logged in to save your profile.");
        return;
      }

      // Prepare profile data
      const profileData = {
        displayName: user.displayName || "", // Include user name
        uid: user.uid, // Store user ID
        about,
        qualifications,
        expertise,
      };

      // Save profile data in Firestore under the user's document
      await setDoc(doc(db, `mentorProfiles/${user.uid}`), profileData, { merge: true });
      navigation.navigate(ROUTES.AVAILABILITY);
      Alert.alert("Success", "Profile saved successfully!");
      // Optionally navigate to another screen or reset fields here
      setAbout("");
      setQualifications("");
      setExpertise("");
    } catch (error) {
      console.error("Error saving profile data: ", error);
      Alert.alert("Error", "Failed to save profile data. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set Up Your Mentor Profile</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tell us a bit about yourself</Text>
        <TextInput
          style={styles.input}
          multiline
          value={about}
          onChangeText={setAbout}
        />

        <Text style={styles.label}>List your qualifications below</Text>
        <TextInput
          style={styles.input}
          multiline
          value={qualifications}
          onChangeText={setQualifications}
        />

        <Text style={styles.label}>Area of expertise</Text>
        <TextInput
          style={styles.input}
          value={expertise}
          onChangeText={setExpertise}
        />
      </View>

      {/* Show loading indicator if in loading state */}
      {loading ? (
        <ActivityIndicator size="large" color="#d600a7" />
      ) : (
        <View style={styles.navigation}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.navButton}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleProfileSubmit}
            style={styles.navButton}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
    textAlign: "center",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#666",
  },
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    padding: 8,
    borderRadius: 4,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  navButton: {
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d600a7",
  },
});

export default MentorProfileSetUp;
