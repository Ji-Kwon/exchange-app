import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import globalStyles from '../styles/globalStyles';

const HomeScreen = () => {
  return (
    <>
    <View style={globalStyles.container}>
        <View>
            <Text style={styles.title}>Exchange</Text>
        </View>
        <View style={styles.image}>
            <Image
            source ={{ uri: 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png', }} 
            style={{ width: 350, height: 200, borderWidth: "5", borderRadius: '5', overflow: 'hidden',}}
            resizeMode="contain" />
            
        </View>
        
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6DCAC',
  },
  image: {
    marginTop: '50',
    flex: 1,
    alignItems: "center",
 
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    marginTop: '20',
    fontFamily: 'SuperMagic-L3XVn', // not working
    fontSize: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default HomeScreen;
