import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibrary } from "react-native-image-picker"; // Import image picker
import { db } from "../../firebase/firebase"; // Adjust the path according to your project structure
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Auth to fetch user info
import ROUTES from "../../../constants/routes";

const { width } = Dimensions.get("window");

const ProfileSetUp = ({ navigation }) => {
  const [selectedSex, setSelectedSex] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false 
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setProfileImage(response.assets[0].uri); // Set the selected image URI
      }
    });
  };

  const handleSubmit = async () => {
    setLoading(true); // Show loading indicator
    const auth = getAuth(); // Get authentication instance
    const currentUser = auth.currentUser; // Get current user

    if (!currentUser) {
      console.error("User is not authenticated");
      Alert.alert("Error", "You must be logged in to save your profile data.");
      setLoading(false);
      return;
    }

    const userId = currentUser.uid; // Get current user ID

    try {
      await setDoc(doc(db, `users/${userId}`), {
        displayName: currentUser.displayName || "", // Save user display name
        bio,
        location,
        sex: selectedSex,
        birthdate: date,
        profileImage,
        timestampCreate: Timestamp.now(),
      });
      navigation.navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Error saving profile data: ", error);
      Alert.alert("Error", `Failed to save profile: ${error.message}`);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <View style={styles.frame}>
            <Text style={styles.heading}>Profile Setup</Text>
            
            <TouchableOpacity onPress={handleChoosePhoto} style={styles.imageContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <Image
                  source={require("../../assets/placeholder.png")} // Placeholder image
                  style={styles.profileImage}
                />
              )}
              <View style={styles.editIcon}>
                <Text style={styles.editIconText}>Edit</Text>
              </View>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Bio"
              placeholderTextColor="#666666"
              value={bio}
              onChangeText={setBio}
            />
          </View>
          
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.halfInput, styles.dateInput]}
              onPress={() => setShow(true)}
            >
              <Text style={styles.dateText}>
                {date.toISOString().split("T")[0]}
              </Text>
              <Image
                source={require("../../assets/calendar-icon.svg")} // Ensure this path is correct
                style={styles.calendarIcon}
              />
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
            
            <RNPickerSelect
              style={{
                ...pickerSelectStyles,
                inputIOS: styles.input,
                inputAndroid: styles.input,
              }}
              value={selectedSex}
              onValueChange={(value) => setSelectedSex(value)}
              placeholder={{
                label: "Select Sex",
                value: "",
              }}
              items={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Location"
            placeholderTextColor="#666666"
            value={location}
            onChangeText={setLocation}
          />

          <View style={styles.navigation}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate(ROUTES.ONBOARDING_SCREEN)}
            >
              <Text style={styles.navButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={handleSubmit} // Use handleSubmit to save data and navigate
            >
              <Text style={styles.navButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    width: width - 30,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  imageContainer: {
    width: 199,
    height: 199,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  profileImage: {
    width: 199,
    height: 199,
    borderRadius: 99.5,
  },
  editIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 5,
  },
  editIconText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  input: {
    width: width - 30,
    height: 50,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: "#333333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 30,
  },
  halfInput: {
    width: 174,
    height: 75,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  dateInput: {
    justifyContent: "center",
  },
  dateText: {
    color: "#333333",
  },
  calendarIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 30,
    position: "absolute",
    bottom: 20,
  },
  navButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#d600a7",
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...styles.input,
    paddingRight: 30, // to ensure the dropdown arrow is visible
  },
  inputAndroid: {
    ...styles.input,
    paddingRight: 30, // to ensure the dropdown arrow is visible
  },
});

export default ProfileSetUp;
