import { React, useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, ScrollView, Alert, SafeAreaView } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const ChangePassword = ({ navigation }) => {

    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');

    const [email, setUserEmail] = useState('');
    const [otp, setUserOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [otpError, setOtpError] = useState('');
    const [confPassError, setConfPassError] = useState('');
    const [emptyFieldError, setEmptyFieldError] = useState('');

    useEffect(() => {
        if (!email) {
            setEmailError("Email is required.")
        }
        else if (email && !/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email is invalid");
        } else {
            setEmailError("");
        }

        if (otp && otp.length != 6) {
            setOtpError("Enter valid OTP");
        } else {
            setOtpError('');
        }
        if (password && password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
        } else {
            setPasswordError('');
        }

        if (password && confirmPassword && !(password === confirmPassword)) {
            setConfPassError("Password mismatch found");
        } else {
            setConfPassError("");
        }

        if (show && (!otp || !password || !confirmPassword)) {
            setEmptyFieldError("Please fill out all the fields.");
        } else {
            setEmptyFieldError('');
        }
    }, [password, email, otp, confirmPassword]);

    const handleChange = (text) => {

        if (!isNaN(text)) {
            setValue(text);
        }
    }
    // const [text, setText] = useState('');
    // const getOTP = () => {
    //     setText('OTP sent to your Email/Phone');
    // }


    const getOTP = async () => {
        try {
            const response = await fetch('http://localhost:2024/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email }),
            });

            await response.json();
            if (response.ok) {
                setMsg(`OTP sent to your Email. Please use it to reset your password`);
                setShow(true);
            } else {
                setMsg(`User/Email not found!`);
                console.error("Invalid user");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
            console.error(error);
        }
    };

    const resetPassword = async () => {
        try {
            const response = await fetch('http://localhost:2024/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ otp, password, confirmPassword }),
            });

            await response.json();
            if (response.ok) {
                setMsg(`Password updated successfully`);
                setTimeout(() => {
                    navigation.navigate("Login");
                }, 1000);
            } else {
                setMsg(`Password reset failed!`);
                console.error("Invalid user");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
            console.error(error);
        }
    };

    return (
        <ScrollView scrollEnabled={false}>
            <ImageBackground source={require('./wallpaper.jpg')} style={styles.background}
                resizeMode="cover">
                <View style={{ width: 10, height: 10 }}></View>

                <View style={{ height: 620, alignItems: 'center', backgroundColor: "black", borderRadius: 12, borderWidth: 20, opacity: 0.85, }}>

                    <Text style={{ fontSize: 16, color: 'white', minHeight: 60 }}>Enter your Email to get OTP</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                        <MaterialIcons name="alternate-email" size={24} color="white" />
                        <TextInput id="email" value={email} onChangeText={setUserEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="Enter your Email" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                    </View>
                    {emailError && <Text style={[styles.textOutline]}>{emailError}</Text>}
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                        <Feather name="phone" size={24} color="white" />
                        <TextInput id="phoneNumber" value={value} keyboardType='numeric' maxLength={10} placeholder="Enter phone number" placeholderTextColor={'gray'} onChangeText={handleChange} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                    </View> */}
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', width: 125, height: 35, position: 'static', opacity: 1 }}>
                        <Button title="get OTP" color='blue' borderColor='white' style={{ backgroundColor: 'rgba(255, 255, 255, 1)', textAlign: 'center', borderColor: 'white', borderWidth: 10, width: 40, height: 16, flexDirection: 'column', borderRadius: 25 }} onPress={getOTP} disabled={!!emailError}>Get OTP</Button>
                    </View>
                    <View style={{ width: 150, height: 40, alignItems: 'center' }}></View>
                    {msg ? <Text style={[styles.textOutline]}>{msg}</Text> : null}

                    {
                        show ? <>
                            <View style={{ width: 10, height: 40 }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                                <MaterialIcons name="password" size={24} color="white" />
                                <TextInput id="otp" value={otp} onChangeText={setUserOtp} onChange={(e) => setUserOtp(e.target.value)} placeholder="Enter the OTP" placeholderTextColor={'gray'} secureTextEntry keyboardType='numeric' maxLength={6} style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                            </View>
                            {otpError && <Text style={[styles.textOutline]}>{otpError}</Text>}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                                <MaterialIcons name="password" size={24} color="white" />
                                <TextInput id="password" value={password} onChangeText={setPassword} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your new password" placeholderTextColor={'gray'} secureTextEntry style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                            </View>
                            {passwordError && <Text style={[styles.textOutline]}>{passwordError}</Text>}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 50 }}>
                                <MaterialIcons name="password" size={24} color="white" />
                                <TextInput id="confirmPassword" value={confirmPassword} onChangeText={setconfirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} placeholder="Re-Enter your password" placeholderTextColor={'gray'} secureTextEntry style={{ alignItems: 'flex-end', height: 30, width: 150, borderColor: 'white', borderRadius: 5, borderWidth: 1, color: 'white' }}></TextInput>
                            </View>
                            {confPassError && <Text style={[styles.textOutline]}>{confPassError}</Text>}
                            <View style={{ height: 40 }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 275, height: 35, position: 'static', opacity: 1 }}>
                                <Button title="Change Password" color='orange' borderColor='white' onPress={resetPassword} style={{ backgroundColor: 'rgba(255, 255, 255, 1)', textAlign: 'center', borderColor: 'white', borderWidth: 10, width: 40, height: 16, flexDirection: 'column', borderRadius: 25 }} >Change Password</Button>
                            </View>
                        </> : null
                    }
                </View>
            </ImageBackground>
        </ScrollView>
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
    }, textOutline: {
        color: '#fc6001', // Outline color
        textShadowColor: 'black',  // Shadow color for outline effect
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
        fontSize: 14,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    }
});

export default ChangePassword;