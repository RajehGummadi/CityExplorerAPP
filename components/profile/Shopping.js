// screens/Shopping.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Shopping = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Shopping</Text>
            <Text style={styles.description}>Explore the best shopping spots in the city!</Text>
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

export default Shopping;