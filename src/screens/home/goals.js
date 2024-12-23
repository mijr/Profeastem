import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db } from '../../firebase/firebase'; // Adjust the path as necessary
import { collection, getDocs, query, where } from 'firebase/firestore'; // Import Firestore methods
import { getAuth } from "firebase/auth"; // Import Auth to get user information
import ROUTES from "../../../constants/routes";

const Goals = ({navigation}) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(); // Get the current user authentication
  const user = auth.currentUser;
// This should log the user object


  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser; // Get current user
        if (user) {
          const goalsCollection = collection(db, 'goals');
          const q = query(goalsCollection, where('userId', '==', user.uid)); // Query for user's goals
          const querySnapshot = await getDocs(q);
          
          const goalsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setGoals(goalsData); // Set goals state
        }
      } catch (error) {
        console.error("Error fetching goals: ", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchGoals();
  }, [auth]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Goals</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#ff69b4" />
      ) : (
        <View style={styles.content}>
          <TouchableOpacity style={styles.createGoalButton} onPress={() => navigation.navigate(ROUTES.GOAL_SETUP)}>
            <Text style={styles.createGoalButtonText}>+ Create Goal</Text>
          </TouchableOpacity>
          {goals.length > 0 ? (
            goals.map(goal => (
              <View key={goal.id} style={styles.goalContainer}>
                <Text style={styles.goalTitle}>• {goal.title}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressCircle}>
                    <Text style={styles.progressPercentage}>{goal.completionPercentage || '0%'} </Text> {/* Use your logic for completion percentage */}
                    <Text style={styles.progressText}>Completed</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressBarFill, { width: `${goal.qaSessionsCompleted / goal.qaSessions * 100}%` }]} />
                    <Text style={styles.progressBarText}>{goal.qaSessionsCompleted}/{goal.qaSessions} QA sessions</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressBarFill, { width: `${goal.lecturesCompleted / goal.lectures * 100}%` }]} />
                    <Text style={styles.progressBarText}>{goal.lecturesCompleted}/{goal.lectures} lectures</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noGoalsText}>No goals found. Create a new goal!</Text>
          )}
        </View>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  content: {
    flex: 1,
    marginTop:12,
  },
  createGoalButton: {
    backgroundColor: '#ff69b4',
    padding: 10,
    borderRadius: 55,
    alignItems: 'center',
    marginBottom: 20,
  },
  createGoalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  goalContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: 10,
  },
  progressCircle: {
    alignItems: 'center',
    marginBottom: 10,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  progressBar: {
    marginVertical: 5,
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#BA8E23',
  },
  progressBarText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  noGoalsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});

export default Goals;
