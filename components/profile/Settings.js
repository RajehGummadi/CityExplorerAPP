import { React, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, ScrollView, SafeAreaView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const Settings = ({ navigation }) => {
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
                            <Text style={{ fontSize: 16, color: 'white', width: 250, height: 15, padding: 10 }}>Language</Text>
                            <SimpleLineIcons name="arrow-right" size={16} color="white" height={35} style={{ margin: 'auto' }} />
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', height: 35 }}>
                            <Text style={{ fontSize: 16, color: 'white', width: 250, height: 15, padding: 10 }}>Appearance</Text>
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
                            <Text style={{ fontSize: 16, color: 'white', width: 250, height: 15, padding: 10 }}>Help center</Text>
                            <SimpleLineIcons name="arrow-right" size={16} color="white" height={35} style={{ margin: 'auto' }} />
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
                    <View style={{ width: 250, height: 105 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: 275, height: 40, position: 'static', opacity: 1 }}>
                        <Button title="Logout" color='red' borderColor='white' onPress={() => navigation.navigate("Login")} style={{ backgroundColor: 'rgba(255, 255, 255, 1)', textAlign: 'center', borderColor: 'white', borderWidth: 10, width: 40, height: 20, flexDirection: 'column', borderRadius: 25 }} >Logout</Button>
                    </View>
                </View>
                
                {/* Bottom Navigation Bar */}
                <View style={styles.bottomNavContainer}>
                    <View style={styles.navItem}>
                        <MaterialCommunityIcons name="file-find-outline" size={30} color="black" />
                        <Text style={styles.navText}>Explore</Text>
                    </View>
                    <View style={styles.navItem}>
                        <Feather name="heart" size={30} color="black" onPress={() => navigation.navigate("Wishlist")} />
                        <Text style={styles.navText}>Wishlist</Text>
                    </View>
                    <View style={styles.navItem}>
                        <FontAwesome6 name="people-group" size={30} color="black" />
                        <Text style={styles.navText}>Community</Text>
                    </View>
                    <View style={styles.navItem}>
                        <SimpleLineIcons name="settings" size={30} color="black" />
                        <Text style={styles.navText}>Settings</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    bottomNavContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
    },
    navText: {
        fontSize: 12,
        color: 'black',
        marginTop: 2,
    },
});

export default Settings;