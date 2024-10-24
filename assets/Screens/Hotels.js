// screens/Hotels.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Hotels = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotels</Text>
      <Text style={styles.description}>Find the best hotels for your stay!</Text>
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

export default Hotels;
