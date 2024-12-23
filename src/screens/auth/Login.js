import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import Icon from 'react-native-vector-icons/Ionicons';
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { auth, db } from "../../firebase/firebase"; // Make sure to import your firebase configuration
import ROUTES from "../../../constants/routes";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }
    
    setLoading(true); // Show loading indicator
    try {
      // Perform the login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Fetch additional user data from Firestore
      const userDoc = await getDoc(doc(db, `users/${uid}`));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data:", userData); // You can process the user data as needed
        // Alert.alert("Success", "Logged in successfully!");
        navigation.navigate(ROUTES.HOME);
      } else {
        Alert.alert("Info", "No additional user data found.");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={!isPasswordVisible} // Conditionally set secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {/* <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
        <Icon
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          size={24}
          color="#000"
        />
      </TouchableOpacity> */}
          <Button title="Login" onPress={handleLogin} color="#007BFF" />
          {/* <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}> Create new account </Text>
            <Button
              title="Sign Up"
              onPress={() => navigation.navigate(ROUTES.SIGNUP)}
              color=""
            />
          </View> */}
          <View style={styles.footer}>
                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SIGNUP)}>
                            <Text style={{ color: 'black', fontSize: 15 }}>Don't have any account? Sign Up</Text>
                        </TouchableOpacity>
            </View>
          <View style={styles.homeLink}>
            <Button
              title="Go to Home"
              onPress={() => navigation.navigate(ROUTES.MENTOR_PROFILE_SETUP)}
              color="#28A745"
            />
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
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  pass:{
    fontFamily:["poppins-semiBold"],
              fontSize:12,
              color:'#0000FF',
              alignSelf: "flex-end",
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  signUpText: {
    color: "#FFC0CB",
    margin: 10, marginBottom: 0
  },
  homeLink: {
    marginTop: 8,
  },
  
});

export default Login;
