import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '../../firebase/firebase'; // Adjust the path as necessary
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore methods
import { getAuth } from "firebase/auth"; // Import Auth to get user information

const GoalSetUp = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [qaSessions, setQASessions] = useState(3);
  const [lectures, setLectures] = useState(4);
  const [articles, setArticles] = useState(2);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your goal.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const auth = getAuth(); // Initialize Firebase Auth
      const user = auth.currentUser; // Get the current user
      
      if (!user) {
        Alert.alert('Error', 'You must be logged in to save your goal.');
        return;
      }

      // Prepare goal data
      const goalData = {
        title,
        qaSessions,
        lectures,
        articles,
        userId: user.uid, // Associate goal with the user
      };

      // Save goal data to Firestore under the 'goals' collection
      await setDoc(doc(db, 'goals', user.uid), goalData); // Simple example; adjust as necessary
      
     Alert.alert('Success', 'Goal saved successfully!');
      // Optionally reset form fields here or navigate to another screen
      setTitle('');
      setQASessions(3);
      setLectures(4);
      setArticles(2);
    } catch (error) {
      console.error("Error saving goal data: ", error);
      Alert.alert('Error', 'Failed to save goal data. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                  <Icon name="arrow-back" size={30} color="#000" />
                </TouchableOpacity>
        <Text style={styles.title}>Create Goal</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ff69b4" style={styles.loader} />
      ) : (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter your goal title"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>QA Sessions:</Text>
            <TextInput
              style={styles.input}
              value={qaSessions.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setQASessions(parseInt(text, 10) || 0)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Lectures:</Text>
            <TextInput
              style={styles.input}
              value={lectures.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setLectures(parseInt(text, 10) || 0)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Articles:</Text>
            <TextInput
              style={styles.input}
              value={articles.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setArticles(parseInt(text, 10) || 0)}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: "#FFF3C4",
    height: 170,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#ff69b4',
    padding: 15,
    borderRadius: 55,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  loader: {
    marginVertical: 20,
  }
});

export default GoalSetUp;
