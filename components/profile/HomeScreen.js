import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const CityExplorerHome = ({ navigation, route }) => {
    const [searchText, setSearchText] = useState('');
    const { userName, userToken } = route.params; // Retrieve the username passed from Login
    // Categories for exploration
    const categories = [
        { name: 'Restaurants', icon: '🍽️', screen: 'Restaurants' },
        { name: 'Events', icon: '🎉', screen: 'Events' },
        { name: 'Attractions', icon: '🎢', screen: 'Attractions' },
        { name: 'Shopping', icon: '🛍️', screen: 'Shopping' },
        { name: 'Parks', icon: '🌳', screen: 'Parks' },
        { name: 'More', icon: '🌃', screen: 'More' },
    ];

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: 'https://example.com/your-image.jpg' }} // Replace with your actual image URL
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay} />

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.header}>City Explorer</Text>
                    <Text style={styles.title}>Welcome, {userName}</Text>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for cities..."
                            placeholderTextColor="#888"
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
                                onPress={() => navigation.navigate(category.screen)}
                            >
                                <Text style={styles.categoryIcon}>{category.icon}</Text>
                                <Text style={styles.categoryName}>{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                {/* Bottom Navigation Bar */}
                <View style={styles.bottomNavContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Explorer")} style={styles.navItem}>
                        <MaterialCommunityIcons name="file-find-outline" size={30} color="black" />
                        <Text style={styles.navText}>Explore</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Wishlist", { userName, userToken })} style={styles.navItem}>
                        <Feather name="heart" size={30} color="black" />
                        <Text style={styles.navText}>Wishlist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("community", { userName, userToken })} style={styles.navItem}>
                        <FontAwesome6 name="people-group" size={30} color="black" />
                        <Text style={styles.navText}>Community</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Settings", { userName, userToken })} style={styles.navItem}>
                        <SimpleLineIcons name="settings" size={30} color="black" />
                        <Text style={styles.navText}>Settings</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        paddingBottom: 80, // Extra space for the bottom navigation
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 18,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
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
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    categoryIcon: {
        fontSize: 30,
        marginBottom: 5,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: '#333',
    },
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: 'black',
        marginTop: 4,
    },
});

export default CityExplorerHome;