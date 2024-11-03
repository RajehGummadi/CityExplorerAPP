import React, { useState } from "react";
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    ImageBackground, 
    ScrollView, 
    TouchableOpacity 
} from "react-native";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <ImageBackground source={require('./wallpaper.jpg')} style={styles.background} resizeMode="cover">
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Text style={styles.title}>WELCOME BACK!</Text>
                        <Text style={styles.subtitle}>Enter your credentials to Login</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput
                                placeholder="Enter your username"
                                placeholderTextColor="lightgray"
                                style={styles.input}
                                onChangeText={setUsername}
                                value={username}
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
                                value={password}
                            />
                        </View>

                        <TouchableOpacity 
                            style={styles.loginButton} 
                            onPress={() => navigation.navigate("CityExplorerHome")}
                        >
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>

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
};

const styles = StyleSheet.create({
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
    },
});

export default Login;
