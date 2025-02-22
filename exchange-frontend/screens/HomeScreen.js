import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import globalStyles from '../styles/globalStyles';
import globalLabels from '../styles/labels';
import React, { useState, useEffect } from 'react';




const HomeScreen = () => {

  const [labels, setLabels] = useState([]);

  useEffect(() => {
    // Placeholder data to simulate database labels
    const placeholderLabels = ["Testing", "Accommodations", "Ballsack licker", "Gay buttsex man"];
    
    // Simulate database fetch with a delay
    const fetchLabels = async () => {
      setTimeout(() => {
        setLabels(placeholderLabels);  // Use placeholder data for now
      }, 1000);  // Delay to simulate loading
    };

    fetchLabels();
  }, []);

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
              
              <View style={styles.exchange}>
                  <Text style={styles.exchangeHeading}>Exchange Offered</Text>
                  <View>
                      
                  </View>
              </View>

          </View>
        </ScrollView>
    </>
  );
};
/*
The labels are supposed to be imported in the <View style exchange />.
*/

const styles = StyleSheet.create({
  scrollContainer: {
   
   
  },
  container: {
    paddingBottom: 20,
    alignItems: "center",
    backgroundColor: "#F6DCAC",
    
  },
  background: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#FBEED6",
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#000",         // Fixed typo
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
  },
  exchange: { 
    marginLeft: 15,
    marginTop: 20,
    width: 350,
    alignItems: 'flex-start',  // Aligns to the left
  },
  exchangeHeading: {
    textAlign: 'left',        // Centers text within container
    fontSize: 35,
    fontWeight: 'bold',
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
    

  },
  title: {
    marginTop: 50,
    marginRight: 120,
    
    fontFamily: 'SuperMagic-L3XVn', // not working
    fontSize: 50,

  },
});

export default HomeScreen;
