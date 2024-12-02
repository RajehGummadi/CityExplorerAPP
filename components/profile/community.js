import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const Community = ({ navigation, route }) => {
    const [createdGroups, setCreatedGroups] = useState([]); // Stores created groups
    const [groupName, setGname] = useState('');
    const [description, setDescription] = useState('');
    const [addUserId, setAddUserId] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [showModal, setShowModal] = useState(false); // Modal visibility for creating a new group
    const [showAddUserModal, setShowAddUserModal] = useState(false); // Modal visibility for adding a user
    const { userName, userToken } = route.params; //username and usertoken taken from route.params 

    // Fetch groups from the backend
    const fetchGroups = async () => {
        try {
            const response = await fetch('http://localhost:2024/allGroup', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                setCreatedGroups(data); // Update the groups in the state
            }
        } catch (error) {
            console.error('Error fetching groups:', error);
            alert('Failed to fetch groups. Please try again.');
        }
    };

    // Use useEffect to fetch groups on component mount
    useEffect(() => {
        fetchGroups();
    }, []);

    const createGroup = async () => {
        const initialUserId = userName;
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
                alert(data.error);
            } else {
                alert(`Group "${data.groupName}" created with description: "${data.description}".`);
                setCreatedGroups(prevGroups => [...prevGroups, data]);
            }
            setGname('');
            setDescription('');
            setShowModal(false); // Close the modal after group creation
        } catch (error) {
            console.error('Error creating group:', error);
            alert('Failed to create group. Please try again.');
        }
    };

    const addUserToGroup = async () => {
        if (!selectedGroupId || !addUserId) {
            alert('Please provide a user ID.');
            return;
        }

        try {
            const response = await fetch('http://localhost:2024/add_guser', {
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

    // const deleteGroup = async (groupId) => {
    //     try {
    //         const response = await fetch(http://localhost:2024/deleteGroup, {
    //             method: 'DELETE',
    //         });
    //         const data = await response.json();
    //         if (data.error) {
    //             alert(Error: ${data.error});
    //         } else {
    //             alert(Group "${data.groupName}" deleted.);
    //             setCreatedGroups(prevGroups => prevGroups.filter(group => group._id !== groupId));
    //         }
    //     } catch (error) {
    //         console.error('Error deleting group:', error);
    //         alert('Failed to delete group. Please try again.');
    //     }
    // };
    const deleteGroup = async (groupId) => {
        try {
            const response = await fetch('http://localhost:2024/deleteGroup', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    groupId: groupId,
                }),
            });
            const data = await response.json();
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                alert(`Group "${data.groupName}" deleted.`);
                setCreatedGroups(prevGroups => prevGroups.filter(group => group._id !== groupId));
            }
        } catch (error) {
            console.error('Error deleting group:', error);
            alert('Failed to delete group. Please try again.');
        }
    };

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
                <FlatList
                    data={createdGroups}
                    keyExtractor={(item) => item._id}
                    renderItem={renderGroup}
                    showsVerticalScrollIndicator={true} // Enable vertical scrollbar
                    contentContainerStyle={{ paddingBottom: 20 }} // Add padding at the bottom
                />
            )}
    
            {/* Bottom Navigation Bar */}
            <View style={styles.bottomNavContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("CityExplorerHome", { userName, userToken })} style={styles.navItem}>
                    <MaterialCommunityIcons name="file-find-outline" size={30} color="black" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Wishlist", { userName, userToken })} style={styles.navItem}>
                    <Feather name="heart" size={30} color="black" />
                    <Text style={styles.navText}>Wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("community", { userName, userToken })} style={styles.navItem}>
                    <FontAwesome6 name="people-group" size={30} color="black" />
                    <Text style={styles.navText}>Community</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Settings", { userName, userToken })} style={styles.navItem}>
                    <SimpleLineIcons name="settings" size={30} color="black" />
                    <Text style={styles.navText}>Settings</Text>
                </TouchableOpacity>
            </View>
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
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: 'black',
    },
});

export default Community;