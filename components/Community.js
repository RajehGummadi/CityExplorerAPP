import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';

const CommunityPage = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    // Fetch posts from backend on mount
    useEffect(() => {
        fetch('http://localhost:3000/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    // Handle new post submission
    const handlePostSubmit = () => {
        if (newPost) {
            const post = { content: newPost, user: { firstName: "John", lastName: "Doe", email: "johndoe@example.com" }};
            fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            })
                .then(response => response.json())
                .then(newPost => {
                    setPosts([...posts, newPost]);
                    setNewPost('');
                })
                .catch(error => console.error('Error creating post:', error));
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
                keyExtractor={(item) => item._id}
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
