import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { db } from "../../firebase/firebase"; // Ensure this path is correct
// import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import ROUTES from "../../../constants/routes";

const { width } = Dimensions.get("window");

const Availability = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFromPickerVisible, setFromPickerVisibility] = useState(false);
  const [isToPickerVisible, setToPickerVisibility] = useState(false);
  const [availabilityData, setAvailabilityData] = useState([]);

  // Show / hide time pickers
  const showFromPicker = () => {
    setFromPickerVisibility(true);
  };
  const hideFromPicker = () => {
    setFromPickerVisibility(false);
  };

  const handleFromConfirm = (date) => {
    setFromTime(date);
    hideFromPicker();
  };

  const showToPicker = () => {
    setToPickerVisibility(true);
  };

  const hideToPicker = () => {
    setToPickerVisibility(false);
  };

  const handleToConfirm = (date) => {
    setToTime(date);
    hideToPicker();
  };

  // Fetch availability data
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Reference user's availability documents
      const userAvailabilityRef = collection(db, "availability");
      const unsubscribe = onSnapshot(userAvailabilityRef, (snapshot) => {
        const availabilities = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((item) => item.uid === user.uid); // Ensure we only get the user's data
        setAvailabilityData(availabilities);
      });

      return () => unsubscribe();
    }
  }, []);

  // Handle availability submission
  const handleAvailabilitySubmit = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "You must be logged in to set your availability.");
        return;
      }

      // Create a unique document ID
      const docId = `${user.uid}_${selectedDay}`;

      // Prepare availability data
      const availabilityData = {
        day: selectedDay,
        from: fromTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        to: toTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        displayName: user.displayName || "",
        uid: user.uid, // Include uid to filter later
      };

      // Save availability data in Firestore
      await setDoc(doc(db, `availability/${docId}`), availabilityData);
      // Alert.alert("Success", "Availability set successfully!");
      navigation.navigate(ROUTES.PROFILE_SETUP);
    } catch (error) {
      console.error("Error submitting availability data: ", error);
      Alert.alert("Error", `Failed to save availability data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Saving your availability...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.heading}>Set Your Availability</Text>

          <View style={styles.inputContainer}>
            <Picker
              selectedValue={selectedDay}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedDay(itemValue)}
            >
              <Picker.Item label="Select a day" value="" />
              <Picker.Item label="Monday" value="monday" />
              <Picker.Item label="Tuesday" value="tuesday" />
              <Picker.Item label="Wednesday" value="wednesday" />
              <Picker.Item label="Thursday" value="thursday" />
              <Picker.Item label="Friday" value="friday" />
              <Picker.Item label="Saturday" value="saturday" />
              <Picker.Item label="Sunday" value="sunday" />
            </Picker>

            <Text style={styles.label}>From:</Text>
            <TouchableOpacity onPress={showFromPicker} style={styles.input}>
              <Text style={styles.inputText}>
                {fromTime ? fromTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Select Time"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isFromPickerVisible}
              mode="time"
              onConfirm={handleFromConfirm}
              onCancel={hideFromPicker}
            />

            <Text style={styles.label}>To:</Text>
            <TouchableOpacity onPress={showToPicker} style={styles.input}>
              <Text style={styles.inputText}>
                {toTime ? toTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Select Time"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isToPickerVisible}
              mode="time"
              onConfirm={handleToConfirm}
              onCancel={hideToPicker}
            />
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navigation}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.navButton}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAvailabilitySubmit}
              style={styles.navButton}
            >
              <Text style={styles.nextButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          {/* Availability List */}
          <Text style={styles.subheading}>Your Availability:</Text>
          <FlatList
            data={availabilityData}
            keyExtractor={(item) => item.id}  // Use doc.id as the key
            renderItem={({ item }) => (
              <View style={styles.availabilityItem}>
                <Text style={styles.day}>{item.day}</Text>
                <Text style={styles.time}>{item.from} - {item.to}</Text>
              </View>
            )}
          />
        </>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
    textAlign: "center",
  },
  subheading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
    color: "#666",
  },
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 4,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    padding: 15,
    borderRadius: 4,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 15,
    color: "#666",
  },
  availabilityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 5,
  },
  day: {
    fontSize: 18,
    color: '#333',
  },
  time: {
    fontSize: 16,
    color: '#666',
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
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

export default Availability;
