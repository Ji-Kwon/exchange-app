// src/navigation/HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import DMScreen from '../../screens/DMScreen';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DMScreen" component={DMScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
