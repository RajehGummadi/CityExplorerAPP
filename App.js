import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import SignUp from './components/profile/SignUp';
import Home from './components/Home';
import community from './components/profile/community';
import Settings from './components/profile/Settings';
import Profile from './components/profile/Profile';
import Wishlist from './components/profile/Wishlist';
import ChangePassword from './components/ChangePassword';
import CityExplorerHome from './components/profile/HomeScreen';
import Events from './components/profile/Events';
import Restaurants from './components/profile/Restaurants';
import Attractions from './components/profile/Attractions';
import Shopping from './components/profile/Shopping';
import Parks from './components/profile/Parks';
import More from './components/profile/More';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='Wishlist' component={Wishlist} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='Community' component={community} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} />
        <Stack.Screen name='CityExplorerHome' component={CityExplorerHome} />
        <Stack.Screen name='Events' component={Events} />
        <Stack.Screen name='Restaurants' component={Restaurants} />
        <Stack.Screen name='Attractions' component={Attractions} />
        <Stack.Screen name='Shopping' component={Shopping} />
        <Stack.Screen name='Parks' component={Parks} />
        <Stack.Screen name='More' component={More} />
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
