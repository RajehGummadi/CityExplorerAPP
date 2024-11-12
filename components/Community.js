import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const Community = () => {
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [initialUserId, setInitialUserId] = useState('');
    const [addUserId, setAddUserId] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    useEffect(() => {
        fetchGroups();
    }, []);

    // Fetch all groups from the backend
    const fetchGroups = async () => {
        try {
            const response = await axios.get('http://localhost:5000/groups');
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    // Create a new group with an initial member
    const createGroup = async () => {
        if (!groupName || !initialUserId) {
            alert("Please enter both a group name and an initial user ID.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/groups', {
                gname: groupName,
                users: [initialUserId]  // Add initial member to the group
            });
            alert(`Group ${response.data.gname} created with initial user.`);
            fetchGroups();  // Refresh the group list
            setGroupName('');
            setInitialUserId('');
        } catch (error) {
            console.error('Error creating group:', error);
            alert('Failed to create group. Please try again.');
        }
    };

    // Add a user to an existing group
    const addUserToGroup = async () => {
        if (!selectedGroupId || !addUserId) {
            alert("Please select a group and provide a user ID.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/groups/addUser', {
                groupId: selectedGroupId,
                userId: addUserId,
            });
            alert(`User ${addUserId} added to group: ${response.data.gname}`);
            fetchGroups();  // Refresh the group list
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
                placeholder="userid"
                value={groupName}
                onChangeText={setGroupName}
            />
            <TextInput
                style={styles.input}
                placeholder="password"
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
                    </TouchableOpacity>
                )}
            />

            <Text style={styles.header}>Add User to Selected Group</Text>
            <TextInput
                style={styles.input}
                placeholder="User name"
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
    },
});

export default Community;
