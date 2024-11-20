import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ImageBackground, Animated } from "react-native";

const Home = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value
    const scaleAnim = useRef(new Animated.Value(0.5)).current; // Initial scale value

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1, // Animate to opacity: 1 (fully visible)
                duration: 3000, // Duration of the fade animation
                useNativeDriver: true, // Use native driver for performance
            }),
            Animated.timing(scaleAnim, {
                toValue: 1, // Animate to scale: 1 (normal size)
                duration: 3000, // Duration of the scale animation
                useNativeDriver: true, // Use native driver for performance
            }),
        ]).start(() => {
            navigation.replace("Login"); // Automatically navigate after animation
        });
    }, [fadeAnim, scaleAnim, navigation]);

    return (
        <ImageBackground
            source={require('./wallpaper.jpg')} style={styles.backgroundImage} resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.overlay}>
                    <Animated.View
                        style={[
                            styles.card,
                            {
                                opacity: fadeAnim, // Bind opacity to animated value
                                transform: [{ scale: scaleAnim }], // Bind scale to animated value
                            },
                        ]}
                    >
                        <TouchableOpacity
                            accessible={true}
                            accessibilityLabel="Go to Login"
                            accessibilityHint="Navigates to the login screen"
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={styles.titleText}>The City Explorer</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Home;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        padding: 20,
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent background
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.8)",
        opacity: 0.9,
        width: 350,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    titleText: {
        fontWeight: "700",
        textAlign: "center",
        color: "white",
        fontSize: 32,
        fontStyle: "italic",
        paddingVertical: 15,
    },
});