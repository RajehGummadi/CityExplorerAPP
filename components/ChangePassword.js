import { React, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, ScrollView, SafeAreaView } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const ChangePassword = ({ navigation }) => {

    const [value, setValue] = useState('');
    const handleChange = (text) => {

        if (!isNaN(text)) {
            setValue(text);
        }
    }
    // const [text, setText] = useState('');
    // const getOTP = () => {
    //     setText('OTP sent to your Email/Phone');
    // }

    const [show, setShow] = useState(false);



    return (
        <ScrollView scrollEnabled={false}>
            <ImageBackground source={require('./wallpaper.jpg')} style={styles.background}
                resizeMode="cover">
                <View style={{ width: 10, height: 10 }}></View>

                <View style={{ height: 620, alignItems: 'center', backgroundColor: "black", borderRadius: 12, borderWidth: 20, opacity: 0.85, }}>

                    <Text style={{ fontSize: 16, color: 'white', minHeight: 60 }}>Enter your Email or Phone number to get OTP</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                        <MaterialIcons name="alternate-email" size={24} color="white" />
                        <TextInput id="email" placeholder="Enter your Email" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                        <Feather name="phone" size={24} color="white" />
                        <TextInput id="phoneNumber" value={value} keyboardType='numeric' maxLength={10} placeholder="Enter phone number" placeholderTextColor={'gray'} onChangeText={handleChange} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 275, height: 35, position: 'static', opacity: 1 }}>
                        <Button title="get OTP" color='blue' borderColor='white' style={{ backgroundColor: 'rgba(255, 255, 255, 1)', textAlign: 'center', borderColor: 'white', borderWidth: 10, width: 40, height: 16, flexDirection: 'column', borderRadius: 25 }} onPress={() => setShow(true)}>Get OTP</Button>
                    </View>
                    {
                        show ? <OtpSection /> : null
                    }
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const OtpSection = () => {
    const changePass = () => {
        alert('Password changed successfully..! Login now!');
        navigation.navigate("Login")
    }
    return (
        <>
            <View style={{ width: 10, height: 40 }}></View>
            <Text style={{ color: 'white' }}>'OTP sent to your Email/Phone'</Text>
            <View style={{ width: 10, height: 40 }}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                <MaterialIcons name="password" size={24} color="white" />
                <TextInput id="enterOtp" placeholder="Enter the OTP" placeholderTextColor={'gray'} secureTextEntry keyboardType='numeric' maxLength={6} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                <MaterialIcons name="password" size={24} color="white" />
                <TextInput id="newPassword" placeholder="Enter your new password" placeholderTextColor={'gray'} secureTextEntry style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                <MaterialIcons name="password" size={24} color="white" />
                <TextInput id="confirmPassword" placeholder="Re-Enter your password" placeholderTextColor={'gray'} secureTextEntry style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
            </View>
            <View style={{ height: 40 }}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 275, height: 35, position: 'static', opacity: 1 }}>
                <Button title="Change Password" color='orange' borderColor='white' onPress={changePass} style={{ backgroundColor: 'rgba(255, 255, 255, 1)', textAlign: 'center', borderColor: 'white', borderWidth: 10, width: 40, height: 16, flexDirection: 'column', borderRadius: 25 }} >Change Password</Button>
            </View>
        </>
    )
}

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

export default ChangePassword;