import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen'; 
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import AddTripScreen from './screens/AddTripScreen';
import ProfileScreen from './screens/ProfileScreen';
import DiscoverScreen from './screens/DiscoverScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen           
          options={{ headerShown: false, gestureEnabled: false }}
          name="Welcome" 
          component={WelcomeScreen} />
        <Stack.Screen 
          options={{ headerShown: false, gestureEnabled: false }}
          name="Login" 
          component={LoginScreen} />
        <Stack.Screen 
          options={{ headerShown: false, gestureEnabled: false }}
          name="Signup"   
          component={SignupScreen} />
        <Stack.Screen 
          options={{ headerShown: false, gestureEnabled: false }}
          name="Home"  
          component={HomeScreen} />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="AddTrip"
          component={AddTripScreen} />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Profile"
          component={ProfileScreen} />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="DiscoverScreen"
          component={DiscoverScreen} />
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
