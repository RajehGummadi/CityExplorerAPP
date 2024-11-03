import { React, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, ScrollView, SafeAreaView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Profile = ({ navigation }) => {

    const [value, setValue] = useState('');
    const handleChange = (text) => {

        if (!isNaN(text)) {
            setValue(text);
        }
    }

    const demo = () => {
        debugger;
        navigation.navigate("Login")
    }

    const userDemo = () => {
        debugger;
        alert('Profile updated successfully..!');
        navigation.navigate("Wishlist")
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
                        <TextInput id="firstName" placeholder="Enter your First Name" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                        <MaterialIcons name="drive-file-rename-outline" size={24} color="white" />
                        <TextInput id="lastName" placeholder="Enter your Last Name" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                        <MaterialIcons name="alternate-email" size={24} color="white" />
                        <TextInput id="email" placeholder="Enter your Email" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                        <Feather name="phone" size={24} color="white" />
                        <TextInput id="phoneNumber" value={value} keyboardType='numeric' maxLength={10} placeholder="Enter phone number" placeholderTextColor={'gray'} onChangeText={handleChange} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                    </View>
                    <View style={{ height: 60 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 275, height: 40, position: 'static', opacity: 1 }}>
                        <Button title="Save profile" color='green' borderColor='white' onPress={userDemo} style={{ backgroundColor: 'rgba(255, 255, 255, 1)', textAlign: 'center', borderColor: 'white', borderWidth: 10, width: 40, height: 20, flexDirection: 'column', borderRadius: 25 }} >Save profile</Button>
                    </View>
                    <View style={{ widht: 200, height: 100 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: 275, height: 40, position: 'static', opacity: 1 }}>
                        <Button title="change password" color='red' borderColor='white' style={{ backgroundColor: 'rgba(255, 255, 255, 1)', textAlign: 'center', borderColor: 'white', borderWidth: 10, width: 40, height: 20, flexDirection: 'column', borderRadius: 25 }} onPress={() => navigation.navigate("ChangePassword")}>Change Password</Button>
                    </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0)', // Optional overlay color
    }
});

export default Profile;