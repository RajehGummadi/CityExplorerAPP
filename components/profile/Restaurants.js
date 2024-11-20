import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { MaterialCommunityIcons, Feather, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';  // Import icons

const restaurants = [
    {
        name: "The Agave Mexican Restaurant",
        address: "George Street North",
        rating: 4.7,
        url: "https://agavebyimperial.com/"
    },
    {
        name: "Pizza Palace",
        address: "456 Cheesy Ln, Crustville",
        rating: 4.5,
        url: "https://www.google.com"
    },
    {
        name: "Burger Barn",
        address: "789 Grill Rd, Meatland",
        rating: 4.2,
        url: "https://www.google.com"
    },
    {
        name: "Vegan Vibes",
        address: "321 Green Ave, Plantopia",
        rating: 4.8,
        url: "https://www.google.com"
    },
    {
        name: "Sushi Sensation",
        address: "654 Ocean Dr, Fishertown",
        rating: 4.6,
        url: "https://www.google.com"
    }
];

const Restaurants = ({ navigation }) => {

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

            {/* Bottom Navigation Bar */}
            <View style={styles.bottomNavContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Explore")} style={styles.navItem}>
                    <MaterialCommunityIcons name="file-find-outline" size={30} color="black" />
                    <Text style={styles.navText}>Explore</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Wishlist")} style={styles.navItem}>
                    <Feather name="heart" size={30} color="black" />
                    <Text style={styles.navText}>Wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Community")} style={styles.navItem}>
                    <FontAwesome5 name="users" size={30} color="black" />
                    <Text style={styles.navText}>Community</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={styles.navItem}>
                    <SimpleLineIcons name="settings" size={30} color="black" />
                    <Text style={styles.navText}>Settings</Text>
                </TouchableOpacity>
            </View>
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
        textAlign: 'center',
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
        width: '100%',
        alignItems: 'center',  // Centering the content
        elevation: 2,  // Slight shadow effect for better UX
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        marginVertical: 5,
    },
    listContainer: {
        paddingBottom: 20,  // To ensure the content isn't too close to the bottom
    },
    bottomNavContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,  // Set a fixed height to make it consistent
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: 'black',
    }
});

export default Restaurants;
