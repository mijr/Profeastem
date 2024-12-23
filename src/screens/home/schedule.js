import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { collection, getDocs } from "firebase/firestore"; // Firestore functions
import { useNavigation } from "@react-navigation/native";
import { db } from '../../firebase/firebase'; // Path to your Firebase configuration
import ROUTES from "../../../constants/routes";
const Schedule = () => {
  const navigation = useNavigation();
  const [sessions, setSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true); // Start loading
      try {
        const sessionsCollection = collection(db, 'schedules'); // Reference to the schedules collection
        const sessionSnapshot = await getDocs(sessionsCollection);
        
        // Map Firestore documents to session objects
        const sessionList = sessionSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSessions(sessionList);
      } catch (error) {
        console.error("Error fetching sessions: ", error);
        Alert.alert('Error', 'Could not fetch session data.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchSessions();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  // Filter sessions based on the search input
  const filteredSessions = sessions.filter(session => 
    session.title && session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSchedule = () => {
    navigation.navigate(ROUTES.SESSION); // Navigate to the Session screen
  };

  // Render loading indicator or content
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff69b4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sessions</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Sessions"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>History</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.sessionsContainer}>
        {filteredSessions.map((session, index) => (
          <View key={session.id} style={styles.sessionItem}>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionTitle}>{session.title || 'No Title Available'}</Text>
              <Text style={styles.sessionTeacher}>{session.teacher || 'Unknown Teacher'}</Text>
            </View>
            <View style={styles.sessionDetails}>
              <Text style={styles.sessionTime}>{session.time || 'Time Not Set'}</Text>
              <Text style={styles.sessionDate}>{session.date || 'Date Not Set'}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddSchedule}>
        <Text style={styles.addButtonText}>Add Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: "bold",
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    backgroundColor: '#ffe5b4',
    borderRadius: 5,
  },
  tabText: {
    fontSize: 16,
  },
  sessionsContainer: {
    flex: 1,
  },
  sessionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sessionInfo: {
    marginBottom: 5,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sessionTeacher: {
    fontSize: 16,
    color: '#555',
  },
  sessionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sessionTime: {
    fontSize: 16,
  },
  sessionDate: {
    fontSize: 16,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#ff69b4', // Bright pink color for button
    padding: 15,
    borderRadius: 55,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Schedule;
