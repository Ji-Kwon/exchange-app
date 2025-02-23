// src/App.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import HomeStackNavigator from './src/navigation/HomeStack';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import SkillsScreen from './screens/SkillsScreen'; // <-- Add this
import InterestsScreen from './screens/InterestsScreen'; // <-- Add this
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { ConversationsProvider } from './src/context/ConversationsContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('./assets/images/home.png');
          } else if (route.name === 'Messages') {
            iconSource = require('./assets/images/messages.png');
          } else if (route.name === 'Profile') {
            iconSource = require('./assets/images/profile.png');
          }

          return (
            <Image
              source={iconSource}
              style={[
                styles.icon,
                { tintColor: focused ? '#028391' : '#F6DCAC' },
              ]}
            />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#028391',
        tabBarInactiveTintColor: '#F6DCAC',
        tabBarStyle: {
          backgroundColor: '#01204E',
          height: 85,
          borderTopWidth: 0,
          paddingTop: 15,
        },
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="AppTabs" component={AppTabs} />
            <Stack.Screen name="SkillsScreen" component={SkillsScreen} />
            <Stack.Screen name="InterestsScreen" component={InterestsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ConversationsProvider>
        <MainNavigator />
      </ConversationsProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});
