import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const eventsData = [
  { id: '1', title: 'City Festival', date: '2024-11-15' },
  { id: '2', title: 'Art Fair', date: '2024-11-20' },
  // Add more events as needed
]

const Events = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <FlatList
        data={eventsData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text>{item.title}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, marginBottom: 10 },
  eventCard: { padding: 15, marginVertical: 5, backgroundColor: '#f9f9f9', borderRadius: 5 }
})

export default Events;
