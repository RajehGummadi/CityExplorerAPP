// screens/Parks.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Parks = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Parks</Text>
            <Text style={styles.description}>Find beautiful parks to relax and unwind!</Text>
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

export default Parks;