// src/screens/ProfileScreen.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../src/context/AuthContext';
import globalStyles from '../styles/globalStyles';

const ProfileScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Profile Screen</Text>
      <TouchableOpacity style={globalStyles.button} onPress={logout}>
        <Text style={globalStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
