import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Community = () => {
    const [groups, setGroups] = useState([]);
    const [gname, setGname] = useState('');
    const [description, setDescription] = useState(''); // New state for description
    const [initialUserId, setInitialUserId] = useState('');
    const [addUserId, setAddUserId] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState('');

    useEffect(() => {
        fetchGroups();
    }, []);

    // Fetch all groups from the backend
    const fetchGroups = async () => {
        try {
            const response = await fetch('http://localhost:2024/addGroup', {
                method: 'GET',
            });
            const data = await response.json();
            setGroups(data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    // Create a new group with an initial member and description
    const createGroup = async () => {
        if (!gname || !description || !initialUserId) {
            alert('Please enter a group name, description, and an initial user ID.');
            return;
        }

        try {
            const response = await fetch('http://localhost:2024/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gname,
                    description, // Include description in the request
                    users: initialUserId,
                }),
            });
            const data = await response.json();
            if (data.error) {
                alert(`${data.error}`);
            } else {
                alert(`Group "${data.gname}" created with description.`);
            }
            
            fetchGroups(); // Refresh the group list
            setGname('');
            setDescription('');
            setInitialUserId('');
        } catch (error) {
            console.error('Error creating group:', error);
            alert('Failed to create group. Please try again.');
        }
    };

    // Add a user to an existing group
    const addUserToGroup = async () => {
        if (!selectedGroupId || !addUserId) {
            alert('Please select a group and provide a user ID.');
            return;
        }

        try {
            const response = await fetch('http://localhost:2024/addGroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    groupId: selectedGroupId,
                    userId: addUserId,
                }),
            });
            const data = await response.json();
            alert(`User ${addUserId} added to group: ${data.gname}`);
            fetchGroups(); // Refresh the group list
            setAddUserId('');
        } catch (error) {
            console.error('Error adding user to group:', error);
            alert('Failed to add user. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create a New Group</Text>
            <TextInput
                style={styles.input}
                placeholder="Group Name"
                value={gname}
                onChangeText={setGname}
            />
            <TextInput
                style={styles.input}
                placeholder="Group Description"
                value={description} // Input for description
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Initial User ID"
                value={initialUserId}
                onChangeText={setInitialUserId}
            />
            <Button title="Create Group" onPress={createGroup} />

            <Text style={styles.header}>Available Groups</Text>
            <FlatList
                data={groups}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.group} onPress={() => setSelectedGroupId(item._id)}>
                        <Text style={styles.groupText}>{item.gname}</Text>
                        <Text style={styles.groupDescription}>{item.description}</Text> {/* Display description */}
                    </TouchableOpacity>
                )}
            />

            <Text style={styles.header}>Add User to Selected Group</Text>
            <TextInput
                style={styles.input}
                placeholder="User ID"
                value={addUserId}
                onChangeText={setAddUserId}
            />
            <Button title="Add User to Group" onPress={addUserToGroup} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    group: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#e0f7fa',
        width: '100%',
        alignItems: 'center',
        borderRadius: 8,
    },
    groupText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    groupDescription: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
});

export default Community;
