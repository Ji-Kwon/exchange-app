import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconSource;

            if (route.name === 'Home') {
              iconSource = require('./assets/images/home.png');
            } else if (route.name === 'Favourites') {
              iconSource = require('./assets/images/favourites.png');
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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name='Favourites' component={FavouritesScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});
