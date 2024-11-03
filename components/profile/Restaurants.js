// screens/Restaurants.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';

const restaurants = [
    {
        name: "The Agave Mexican Restaurant",
        address: "George Street North",
        rating: 4.7,
        url: "https://agavebyimperial.com/" // Updated URL for redirection to Google
    },
    {
        name: "Pizza Palace",
        address: "456 Cheesy Ln, Crustville",
        rating: 4.5,
        url: "https://www.google.com" // Updated URL for redirection to Google
    },
    {
        name: "Burger Barn",
        address: "789 Grill Rd, Meatland",
        rating: 4.2,
        url: "https://www.google.com" // Updated URL for redirection to Google
    },
    {
        name: "Vegan Vibes",
        address: "321 Green Ave, Plantopia",
        rating: 4.8,
        url: "https://www.google.com" // Updated URL for redirection to Google
    },
    {
        name: "Sushi Sensation",
        address: "654 Ocean Dr, Fishertown",
        rating: 4.6,
        url: "https://www.google.com" // Updated URL for redirection to Google
    }
];

const Restaurants = () => {

    const handlePress = (url) => {
        Linking.openURL(url);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => handlePress(item.url)}
            style={styles.itemContainer}
        >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>Address: {item.address}</Text>
            <Text style={styles.details}>Rating: {item.rating}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}></Text>
            <Text style={styles.description}>Explore the best restaurants in the city!</Text>
            <FlatList
                data={restaurants}
                keyExtractor={(item) => item.name}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    itemContainer: {
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 20,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        marginVertical: 5,
    }
});

export default Restaurants;