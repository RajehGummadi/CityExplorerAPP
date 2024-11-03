import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';

const CommunityPage = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    const handlePostSubmit = () => {
        if (newPost) {
            setPosts([...posts, { id: Date.now().toString(), content: newPost }]);
            setNewPost('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Community</Text>

            <TextInput
                style={styles.input}
                placeholder="Share your experience..."
                value={newPost}
                onChangeText={setNewPost}
            />
            <Button title="Post" onPress={handlePostSubmit} />

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <Text>{item.content}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    post: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
});

export default CommunityPage;
