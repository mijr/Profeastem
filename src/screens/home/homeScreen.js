import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import ROUTES from "../../../constants/routes";
import { db } from '../../firebase/firebase'; // Ensure this path is correct
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import { getAuth } from "firebase/auth";
import routes from '../../../constants/routes';
const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
        const userId = currentUser.uid;
        try {
            const userCollection = collection(db, 'users');
            const userSnapshot = await getDocs(userCollection);
            const usersList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            // The logic should match userId with the data fetched
            const currentUser = usersList.find(user => user.id === userId); 
            setUserData(currentUser);
        } catch (error) {
            console.error("Error fetching user data: ", error);
        }
    } else {
        console.log("No user is logged in");
    }
};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
    <Image
        source={require('../../assets/team.png')}
        style={styles.profileImage}
    />
    <Text style={styles.headerTitle}>Hello, {userData?.name || 'User'}</Text> {/* Correct */}
    <TouchableOpacity onPress={() => console.log('Notification Pressed')}>
        <Image
            source={require('../../assets/notification.svg')}
            style={styles.notificationIcon}
        />
    </TouchableOpacity>
</View>

      <View style={styles.searchContainer}>
        <Image
          source={require('../../assets/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search mentors, groups..."
        />
        <TouchableOpacity>
          <Image
            source={require('../../assets/filter.png')}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.myGoalsContainer}>
        <Text style={styles.sectionTitle}>My Goals</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.GOALS)}
           style={styles.viewAllButton}
        >
          <Text style={styles.viewAllText}>view all</Text>
        </TouchableOpacity>
        <View style={styles.goalContainer}>
          <View style={styles.goalCircle}>
           
            <Text style={styles.goalText}>Chemistry</Text>
          </View>
          <View style={styles.goalCircle}>
            
            <Text style={styles.goalText}>Algebra</Text>
          </View>
          <View style={styles.goalCircle}>
           
            <Text style={styles.goalText}>Surds</Text>
          </View>
        </View>
      </View>

      <View style={styles.scheduleContainer}>
        <Text style={styles.sectionTitle}>Schedule</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Schedule")}
           style={styles.viewAllButton}
        >
          <Text style={styles.viewAllText}>view all</Text>
        </TouchableOpacity>
        <View style={styles.scheduleItem}>
          <Text style={styles.scheduleItemTitle}>Chemistry QA</Text>
          <Text style={styles.scheduleItemSubtitle}>Mrs. Jane</Text>
          <View style={styles.scheduleItemDetails}>
            <Text style={styles.scheduleItemTime}>08:00</Text>
            <Text style={styles.scheduleItemDay}>Tue</Text>
          </View>
        </View>
        <View style={styles.scheduleItem}>
          <Text style={styles.scheduleItemTitle}>Algebra Class</Text>
          <Text style={styles.scheduleItemSubtitle}>Mr. Smith</Text>
          <View style={styles.scheduleItemDetails}>
            <Text style={styles.scheduleItemTime}>10:00</Text>
            <Text style={styles.scheduleItemDay}>Wed</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:30,
    
    
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 10,
    borderColor: '#ccc',
    borderRadius: 55,
    padding: 1,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    color: '#666',
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
  myGoalsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  goalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  goalCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFC0CB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalText: {
    textAlign: 'center',
    marginTop: 5,
  },
  goalIcon: {
    width: 30,
    height: 30,
  },
  viewAllButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  viewAllText: {
    color: '#007BFF',
  },
  scheduleContainer: {
    marginTop: 20,
  },
  scheduleItem: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  scheduleItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scheduleItemSubtitle: {
    color: '#666',
  },
  scheduleItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  scheduleItemTime: {
    fontWeight: 'bold',
  },
  scheduleItemDay: {
    color: '#666',
  },
});

export default HomeScreen;
