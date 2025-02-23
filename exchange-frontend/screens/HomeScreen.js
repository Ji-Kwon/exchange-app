import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import ListLabels from '../components/ListLabels';
import ListReqs from '../components/ListReqs';
import { ConversationsContext } from '../src/context/ConversationsContext'; 

import * as Font from 'expo-font';

const windowWidth = Dimensions.get('window').width;

const images = [
  { 
    source: require('../assets/images/fillerpfp.png'),
    dimensions: { width: 350, height: 300 }
  },
  {
    uri: 'https://img.freepik.com/free-photo/volunteers-with-medical-masks-gloves-preparing-boxes-with-food-donation_23-2148732671.jpg',
    title: 'Image 1',
  },
  {
    uri: 'https://arrivein.com/wp-content/uploads/2020/04/Benefits-of-volunteering-in-Canada.jpg',
    title: 'Image 2',
  },
];

const HomeScreen = ({ navigation }) => {
  const { addConversation } = useContext(ConversationsContext);

  const [fontsLoaded] = Font.useFonts({
    'SuperMagic-L3XVn': require('../assets/fonts/SuperMagic-L3XVn.ttf'), 
    'calibri': require('../assets/fonts/calibri.ttf'),
  });



  const renderItem = ({ item }) => (
    <View style={styles.picture}>
      {item.source ? (
        <Image source={item.source} style={styles.flatListImage} resizeMode="cover" />
      ) : (
        <Image source={{ uri: item.uri }} style={styles.flatListImage} resizeMode="cover" />
      )}
    </View>
  );

  return (
    <>
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
            
          <View>
            <Text style={styles.title}>Exchange</Text>
          </View>

          <View style={styles.image}>
            <FlatList
              data={images}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={styles.background}>
            <Text style={styles.description}>Description</Text>
            <Text numberOfLines={10} style={{ fontSize: 20, marginLeft: 10 }}>The Hearth Community Shelter is a welcoming volunteer hub located in the heart of downtown Vancouver. As a safe haven for those in need, The Hearth provides warm meals, essential supplies, and a sense of community to individuals facing challenging circumstances.

  Volunteers at The Hearth play a vital role in creating a supportive and respectful environment. Whether serving meals, organizing clothing donations, or simply offering a listening ear, every volunteer makes a meaningful impact on someone's day.</Text>
          </View>

          <View style={styles.exchange}>
            <Text style={styles.exchangeHeading}>Exchange Offered</Text>
            <ListLabels />
          </View>
          <View style={styles.line}>
            <Text style={styles.lol}>oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo</Text>
          </View>

          <View style={styles.exchange}>
            <Text style={styles.exchangeHeading}>Skills</Text>
            <ListReqs />
          </View>



        </View>
      </ScrollView>
    </SafeAreaView>
      {/* Message Button */}
      <TouchableOpacity 
        style={styles.messageButton}
        onPress={() => {
        // Add the conversation if it doesn't exist yet
          const contact = {
            id: 101, 
            name: 'Chat Support', 
            profilePic: 'https://via.placeholder.com/100'
          };
          addConversation(contact);
          // Navigate to the Messages screen
          navigation.navigate('Messages', { contact });
        }}
      >
        <Text style={styles.messageButtonText}>Message</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6DCAC',
  },
  scrollView: {
    backgroundColor: '#F6DCAC',
  },
  scrollContainer: { 
    flexGrow: 1,
    backgroundColor: '#F6DCAC',
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
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
  },
  exchange: { 
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 20,
    width: 350,
    alignItems: 'flex-start',  // Aligns to the left
  },
  exchangeHeading: {
    
    
    textAlign: 'left',        
    fontSize: 25,
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
    width: 350,
    height: 200,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: 'black',
  },
  picture: {
    width: 350,
    height: 200,
    borderRadius: 25,
    overflow: 'hidden',
  },
  flatListImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  title: {
    fontFamily: 'SuperMagic-L3XVn',
    color: '#01204E',
    marginTop: 60,
    marginRight: 160,
    fontSize: 40,
  },
  messageButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#028391',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  messageButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  line: {
    backgroundColor: 'black',

  },
  lol: {
    fontSize: 1,
   

  }
});

export default HomeScreen;