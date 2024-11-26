import { React, useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, ScrollView, ActivityIndicator, Alert, Modal, TouchableOpacity, SafeAreaView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Profile = ({ navigation, route }) => {

    const { userName, userToken } = route.params; // Retrieve the username passed from Login
    //const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [firstName, setUserfirstname] = useState('');
    const [lastName, setUserlastname] = useState('');
    const [email, setUserEmail] = useState('');
    const [phoneNumber, setUserphonenumber] = useState('');
    const [msg, setMsg] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleChange = (text) => {

        if (!isNaN(text)) {
            setUserphonenumber(text);
        }
    }

    const demo = () => {
        debugger;
        navigation.navigate("Login")
    }

    const saveProfile = async () => {
        try {
            const response = await fetch(`http://localhost:2024/profile_settings?username=${userName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                body: JSON.stringify({ firstName, lastName, email, phoneNumber }),
            });
            const result = await response.json();
            if (response.ok) {
                //Alert.alert("Success", "User created successfully!");
                setMsg(`Profile updated successfully!`);
            } else {
                Alert.alert("Error");
                console.error("Profile not updated! Please try again.");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
            console.error(error);
        }
    }

    const deleteProfile = async () => {
        try {
            setModalVisible(false);
            const response = await fetch(`http://localhost:2024/delete-account?username=${userName}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });
            const result = await response.json();
            if (response.ok) {
                //Alert.alert("Success", "User created successfully!");
                setMsg(`Profile deleted successfully!`);
                setTimeout(() => {
                    navigation.navigate("Login");
                }, 1000);
            } else {
                Alert.alert("Error");
                console.error("Profile not deleted! Please try again.");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
            console.error(error);
        }
    }

    useEffect(() => {
        console.log(userName);
        console.log(userToken);
        // Fetch user details using the username
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:2024/getprofilesettings?username=${userName}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const data = await response.json();
                //setUserDetails(data);
                setUserfirstname(data.firstName);
                setUserlastname(data.lastName);
                setUserEmail(data.email);
                setUserphonenumber(data.phoneNumber);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userName, userToken]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView scrollEnabled={false}>
            <ImageBackground source={require('../wallpaper.jpg')} style={styles.background}
                resizeMode="cover">
                <View style={{ width: 10, height: 10 }}></View>

                <View style={{ height: 620, alignItems: 'center', backgroundColor: "black", borderRadius: 12, borderWidth: 20, opacity: 0.85, }}>

                    <Text style={{ fontSize: 18, color: 'white', minHeight: 60, textDecorationLine: 'underline' }}>Update your profile</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                        <MaterialIcons name="drive-file-rename-outline" size={24} color="white" />
                        <TextInput id="firstName" value={firstName} onChangeText={setUserfirstname} onChange={(e) => setUserfirstname(e.target.value)} placeholder="Enter your First Name" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                        <MaterialIcons name="drive-file-rename-outline" size={24} color="white" />
                        <TextInput id="lastName" value={lastName} onChangeText={setUserlastname} onChange={(e) => setUserlastname(e.target.value)} placeholder="Enter your Last Name" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                        <MaterialIcons name="alternate-email" size={24} color="white" />
                        <TextInput id="email" value={email} onChangeText={setUserEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="Enter your Email" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                        <Feather name="phone" size={24} color="white" />
                        <TextInput id="phoneNumber" value={phoneNumber} onChange={(e) => setUserphonenumber(e.target.value)} keyboardType='numeric' maxLength={10} placeholder="Enter phone number" placeholderTextColor={'gray'} onChangeText={handleChange} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                    </View>
                    {msg ? <Text textAlign="center" style={[styles.successMsg]} >{msg}</Text> : null}
                    <View style={{ height: 60 }}></View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', width: 200, height: 40, position: 'static', opacity: 1 }}>
                        <Button title="Save profile" color='green' borderColor='white' onPress={saveProfile} style={{ backgroundColor: 'rgba(255, 255, 255, 1)', textAlign: 'center', borderColor: 'white', borderWidth: 10, width: 75, height: 20, flexDirection: 'column', borderRadius: 25 }} >Save profile</Button>

                        <View style={{ widht: 200, height: 10 }}></View>

                        <Button title="change password" color='blue' borderColor='white' style={{ backgroundColor: 'rgba(255, 255, 255, 1)', textAlign: 'center', borderColor: 'white', borderWidth: 10, width: 75, height: 20, flexDirection: 'column', borderRadius: 25 }} onPress={() => navigation.navigate("ChangePassword")}>Change Password</Button>

                        <View style={{ widht: 200, height: 10 }}></View>

                        <Button title="delete account" color='red' borderColor='white' style={{ backgroundColor: 'rgba(255, 255, 255, 1)', textAlign: 'center', borderColor: 'white', borderWidth: 10, width: 75, height: 20, flexDirection: 'column', borderRadius: 25 }} onPress={() => setModalVisible(true)} >Delete account</Button>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)} // Handle hardware back button
                    >
                        <View style={styles.overlay}>
                            <View style={styles.popup}>
                                <Text style={styles.popupText}>Are you sure you want to delete your profile</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.yesButton}
                                        onPress={deleteProfile}
                                    >
                                        <Text style={styles.yesButtonText}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.noButton}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={styles.noButtonText}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={{
                    justifyContent: 'flex-end',
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <MaterialCommunityIcons name="file-find-outline" size={30} color="black" />
                        <Feather name="heart" size={30} color="black" onPress={() => navigation.navigate("Wishlist")} />
                        <FontAwesome6 name="people-group" size={30} color="black" />
                        <AntDesign name="user" size={30} color="black" />
                    </View>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Text>Explore</Text>
                        <Text>Wishlist</Text>
                        <Text>People</Text>
                        <Text>Profile</Text>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    );
};



const styles = StyleSheet.create({

    backgroundImage: {
        resizeMode: 'repeat',
        justifyContent: 'center',
        backgroundColor: 'blue',
        height: 4000,
        width: 2000
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5, // Adds shadow for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // Adds shadow for iOS
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    popupText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%'
    },
    closeButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    noButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    yesButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    noButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    yesButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    successMsg: {
        color: 'yellow', // Outline color
        textShadowColor: 'black',  // Shadow color for outline effect
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
        fontSize: 14,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    label: { fontSize: 18, marginBottom: 10 },
    errorText: { fontSize: 18, color: 'red', textAlign: 'center' },
});

export default Profile;