import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// import { getAuth } from 'firebase/auth';
// import { db } from '../../firebase/firebase'; // Ensure this path is correct
// import { doc, setDoc, getDoc } from 'firebase/firestore'; // Import getDoc to retrieve user data
import DateTimePicker from '@react-native-community/datetimepicker'; // Import the community date picker
import ROUTES from '../../../constants/routes';

const ProfileEdit = ({ navigation }) => {
  const [bio, setBio] = useState('');
  const [dob, setDob] = useState(new Date()); // Initialize with current date
  const [sex, setSex] = useState('');
  const [location, setLocation] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false); // State to control date picker visibility

  useEffect(() => {
    // Fetch user data when the component mounts
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Fetch user data from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setBio(data.bio || '');
          setDob(data.birthdate ? new Date(data.birthdate.seconds * 1000) : new Date()); // Convert Firestore timestamp to Date object
          setSex(data.sex || '');
          setLocation(data.location || '');
          setProfileImage(data.profileImage || '');
        }
      }).catch((error) => {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Failed to fetch user data: " + error.message);
      });
    }
  }, []);

  const handleImageUpload = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          setProfileImage(response.assets[0].uri); // Set the selected image URI
        }
      }
    );
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "You must be logged in to update your profile.");
      setLoading(false);
      return;
    }

    try {
      const profileData = {
        bio,
        birthdate: { seconds: Math.floor(dob.getTime() / 1000) }, // Store as Firestore timestamp
        sex,
        location,
        profileImage,
      };
      
      await setDoc(doc(db, 'users', user.uid), profileData);
      Alert.alert("Success", "Profile updated successfully!");
      navigation.navigate(ROUTES.PROFILE_EDIT); // Navigate to home after saving
    } catch (error) {
      console.error("Error saving profile data:", error);
      Alert.alert("Error", "Failed to update profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowPicker(false); // Hide the picker
    if (selectedDate) {
      setDob(selectedDate); // Set selected date
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Profile</Text>
      </View>
      <View style={styles.profilePicture}>
        <Text style={styles.profilePictureText}>Profile Picture</Text>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: profileImage || 'https://picsum.photos/200' }} // Use uploaded image or placeholder
            style={styles.profileImage}
          />
          <TouchableOpacity onPress={handleImageUpload}>
            <Icon name="edit" size={24} color="#fff" style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setBio}
              value={bio}
              placeholder="Enter your bio"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <TouchableOpacity onPress={showDatePicker} style={styles.datePickerButton}>
              <Text style={styles.datePickerText}>{dob.toDateString()}</Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Sex</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setSex}
              value={sex}
              placeholder="Enter your sex"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setLocation}
              value={location}
              placeholder="Enter your location"
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
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
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  profilePicture: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePictureText: {
    fontSize: 18,
    marginBottom: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#FFC0CB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProfileEdit;
