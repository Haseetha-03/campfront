// App.js (root project file)
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Feature screens
import HomeScreen from './client/src/screens/HomeScreen';
import LostAndFoundScreen from './client/src/screens/LostandFound';
import CampusMemoriesScreen from './client/src/screens/CampusMemories';
import Clubs from './client/src/screens/Clubs';
import AlertsScreen from './client/src/screens/AlertsScreen';
import AboutScreen from './client/src/screens/AboutScreen';
import ProfileScreen from './client/src/screens/Profilescreen';
import PlacementsScreen from './client/src/screens/Placements';
import MarketplaceScreen from './client/src/screens/MarketplaceScreen';
import CanteenMenuScreen from './client/src/screens/CanteenMenuScreen';
import CampusMapScreen from './client/src/screens/CampusMapScreen';
import ExamHallScreen from './client/src/screens/ExamHallScreen';
import FindLocationScreen from './client/src/screens/FindLocationScreen';

// Authentication screens
import LoginScreen from './client/src/screens/LoginScreen';
import RegisterScreen from './client/src/screens/RegisterScreen';
import ResetPassword, {
  ForgotPasswordScreen,
  ForceResetScreen,
} from './client/src/screens/ResetPassword.jsx';

const Stack = createNativeStackNavigator();
console.log("LoginScreen:", typeof LoginScreen);
console.log("RegisterScreen:", typeof RegisterScreen);
console.log("MarketplaceScreen:", typeof MarketplaceScreen);
console.log("CanteenMenuScreen:", typeof CanteenMenuScreen);

// These screens use a custom `navigate` prop, so adapt React Navigation props.
function ForgotPasswordRoute({ navigation, route }) {
  return (
    <ForgotPasswordScreen
      navigate={(name, params) => navigation.navigate(name, params)}
      params={route.params}
    />
  );
}

function ForceResetRoute({ navigation, route }) {
  return (
    <ForceResetScreen
      navigate={(name, params) => navigation.navigate(name, params)}
      params={route.params}
    />
  );
}

const screenImports = {
  HomeScreen,
  LostAndFoundScreen,
  CampusMemoriesScreen,
  Clubs,
  AlertsScreen,
  AboutScreen,
  ProfileScreen,
  PlacementsScreen,
  MarketplaceScreen,
  CanteenMenuScreen,
  CampusMapScreen,
  ExamHallScreen,
  FindLocationScreen,
  LoginScreen,
  RegisterScreen,
  ResetPassword,
  ForgotPasswordScreen,
  ForceResetScreen,
};

console.log(
  'Screen import types:',
  Object.fromEntries(
    Object.entries(screenImports).map(([name, component]) => [
      name,
      typeof component,
    ])
  )
);


export default function App() {
  const [guestMode, setGuestMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function checkGuestMode() {
      try {
        const guest = await AsyncStorage.getItem('guest_mode');
        if (active) setGuestMode(guest === 'true');
      } catch (err) {
        console.error('Error checking guest mode:', err);
        if (active) setGuestMode(false);
      } finally {
        if (active) setLoading(false);
      }
    }

    checkGuestMode();
    return () => { active = false; };
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={guestMode ? 'GuestHome' : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordRoute} />
        <Stack.Screen name="ForceReset" component={ForceResetRoute} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GuestHome" component={HomeScreen} options={{ unmountOnBlur: true }} />

        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Alerts" component={AlertsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />

        <Stack.Screen name="CampusMap" component={CampusMapScreen} />
        <Stack.Screen name="ExamHall" component={ExamHallScreen} />
        <Stack.Screen name="FindLocationScreen" component={FindLocationScreen} />

        <Stack.Screen name="Clubs" component={Clubs} />
        <Stack.Screen name="CampusMemories" component={CampusMemoriesScreen} />
        <Stack.Screen name="LostAndFound" component={LostAndFoundScreen} />
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
        <Stack.Screen name="CanteenMenu" component={CanteenMenuScreen} />
        <Stack.Screen name="Placements" component={PlacementsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
