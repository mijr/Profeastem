import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React from 'react';

const resourcesData = [
  {
    id: '1',
    title: 'Understanding React Native',
    description: 'A comprehensive guide to getting started with React Native.',
    link: 'https://reactnative.dev/docs/getting-started',
  },
  {
    id: '2',
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript, the language behind most modern web applications.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
  },
  {
    id: '3',
    title: 'Video: React Native Tutorial',
    description: 'Watch a beginner-friendly tutorial on React Native development.',
    link: 'https://www.youtube.com/watch?v=0-S5c8Z8P0I',
  },
  {
    id: '4',
    title: 'Recommended Reading: Clean Code',
    description: 'A book that emphasizes best practices in code writing.',
    link: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0136083239',
  },
];

const Resources = () => {
  // Render each resource item
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.resourceItem} onPress={() => Linking.openURL(item.link)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
             <View style={styles.header}>
              <Text style={styles.title}>Resources</Text>
            </View>
      {/* <Text style={styles.header}>Resources</Text> */}
      <FlatList
        data={resourcesData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

// Styles for Resources Component
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
  resourceItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    marginTop:12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
  },
});

export default Resources;
