import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import Icon from 'react-native-vector-icons/Ionicons';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
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

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      const userDoc = await getDoc(doc(db, `users/${uid}`));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data:", userData);
        navigation.navigate(ROUTES.HOME);
      } else {
        Alert.alert("Info", "No additional user data found.");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
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
           <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Icon
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={24}
                color="#007BFF"
              />
            </TouchableOpacity>
          </View>
          <Button title="Login" onPress={handleLogin} color="#007BFF" />
          
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)} style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SIGNUP)}>
              <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
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
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  icon: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  forgotPassword: {
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  signUpText: {
    color: "#007BFF",
    textAlign: "center",
  },
  footer: {
    marginTop: 20,
  },
  homeLink: {
    marginTop: 8,
  },
  passwordContainer: {
    width: "100%",
    position: "relative", // Allows absolute positioning of the icon
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1, // Make sure the icon is above the input field
  },
});

export default Login;
