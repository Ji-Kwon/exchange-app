import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6DCAC',
  },
  text: {
    fontSize: 24,
  },
});

export default HomeScreen;
