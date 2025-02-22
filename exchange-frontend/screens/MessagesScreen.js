import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';

const MessagesScreen = () => {
  return (
    <View style={globalStyles.container}>
    <Text style={styles.text}>Message Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default MessagesScreen;
