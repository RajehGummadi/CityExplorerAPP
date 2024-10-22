import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './assets/Screens/HomeScreen';
import Restaurants from './assets/Screens/Restaurants';
import Hotels from './assets/Screens/Hotels';
import Attractions from './assets/Screens/Attractions';
import Shopping from './assets/Screens/Shopping';
import Parks from './assets/Screens/Parks';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
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



