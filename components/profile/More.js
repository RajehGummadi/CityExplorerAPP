// screens/More.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const More = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>More</Text>
            <Text style={styles.description}>Explore more options and activities in the city!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
    },
});

export default More;