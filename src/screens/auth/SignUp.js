import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity, Alert } from "react-native";
import { auth, db } from "../../firebase/firebase"; // Adjust the path according to your project structure
import { doc, setDoc, Timestamp } from "firebase/firestore"; 
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import ROUTES from "../../../constants/routes"; 

const SignUp = ({ navigation }) => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are required."); 
      return; 
    }
    
    try {
      // Attempt to create a user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); 
      const { uid } = userCredential.user; 

      // Save additional user info to Firestore
      await setDoc(doc(db, `users/${uid}`), {
        displayName: name,
        timestampCreate: Timestamp.now(),
      });

      Alert.alert("Success", "Account created successfully!"); 
      navigation.navigate(ROUTES.ONBOARDING_SCREEN); 
    } catch (error) {
      if (error.code === "Email-already-in-use") {
        Alert.alert("Error", "Email is already in use. Please log in."); 
      } else {
        Alert.alert("Error", `Error signing up: ${error.message}`); 
      }
    }finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
           ) : (
            <>
      <Text style={styles.title}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up"
       onPress={handleSignUp} />
      <View style={styles.footer}>
           <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
                 <Text style={{ color: 'black', fontSize: 15, textAlign: 'center', paddingTop: 20 }}>You have an account? Log In</Text>
            </TouchableOpacity>
         </View>
      {/* <Button
        title="Already have an account? Sign In"
        onPress={() => navigation.navigate(ROUTES.LOGIN)}
      /> */}
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
 
});

export default SignUp;
