import { React, useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Alert, TextInput, ImageBackground, ScrollView, SafeAreaView } from "react-native";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const SignUp = ({ navigation }) => {

    const [firstName, setUserfirstname] = useState('');
    const [lastName, setUserlastname] = useState('');
    const [email, setUserEmail] = useState('');
    const [phoneNumber, setUserphonenumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [msg, setMsg] = useState('');

    //Form Validations
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [confPassError, setConfPassError] = useState('');
    const [emptyFieldError, setEmptyFieldError] = useState('');

    useEffect(() => {
        if (!firstName.trim() || !lastName.trim() || !username.trim() || !password.trim() || !email.trim() || !phoneNumber.trim() || !confirmPassword.trim()) {
            setEmptyFieldError("Please fill out all the fields to Sign-up.");
        } else {
            setEmptyFieldError("");
        }
        if (username && username.length < 5) {
            setUsernameError("Username must be at least 5 characters long");
        } else {
            setUsernameError('');
        }

        if (password && password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
        } else {
            setPasswordError('');
        }

        if (email && !/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email is invalid");
        } else {
            setEmailError("");
        }

        if (password && confirmPassword && !(password === confirmPassword)) {
            setConfPassError("Password mismatch found");
        } else {
            setConfPassError("");
        }
    }, [firstName, lastName, username, password, email, phoneNumber, confirmPassword]);

    const handleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:2024/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, phoneNumber, username, password }),
            });
            if (!usernameError) {
                console.log("Form submitted with:", username);
            }
            if (!passwordError) {
                console.log("Form submitted with:", password);
            }
            const result = await response.json();
            if (response.ok) {
                //Alert.alert("Success", "User created successfully!");
                setMsg(`User created successfully! Please Login now.`);
                setTimeout(() => {
                    navigation.navigate("Login");
                }, 3000);


            } else {
                Alert.alert("Error");
                console.error("User not created! Please try again.");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
            console.error(error);
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

    const handleChange = (text) => {

        if (!isNaN(text)) {
            setUserphonenumber(text);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <ImageBackground source={require('../wallpaper.jpg')} style={styles.background}
                resizeMode="cover">
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <View style={{ alignItems: 'center' }}>

                            <Text style={{
                                fontSize: 18, color: 'white', height: 30, textDecorationLine: 'underline', fontWeight: 'bold', textShadowOffset: { width: -1, height: 1 },
                                textShadowRadius: 1
                            }}>Sign-Up and create your profile</Text>

                            {emptyFieldError && <Text style={[styles.textOutline]}>{emptyFieldError}</Text>}
                            <View style={{ height: 20 }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 40 }}>
                                <View style={{ width: 40 }}><MaterialIcons name="drive-file-rename-outline" size={30} color="white" /></View>
                                <TextInput id="firstName" value={firstName} onChangeText={setUserfirstname} onChange={(e) => setUserfirstname(e.target.value)} placeholder="Enter your First Name" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 175, borderColor: 'black', borderRadius: 5, borderWidth: 2, color: 'black', backgroundColor: 'white' }}></TextInput>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 40 }}>
                                <View style={{ width: 40 }}><MaterialIcons name="drive-file-rename-outline" size={30} color="white" /></View>
                                <TextInput id="lastName" value={lastName} onChangeText={setUserlastname} onChange={(e) => setUserlastname(e.target.value)} placeholder="Enter your Last Name" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 175, borderColor: 'black', borderRadius: 5, borderWidth: 2, color: 'black', backgroundColor: 'white' }}></TextInput>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 40 }}>
                                <View style={{ width: 40 }}><Feather name="user-plus" size={30} color="white" /></View>
                                <TextInput id="username" value={username}
                                    onChangeText={setUsername} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your User Name" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 175, borderColor: 'black', borderRadius: 5, borderWidth: 2, color: 'black', backgroundColor: 'white' }}></TextInput>
                            </View>
                            {usernameError && <Text style={[styles.textOutline]}>{usernameError}</Text>}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 40 }}>
                                <View style={{ width: 40 }}><MaterialIcons name="alternate-email" size={30} color="white" /></View>
                                <TextInput id="email" value={email} onChangeText={setUserEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="Enter your Email" placeholderTextColor={'gray'} style={{ alignItems: 'flex-end', height: 30, width: 175, borderColor: 'black', borderRadius: 5, borderWidth: 2, color: 'black', backgroundColor: 'white' }}></TextInput>
                            </View>
                            {emailError && <Text style={[styles.textOutline]}>{emailError}</Text>}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 40 }}>
                                <View style={{ width: 40 }}><Feather name="phone" size={30} color="white" /></View>
                                <TextInput id="phoneNumber" value={phoneNumber} keyboardType='numeric' maxLength={10} placeholder="Enter phone number" placeholderTextColor={'gray'} onChangeText={handleChange} style={{ alignItems: 'flex-end', height: 30, width: 175, borderColor: 'black', borderRadius: 5, borderWidth: 2, color: 'black', backgroundColor: 'white' }}></TextInput>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 40 }}>
                                <View style={{ width: 40 }}><MaterialIcons name="password" size={30} color="white" /></View>
                                <TextInput id="password" value={password} onChangeText={setPassword} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" placeholderTextColor={'gray'} secureTextEntry style={{ alignItems: 'flex-end', height: 30, width: 175, borderColor: 'black', borderRadius: 5, borderWidth: 2, color: 'black', backgroundColor: 'white' }}></TextInput>
                            </View>
                            {passwordError && <Text style={[styles.textOutline]}>{passwordError}</Text>}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, height: 40 }}>
                                <View style={{ width: 40 }}><MaterialIcons name="password" size={30} color="white" /></View>
                                <TextInput id="confirmPassword" value={confirmPassword} onChangeText={setconfirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} placeholder="Re-Enter your password" placeholderTextColor={'gray'} secureTextEntry style={{ alignItems: 'flex-end', height: 30, width: 175, borderColor: 'black', borderRadius: 5, borderWidth: 2, color: 'black', backgroundColor: 'white' }}></TextInput>
                            </View>
                            {confPassError && <Text style={[styles.textOutline]}>{confPassError}</Text>}
                            <View style={{ flexDirection: 'column', justifyContent: 'space-around', width: 100, height: 75, position: 'static', opacity: 1 }}>
                                <Button title="Sign Up" color='green' borderColor='black' onPress={handleSignUp}/*onPress={userDemo}*/ disabled={!!emptyFieldError || !!usernameError || !!passwordError || !!emailError || !!confPassError} style={{ backgroundColor: 'rgba(255, 255, 255, 1)', textAlign: 'center', borderColor: 'black', borderWidth: 10, width: 60, height: 20, borderRadius: 25 }} >Sign Up</Button>
                            </View>
                            {msg ? <Text textAlign="center" style={[styles.successMsg]} >{msg}</Text> : null}
                            {/* <View width="250" height="40"><Text color="white" fontSize="12" style={{ opacity: 1 }}>{msg}</Text></View> */}
                            <View style={{ width: 400, height: 60, alignItems: 'flex-end', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, color: 'white', height: 25 }} >                    Already have an account?  </Text>
                                <Button title="Login" style={styles.loginButton} onPress={demo}>Login</Button>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjusted for better readability
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20, // Padding added for better spacing
    },
    textOutline: {
        color: '#fc6001', // Outline color
        textShadowColor: 'black',  // Shadow color for outline effect
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
        fontSize: 14,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
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
    inputContainer: {
        width: '100%',
        marginBottom: 5,
        padding: 50
    },
    label: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
    },
    input: {
        height: 45,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        color: 'white',
        backgroundColor: '#444', // Darker input background
    },
    loginButton: {
        backgroundColor: 'teal',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 15,
        width: '100%', // Full width for button
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    container: {
        width: '90%', // Width responsive to screen size
        maxWidth: 400, // Max width for larger screens
        padding: 30,
        backgroundColor: "rgba(30, 30, 30, 0.9)", // Slightly darker for contrast
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5, // Added elevation for Android shadow
    }
});

export default SignUp;