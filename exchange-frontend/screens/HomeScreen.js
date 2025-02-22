import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import globalStyles from '../styles/globalStyles';

const HomeScreen = () => {
  return (
    <>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            
              <View>
                  <Text style={styles.title}>Exchange</Text>
              </View>
              <View style={styles.image}>
                  <Image
                  source ={{ uri: 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png', }} 
                  style={styles.picture}
                  resizeMode="contain" />
              </View>
              <View style={styles.background}>
                <Text style={styles.description}>Description</Text>
                <Text style={{ fontSize: 20, marginLeft: 10,}}>alksdjfhalskdjfhalskdjfhalsdjfkhasl</Text>
   
              </View>

          </View>
        </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#F6DCAC",
    
  },
  background: {
    flex: 1,
    marginLeft: 20,
    marginTop: -180,
    width: 350,
    justifyContent: 'flex-start',
    alignItems: 'left',
    backgroundColor: "#FBEED6",
    borderRadius: 20,
    overflow: 'hidden',
    shadowCOlor: "#000",
    shadowRadius: 4,
    
  },

  description: {
    marginLeft: 10,
    marginBottom: 20,
    marginTop: 20,
    justifyContent: "flex-start",
    textAlign: 'left',
    fontSize: 35,
    fontWeight: 'bold',
    
  },
  image: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
 
  },
  picture: {
    width: 350,
    height: 200,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,

  },

  titleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    
    fontFamily: 'SuperMagic-L3XVn', // not working
    fontSize: 50,

  },
});

export default HomeScreen;
