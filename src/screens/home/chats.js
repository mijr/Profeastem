import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { GlobalStyles } from "../../../constant/Styles";  // Make sure this path is correct
// Sample user images (Make sure to replace with actual image paths)
const USERS = [
  { id: '1', name: 'John Doe', image: 'https://picsum.photos/200' },
  { id: '2', name: 'Jane Smith', image: 'https://picsum.photos/200' },
  { id: '3', name: 'Sarah Connor', image: 'https://picsum.photos/200' },
  { id: '4', name: 'Michael Johnson', image: 'https://picsum.photos/200' },
];

const Chats = ({ navigation }) => {
  // Sample chat data
  const chatData = [
    { id: '1', userId: '1', lastMessage: 'Hey, are you coming to the party?', time: '2 mins ago' },
    { id: '2', userId: '2', lastMessage: 'Let’s meet tomorrow!', time: '5 mins ago' },
    { id: '3', userId: '3', lastMessage: 'Can you send me the report?', time: '10 mins ago' },
    { id: '4', userId: '4', lastMessage: 'I will call you later.', time: '15 mins ago' },
  ];

  const renderItem = ({ item }) => {
    const user = USERS.find(user => user.id === item.userId); // Find user data

    return (
      <TouchableOpacity 
        style={styles.chatItem} 
        onPress={() => navigation.navigate('ChatDetail', { user: item })}
      >
        <Image
          source={{ uri: user.image }} // User image
          style={styles.userImage}
        />
        <View style={styles.chatContent}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{item.time}</Text>
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>{Math.round(Math.random() * 9)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
      </View>
      <FlatList
        data={chatData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

// Styles for Chats Component
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
    fontWeight: "bold",
    textAlign: "center",
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  chatContent: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Change to GlobalStyles if needed
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  timeContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  notificationBadge: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.blue,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: "white",
  },
});

export default Chats;
