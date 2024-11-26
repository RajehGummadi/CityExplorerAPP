import { React, useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert, TextInput, ImageBackground, ScrollView, SafeAreaView, ViewComponent, linearGradientProps } from "react-native";
//import { LOGIN_API_URL, APP_ENV } from '@env';


const Login = ({ navigation }) => {

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let userToken;
    const [msg, setMsg] = useState('');

    // console.log(process.env.APP_ENV);
    // console.log(process.env.LOGIN_API_URL);
    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:2024/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ userName, password }),
            });

            const data = await response.json();
            if (response.ok) {
                userToken = data.token;
                navigation.navigate("CityExplorerHome", { userName, userToken })
                // Alert.alert("Success", result.message);
            } else {
                setMsg(`Invalid credentails, Please try again.`);
                console.error("Invalid credentials");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
            setMsg(`Invalid credentails, Please try again.`);
            console.error(error);
        }
    };

    //Form Validations
    const [emptyFieldError, setEmptyFieldError] = useState('');

    useEffect(() => {
        if (!userName.trim() || !password.trim()) {
            setEmptyFieldError("Please enter your credentials to Login.");
        } else {
            setEmptyFieldError("");
        }
    }, [userName, password]);

    // return (
    //     <ScrollView scrollEnabled={false}>
    //         <ImageBackground source={require('./wallpaper.jpg')} style={styles.background}
    //             resizeMode="cover">
    //             <View style={{ width: 300, height: 75, alignItems: 'center' }}></View>
    //             <View style={{ width: 325, height: 500, alignItems: 'center' }}>
    //                 <View style={{ width: 290, height: 350, backgroundColor: "black", opacity: 0.85, borderRadius: 12, borderWidth: 15, textAlign: 'center' }}>
    //                     <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>WELCOME BACK!</Text>

    //                     <View style={{ height: 30 }}>{emptyFieldError && <Text style={[styles.textOutline]}>{emptyFieldError}</Text>}</View>
    //                     <View style={{ width: 30, height: 15, alignItems: 'center' }}></View>
    //                     <View style={{ alignItems: 'flex-start' }}>
    //                         <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: 240, height: 100 }}>
    //                             <Text style={{ fontSize: 15, color: 'white', height: 25 }}>Username: </Text>
    //                             <TextInput placeholder="  Enter your username" placeholderTextColor={'gray'}
    //                                 style={{ height: 30, width: 150, borderColor: 'white', color: 'white', borderWidth: 1, borderRadius: 5, }}
    //                                 value={userName}
    //                                 onChangeText={setUsername}
    //                                 onChange={(e) => setUsername(e.target.value)}
    //                                 id="userName"
    //                             />
    //                             <Text style={{ fontSize: 15, color: 'white', height: 25 }}>Password: </Text>
    //                             <TextInput placeholder="  Enter your password" placeholderTextColor={'gray'} secureTextEntry
    //                                 style={{ height: 30, width: 150, borderColor: 'white', color: 'white', borderWidth: 1, borderRadius: 5, }}
    //                                 value={password}
    //                                 onChangeText={setPassword}
    //                                 onChange={(e) => setPassword(e.target.value)}
    //                                 id="password"
    //                             />
    //                         </View>
    //                         <View style={{ height: 30 }}>{msg ? <Text textAlign="center" style={[styles.textOutline]} >{msg}</Text> : null}</View>
    //                         <View style={{ width: 250, height: 45, alignItems: 'center' }}>
    //                             <Button title="Login" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: 50, height: 30 }} onPress={handleLogin} disabled={!!emptyFieldError} /*onPress={() => navigation.navigate("CityExplorerHome")}*/>Login</Button>
    //                         </View>
    //                         <View>
    //                             <Text style={{ color: '#ffff99', margin: 15, justifyContent: 'center', textAlign: 'center', width: 200, height: 20, textDecorationLine: 'underline' }} onPress={() => navigation.navigate("ChangePassword")}>Forgot Password?</Text>
    //                         </View>
    //                         <View style={{ flexDirection: 'row', justifyContent: 'center', width: 250, height: 30 }}>
    //                             <Button title="Create a new account" color="green" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: 50, height: 25 }} onPress={() => navigation.navigate("SignUp")}></Button>
    //                         </View>
    //                     </View>
    //                 </View>
    //             </View>
    //         </ImageBackground>
    //     </ScrollView>
    // );
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <ImageBackground source={require('./wallpaper.jpg')} style={styles.background} resizeMode="cover">
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Text style={styles.title}>WELCOME BACK!</Text>
                        <View style={{ height: 30 }}>{emptyFieldError && <Text style={[styles.textOutline]}>{emptyFieldError}</Text>}</View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput
                                placeholder="Enter your username"
                                placeholderTextColor="lightgray"
                                style={styles.input}
                                onChangeText={setUsername}
                                onChange={(e) => setUsername(e.target.value)}
                                value={userName}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                placeholder="Enter your password"
                                placeholderTextColor="lightgray"
                                style={styles.input}
                                secureTextEntry
                                onChangeText={setPassword}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </View>
                        <View style={{ height: 30 }}>{msg ? <Text textAlign="center" style={[styles.textOutline]} >{msg}</Text> : null}</View>
                        <Button
                            style={styles.loginButton}
                            onPress={handleLogin} disabled={!!emptyFieldError}
                            title='Login'
                        >
                        </Button>

                        <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <View style={styles.newUserContainer}>
                            <Text style={styles.newUserText}>New user?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                                <Text style={styles.signUpText}>Sign-in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}



const styles = StyleSheet.create({

    backgroundImage: {
        resizeMode: 'repeat',
        justifyContent: 'center',
        backgroundColor: 'blue',
        height: 3800,
        width: 1800
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
    scrollViewContent: {
        flexGrow: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjusted for better readability
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20, // Padding added for better spacing
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
    },
    title: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#ddd',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
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
    forgotPassword: {
        color: '#ffff99',
        textDecorationLine: 'underline',
        marginTop: 15,
    },
    newUserContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    newUserText: {
        color: 'white',
    },
    signUpText: {
        color: '#ffff99',
        marginLeft: 5,
        textDecorationLine: 'underline',
    }
});

export default Login;