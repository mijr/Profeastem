import React, { useState } from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; 
import { db } from '../../firebase/firebase'; // Ensure your db path is correct
import { doc, setDoc } from "firebase/firestore"; // Import the necessary functions
import { getAuth } from "firebase/auth"; // Import Firebase Auth

const Session = ({ navigation }) => {
  const [subject, setSubject] = useState('Physics');
  const [mentorName, setName] = useState();
  const [day, setDay] = useState('Tuesday');
  const [time, setTime] = useState('08:45');
  const [loading, setLoading] = useState(false);

  const handleBookSession = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser; // Get the current user

      // Ensure user is authenticated
      if (!user) {
        Alert.alert('Authentication Error', 'You must be logged in to book a session.');
        setLoading(false);
        return;
      }

      // Collecting session data
      const sessionData = {
        subject,
        mentorName,
        day,
        time,
        username: user.displayName || user.email, // Use display name or email if unavailable
        userId: user.uid, // Store user's ID
        createdAt: new Date(), // Optional: Timestamp for the session
      };

      // Sending data to Firestore under 'schedules' collection
      const docId = `${user.uid}-${Date.now()}`; // Generating a unique document ID
      await setDoc(doc(db, 'schedules', docId), sessionData);

      Alert.alert('Success', 'Session booked successfully!');
      navigation.goBack(); 

    } catch (error) {
      console.error("Error booking session: ", error);
      Alert.alert('Error', 'Failed to book session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#343a40" />
        </TouchableOpacity>
        <Text style={styles.title}>Book a Session</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      ) : (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Subject:</Text>
            <Picker
              selectedValue={subject}
              onValueChange={setSubject}
              style={styles.picker}
            >
              <Picker.Item label="Physics" value="Physics" />
              <Picker.Item label="Mathematics" value="Mathematics" />
              <Picker.Item label="Chemistry" value="Chemistry" />
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mentor Name:</Text>
            <TextInput
                         style={styles.textInput}
                         onChangeText={setName}
                         value={mentorName}
                         placeholder="Enter your Name"
                       />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Day:</Text>
            <Picker
              selectedValue={day}
              onValueChange={setDay}
              style={styles.picker}
            >
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Time:</Text>
            <Picker
              selectedValue={time}
              onValueChange={setTime}
              style={styles.picker}
            >
              <Picker.Item label="08:45" value="08:45" />
              <Picker.Item label="09:00" value="09:00" />
              <Picker.Item label="09:30" value="09:30" />
              <Picker.Item label="10:00" value="10:00" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleBookSession} disabled={loading}>
            <Text style={styles.buttonText}>Book Session</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    padding: 12,
    marginTop: 20,
  },
  backButton: {
    marginRight: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#495057',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#ffffff',
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#ff69b4',
    padding: 15,
    borderRadius: 55,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Session;
