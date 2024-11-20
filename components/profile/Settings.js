import { React, useState } from "react";
import { StyleSheet, View, Text, Button, Modal, TouchableOpacity, TextInput, ImageBackground, ScrollView, SafeAreaView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const Settings = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <ScrollView scrollEnabled={false}>
            <ImageBackground source={require('../wallpaper.jpg')} style={styles.background}
                resizeMode="cover">
                <View style={{ width: 150, height: 5 }}></View>
                <View style={{ height: 550, alignItems: 'flex-start', backgroundColor: "black", borderRadius: 12, borderWidth: 20, opacity: 0.85, }}>
                    <Text style={{ fontSize: 18, color: 'yellow', minHeight: 30 }}>Settings</Text>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', height: 35 }}>
                            <Text style={{ fontSize: 16, color: 'white', width: 250, height: 15, padding: 10 }}>Profile</Text>
                            <SimpleLineIcons name="arrow-right" size={16} color="white" height={35} style={{ margin: 'auto' }} onPress={() => navigation.navigate("Profile")} />
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', height: 35 }}>
                            <Text style={{ fontSize: 16, color: 'white', width: 250, height: 15, padding: 10 }}>Apprearance</Text>
                            <SimpleLineIcons name="arrow-right" size={16} color="white" height={35} style={{ margin: 'auto' }} />
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', height: 35 }}>
                            <Text style={{ fontSize: 16, color: 'white', width: 250, height: 15, padding: 10 }}>Notification</Text>
                            <SimpleLineIcons name="arrow-right" size={16} color="white" height={35} style={{ margin: 'auto' }} />
                        </View>
                    </View>
                    <View style={{ width: 250, height: 15 }}></View>
                    <Text style={{ fontSize: 18, color: 'yellow', minHeight: 30 }}>Support</Text>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', height: 35 }}>
                            <Text style={{ fontSize: 16, color: 'white', width: 250, height: 15, padding: 10 }}>About us</Text>
                            <SimpleLineIcons name="arrow-right" size={16} color="white" height={35} style={{ margin: 'auto' }} />
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', height: 35 }}>
                            <Text style={{ fontSize: 16, color: 'white', width: 250, height: 15, padding: 10 }} >Help center</Text>
                            <SimpleLineIcons name="arrow-right" size={16} color="white" height={35} style={{ margin: 'auto' }} onPress={() => setModalVisible(true)} />
                        </View>
                    </View>
                    <View style={{ width: 250, height: 15 }}></View>
                    <Text style={{ fontSize: 18, color: 'yellow', minHeight: 30 }}>Feedback</Text>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', height: 35 }}>
                            <Text style={{ fontSize: 16, color: 'white', width: 250, height: 15, padding: 10 }}>Leave feedback</Text>
                            <SimpleLineIcons name="arrow-right" size={16} color="white" height={35} style={{ margin: 'auto' }} />
                        </View>
                    </View>
                    <View style={{ width: 250, height: 15 }}></View>
                    <Text style={{ fontSize: 18, color: 'yellow', minHeight: 30 }}>Legal</Text>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', height: 35 }}>
                            <Text style={{ fontSize: 16, color: 'white', width: 250, height: 15, padding: 10 }}>Terms & conditions</Text>
                            <SimpleLineIcons name="arrow-right" size={16} color="white" height={35} style={{ margin: 'auto' }} />
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', height: 35 }}>
                            <Text style={{ fontSize: 16, color: 'white', width: 250, height: 15, padding: 10 }}>Privacy policy</Text>
                            <SimpleLineIcons name="arrow-right" size={16} color="white" height={35} style={{ margin: 'auto' }} />
                        </View>
                    </View>
                    <View style={{ width: 125, height: 15 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: 185, height: 40, position: 'static', opacity: 1 }}>
                        <Button title="Logout" color='red' borderColor='white' onPress={() => navigation.navigate("Login")} style={{ backgroundColor: 'rgba(255, 255, 255, 1)', textAlign: 'center', borderColor: 'white', borderWidth: 10, width: 40, height: 20, flexDirection: 'column', borderRadius: 25 }} >Logout</Button>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)} // Handle hardware back button
                    >
                        <View style={styles.overlay}>
                            <View style={styles.popup}>
                                <Text style={styles.popupText}>Contact us for any queries or complaints at support@cityexplorer.com</Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
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
                    <View style={{ backgroundColor: 'white', height: 30, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <MaterialCommunityIcons name="file-find-outline" size={30} color="black" onPress={() => navigation.navigate("CityExplorerHome")} />
                        <Feather name="heart" size={30} color="black" onPress={() => navigation.navigate("Wishlist")} />
                        <FontAwesome6 name="people-group" size={30} color="black" />
                        <SimpleLineIcons name="settings" size={30} color="black" />
                    </View>
                    <View style={{ backgroundColor: 'white', height: 20, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Text>Explore</Text>
                        <Text>Wishlist</Text>
                        <Text>People</Text>
                        <Text>Settings</Text>
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
    closeButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Settings;