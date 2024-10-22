import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';

const CityExplorerHome = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  // Categories for exploration
  const categories = [
    { name: 'Restaurants', icon: '🍽️', screen: 'Restaurants' },
    { name: 'Hotels', icon: '🏨', screen: 'Hotels' },
    { name: 'Attractions', icon: '🎢', screen: 'Attractions' },
    { name: 'Shopping', icon: '🛍️', screen: 'Shopping' },
    { name: 'Parks', icon: '🌳', screen: 'Parks' },
    { name: 'More', icon: '🌃', screen: 'More' },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://example.com/your-image.jpg' }}  // Replace with your image URL
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.header}>City Explorer</Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for cities..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Explore Categories */}
          <Text style={styles.subHeader}>Explore Categories</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.categoryItem}
                onPress={() => navigation.navigate(category.screen)}  // Navigate to respective screen
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for readability
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryItem: {
    width: '30%',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIcon: { 
    fontSize: 30, 
    marginBottom: 10 
  },
  categoryName: { 
    fontSize: 16, 
    fontWeight: '500', 
    textAlign: 'center' 
  },
});

export default CityExplorerHome;
