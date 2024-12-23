import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { db } from "../../firebase/firebase"; // Ensure this path is correct
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods
import { getAuth } from "firebase/auth"; // Import Auth to get user information
import ROUTES from "../../../constants/routes";

const { width } = Dimensions.get("window");

const MenteeProfileSetup = ({ navigation }) => {
  const [goal, setGoal] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [interestField, setInterestField] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleProfileSubmit = async () => {
    try {
      const auth = getAuth(); // Initialize Firebase Auth
      const user = auth.currentUser; // Get the current user

      if (!user) {
        Alert.alert("Error", "You must be logged in to save your profile.");
        return;
      }

      setLoading(true); // Set loading to true before sending data

      // Include user info in the profile data
      const profileData = {
        displayName: user.displayName || "", // Get user's display name
        goal,
        educationLevel,
        interestField,
      };

      // Save profile data in Firestore under the user's document
      await setDoc(doc(db, `profilesetup/${user.uid}`), profileData);

      // Navigate to the next screen after successfully saving data
      navigation.navigate(ROUTES.AVAILABILITY);
    } catch (error) {
      console.error("Error submitting profile data: ", error);
      Alert.alert("Error", `Failed to save profile data: ${error.message}`);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>To begin, what is your goal?</Text>
      <TextInput
        style={styles.input}
        value={goal}
        onChangeText={setGoal}
        placeholder="Enter your goal"
      />

      <Text style={styles.label}>At what level of education are you?</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          style={pickerSelectStyles}
          value={educationLevel}
          onValueChange={setEducationLevel}
          placeholder={{ label: "Select your education level", value: null }}
          items={[
            { label: "High School", value: "high_school" },
            { label: "Undergraduate", value: "undergraduate" },
            { label: "Graduate", value: "graduate" },
            { label: "Postgraduate", value: "postgraduate" },
          ]}
        />
      </View>

      <Text style={styles.label}>What are your fields of interest?</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          style={pickerSelectStyles}
          value={interestField}
          onValueChange={setInterestField}
          placeholder={{ label: "Select your field of interest", value: null }}
          items={[
            { label: "Science", value: "science" },
            { label: "Technology", value: "technology" },
            { label: "Engineering", value: "engineering" },
            { label: "Mathematics", value: "mathematics" },
            { label: "Arts", value: "arts" },
            { label: "Business", value: "business" },
          ]}
        />
      </View>

      {/* Loading indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D477CC" />
          <Text style={styles.loadingText}>Saving your profile...</Text>
        </View>
      )}

      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleProfileSubmit} // Call to submit profile data
          style={styles.navButton}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 19,
    paddingVertical: 100,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    color: "#000",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16, // Adjusted margin for spacing
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8",
  },
  pickerContainer: {
    marginBottom: 16, // Adjusted margin for spacing
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 53,
    justifyContent: "center",
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background
    zIndex: 1, // Make sure it's on top
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#D477CC",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
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
  navButton: {
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 53,
    borderRadius: 5,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
    color: "#000",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  inputAndroid: {
    height: 53,
    borderRadius: 5,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
    color: "#000",
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

export default MenteeProfileSetup;
