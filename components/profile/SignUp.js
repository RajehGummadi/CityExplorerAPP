import { React, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, ScrollView, SafeAreaView } from "react-native";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const SignUp = ({ navigation }) => {

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
        alert('User created successfully..! Login now!');
        navigation.navigate("Login")
    }

    return (
        <ScrollView scrollEnabled={false}>
            <ImageBackground source={require('../wallpaper.jpg')} style={styles.background}
                resizeMode="cover">
                <View style={styles.overlay}>

                    <View style={{ alignItems: 'center', backgroundColor: "black", borderRadius: 12, borderWidth: 20, opacity: 0.85 }}>

                        <Text style={{ fontSize: 18, color: 'white', minHeight: 60, textDecorationLine: 'underline' }}>Sign-Up and create your profile</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                            <MaterialIcons name="drive-file-rename-outline" size={24} color="white" />
                            <TextInput id="firstName" placeholder="Enter your First Name" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                            <MaterialIcons name="drive-file-rename-outline" size={24} color="white" />
                            <TextInput id="lastName" placeholder="Enter your Last Name" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                            <Feather name="user-plus" size={24} color="white" />
                            <TextInput id="userName" placeholder="Enter your User Name" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                            <MaterialIcons name="alternate-email" size={24} color="white" />
                            <TextInput id="email" placeholder="Enter your Email" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                            <Feather name="phone" size={24} color="white" />
                            <TextInput id="phoneNumber" value={value} keyboardType='numeric' maxLength={10} placeholder="Enter phone number" placeholderTextColor={'gray'} onChangeText={handleChange} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                            <MaterialIcons name="password" size={24} color="white" />
                            <TextInput id="password" placeholder="Enter your Password" placeholderTextColor={'gray'} secureTextEntry style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                            <MaterialIcons name="password" size={24} color="white" />
                            <TextInput id="confirmPassword" placeholder="Re-Enter your password" placeholderTextColor={'gray'} secureTextEntry style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 275, height: 40, position: 'static', opacity: 1 }}>
                            <Button title="Sign Up" color='green' borderColor='white' onPress={userDemo} style={{ backgroundColor: 'rgba(255, 255, 255, 1)', textAlign: 'center', borderColor: 'white', borderWidth: 10, width: 40, height: 20, flexDirection: 'column', borderRadius: 25 }} >Sign Up</Button>
                        </View>
                        <View style={{ width: 400, height: 60, alignItems: 'flex-end', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, color: 'white', height: 25 }} >                    Already have an account?  </Text>
                            <Button title="Login" color='orange' style={{ textAlign: 'center', borderColor: 'white', borderWidth: 2, width: 60, height: 30, flexDirection: 'column' }} onPress={demo}>Login</Button>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: 'flex-end',
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}>
                        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <MaterialCommunityIcons name="file-find-outline" size={30} color="gray" />
                            <Feather name="heart" size={30} color="gray" />
                            <FontAwesome6 name="people-group" size={30} color="gray" />
                            <SimpleLineIcons name="settings" size={30} color="gray" />
                        </View>
                        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Text color="gray">Explore</Text>
                            <Text color="gray">Wishlist</Text>
                            <Text color="gray">People</Text>
                            <Text color="gray">Settings</Text>
                        </View>
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

export default SignUp;