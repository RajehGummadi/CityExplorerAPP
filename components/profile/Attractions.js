// screens/Attractions.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const Attractions = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Attractions</Text>
            <Text style={styles.description}>Discover popular attractions to visit!</Text>

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
                    <FontAwesome6 name="people-group" size={30} color="black" />
                    <Text style={styles.navText}>Community</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={styles.navItem}>
                    <SimpleLineIcons name="settings" size={30} color="black" />
                    <Text style={styles.navText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 20 
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold' 
    },
    description: { 
        fontSize: 16, 
        textAlign: 'center', 
        marginTop: 10 
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

export default Attractions;
