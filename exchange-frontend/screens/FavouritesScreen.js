// screens/FavouritesScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';

const FavouritesScreen = () => {
  return (
    <View style={[globalStyles.container, styles.extraMargin]}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  extraMargin: {
    marginTop: 50, // adjust this value as needed
  },
  text: {
    fontSize: 24,
  },
});

export default FavouritesScreen;
