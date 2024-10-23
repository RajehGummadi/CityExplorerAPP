import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import SignUp from './components/profile/SignUp';
import Home from './components/Home';
import Settings from './components/profile/Settings';
import Profile from './components/profile/Profile';
import Wishlist from './components/profile/Wishlist';
import ChangePassword from './components/ChangePassword';
import HomeScreen from './assets/Screens/HomeScreen';
import Restaurants from './assets/Screens/Restaurants';
import Hotels from './assets/Screens/Hotels';
import Attractions from './assets/Screens/Attractions';
import Shopping from './assets/Screens/Shopping';
import Parks from './assets/Screens/Parks';

const Stack = createNativeStackNavigator()
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='Wishlist' component={Wishlist} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'City Explorer' }} />
        <Stack.Screen name="Restaurants" component={Restaurants} options={{ title: 'Restaurant Details' }} />
        <Stack.Screen name="Attractions" component={Attractions} options={{ title: 'List of Attractions' }} />
        <Stack.Screen name="Hotels" component={Hotels} options={{ title: 'Hotel Details' }} />
        <Stack.Screen name="Shopping" component={Shopping} options={{ title: 'List of Malls' }} />
        <Stack.Screen name="Parks" component={Parks} options={{ title: 'List of parks' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

