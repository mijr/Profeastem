import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from "react-native";
import { db } from "../../firebase/firebase"; // Ensure this path is correct
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import ROUTES from "../../../constants/routes";

const ChooseRole = ({ navigation }) => {
   const [userId, setUserId] = useState(null);
   const [userData, setUserData] = useState({});
   const [selectedRole, setSelectedRole] = useState(null);
   const [loading, setLoading] = useState(false);
 
   useEffect(() => {
     const fetchUserData = async () => {
       const auth = getAuth();
       const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

       if (currentUserId) {
         setUserId(currentUserId);
         try {
           const userDocRef = doc(db, `users/${currentUserId}`);
           const userDocSnapshot = await getDoc(userDocRef);
           if (userDocSnapshot.exists()) {
             const data = userDocSnapshot.data();
             console.log("User data fetched:", data); // Debug log
             setUserData(data);
           } else {
             Alert.alert("Error", "User not found.");
           }
         } catch (error) {
           console.error("Error fetching user data:", error);
           Alert.alert("Error", "Failed to fetch user data.");
         }
       } else {
         Alert.alert("Error", "User ID is required.");
       }
     };
 
     fetchUserData();
   }, []);
 
   const handleNext = async () => {
     if (!selectedRole) {
       Alert.alert("Error", "Please select a role.");
       return;
     }
 
     if (!userId) {
       Alert.alert("Error", "User ID is required.");
       return;
     }
 
     setLoading(true);
 
     try {
       const userDocRef = doc(db, `users/${userId}`);

       // Include user name and selected role in the document
       await setDoc(userDocRef, {
         displayName: userData.displayName || "",
         role: selectedRole,
         // Add other fields if necessary
       }, { merge: true });
 
       // Navigate based on the selected role
       if (selectedRole === "Mentor") {
         navigation.navigate(ROUTES.MENTOR_PROFILE_SETUP);
       } else if (selectedRole === "Mentee") {
         navigation.navigate(ROUTES.MENTEE_PROFILE_SETUP);
       }
     } catch (error) {
       console.error("Error saving user role: ", error);
       Alert.alert("Error", `Failed to save user role: ${error.message}`);
     } finally {
       setLoading(false);
     }
   };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose Your Role</Text>

      {/* Mentor Card */}
      <TouchableOpacity
        style={[
          styles.card,
          selectedRole === "Mentor" ? styles.selectedMentorCard : null,
        ]}
        onPress={() => setSelectedRole("Mentor")}
        accessibilityLabel="Select Mentor Role"
      >
        <Image
          source={require("../../assets/mentor.png")}
          style={styles.image}
          onError={() => console.log("Failed to load mentor image")}
        />
        <Text style={styles.cardText}>Mentor</Text>
      </TouchableOpacity>

      {/* Mentee Card */}
      <TouchableOpacity
        style={[
          styles.card,
          selectedRole === "Mentee" ? styles.selectedMenteeCard : null,
        ]}
        onPress={() => setSelectedRole("Mentee")}
        accessibilityLabel="Select Mentee Role"
      >
        <Image
          source={require("../../assets/mentee.png")}
          style={styles.image}
          onError={() => console.log("Failed to load mentee image")}
        />
        <Text style={styles.cardText}>Mentee</Text>
      </TouchableOpacity>

      {/* Display loading indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D477CC" />
          <Text style={styles.loadingText}>Saving...</Text>
        </View>
      )}

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          disabled={!selectedRole || loading}
        >
          <Text
            style={[
              styles.nextButton,
              (!selectedRole || loading) ? styles.disabledNextButton : null,
            ]}
          >
            {loading ? "Loading..." : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
    elevation: 3,
  },
  selectedMentorCard: {
    borderColor: "#FFEB3B",
    backgroundColor: "#FFF9C4",
  },
  selectedMenteeCard: {
    borderColor: "#FFEB3B",
    backgroundColor: "#FFF9C4",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
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
    marginTop: 30,
  },
  backButton: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  nextButton: {
    color: "#D477CC",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledNextButton: {
    color: "#aaa",
  },
});

export default ChooseRole;
