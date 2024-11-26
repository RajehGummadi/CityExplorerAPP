import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
 //added route and navigate to community page
const Community = ( {navigation,route }) => {
    const [createdGroups, setCreatedGroups] = useState([]);  // Stores created groups
    const [groupName, setGname] = useState('');
    const [description, setDescription] = useState('');
    const [addUserId, setAddUserId] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [showModal, setShowModal] = useState(false); // Modal visibility for creating a new group
    const [showAddUserModal, setShowAddUserModal] = useState(false); // Modal visibility for adding a user
    const { userName, userToken } = route.params; //username and usertoken taken from route.params 

    // Create a new group and add it to createdGroups array
    const createGroup = async () => {
       //value of the userName(logined user) is set to initialUserId
        const initialUserId=userName
        if (!groupName || !description || !initialUserId) {
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
                    groupName,
                    description,
                    users: initialUserId,
                }),
            });
            const data = await response.json();
            if (data.error) {
                alert(`${data.error}`);  // Corrected template literal syntax
            } else {
                alert(`Group "${data.groupName}" created with description.`);  // Corrected template literal syntax
                setCreatedGroups(prevGroups => [...prevGroups, data]);  // Add the new group to createdGroups
            }
            
            setGname('');
            setDescription('');
            setShowModal(false); // Close the modal after group creation
        } catch (error) {
            console.error('Error creating group:', error);
            alert('Failed to create group. Please try again.');
        }
    };

    // Add a user to an existing group
    const addUserToGroup = async () => {
        if (!selectedGroupId || !addUserId) {
            alert('Please provide a user ID.');
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
            alert(`User ${addUserId} added to group: ${data.groupName}`);

            setAddUserId('');
            setShowAddUserModal(false); // Close the add user modal
        } catch (error) {
            console.error('Error adding user to group:', error);
            alert('Failed to add user. Please try again.');
        }
    };

    // Delete an existing group
    const deleteGroup = async (groupId) => {
        try {
            const response = await fetch(`http://localhost:2024/group/${groupId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.error) {
                alert(`${data.error}`);
            } else {
                alert(`Group "${data.groupName}" deleted.`);
                setCreatedGroups(prevGroups => prevGroups.filter(group => group._id !== groupId));
            }
        } catch (error) {
            console.error('Error deleting group:', error);
            alert('Failed to delete group. Please try again.');
        }
    };
    

    // Render each group item
    const renderGroup = ({ item }) => (
        <View style={styles.groupContainer}>
            <View style={styles.groupInfo}>
                <FontAwesome name="group" size={30} color="#555" style={styles.icon} />
                <View>
                    <Text style={styles.groupName}>{item.groupName}</Text>
                    <Text style={styles.groupDescription}>{item.description}</Text>
                </View>
            </View>
            <View style={styles.groupActions}>
                <TouchableOpacity onPress={() => { setSelectedGroupId(item._id); setShowAddUserModal(true); }}>
                    <FontAwesome name="user-plus" size={20} color="green" style={styles.iconButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteGroup(item._id)}>
                    <FontAwesome name="trash" size={20} color="red" style={styles.iconButton} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Communities</Text>

            {/* New Community Section */}
            <TouchableOpacity style={styles.newCommunityContainer} onPress={() => setShowModal(true)}>
                <FontAwesome name="plus" size={20} color="#007bff" />
                <Text style={styles.newCommunityText}>New Community</Text>
            </TouchableOpacity>

            {/* Modal for creating a new group */}
            <Modal visible={showModal} animationType="slide" onRequestClose={() => setShowModal(false)}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>Create a New Group</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Group Name"
                        value={groupName}
                        onChangeText={setGname}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Group Description"
                        value={description}
                        onChangeText={setDescription}
                    />
                   
                    <Button title="Create Group" onPress={createGroup} />
                    <Button title="Cancel" onPress={() => setShowModal(false)} color="red" />
                </View>
            </Modal>

            {/* Modal for adding a user to a group */}
            <Modal visible={showAddUserModal} animationType="slide" onRequestClose={() => setShowAddUserModal(false)}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>Add User to Group</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="User ID"
                        value={addUserId}
                        onChangeText={setAddUserId}
                    />
                    <Button title="Add User" onPress={addUserToGroup} />
                    <Button title="Cancel" onPress={() => setShowAddUserModal(false)} color="red" />
                </View>
            </Modal>

            {/* Created Groups Section */}
            {createdGroups.length > 0 && (
                <View>
                    <Text style={styles.header}>Available Groups</Text>
                    <FlatList
                        data={createdGroups}
                        keyExtractor={(item) => item._id}
                        renderItem={renderGroup}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    newCommunityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    newCommunityText: {
        color: '#007bff',
        fontSize: 16,
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 20,
    },
    modalHeader: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    list: {
        paddingBottom: 100,
    },
    groupContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        elevation: 2,
    },
    groupInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupActions: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 15,
    },
    iconButton: {
        marginHorizontal: 5,
    },
    groupName: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    groupDescription: {
        color: '#555',
        fontSize: 14,
    },
});

export default Community;