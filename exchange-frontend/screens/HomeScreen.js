import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import ListLabels from '../components/ListLabels';

const windowWidth = Dimensions.get('window').width;

const images = [
  { 
    source: require('../assets/images/favourites.png'),
    dimensions: { width: 350, height: 300 }
  },
  {
    uri: 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png',
    title: 'Image 1',
  },
  {
    uri: 'https://i.imgflip.com/1hnv2v.jpg?a483384',
    title: 'Image 2',
  },
];

const HomeScreen = () => {
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <Text style={{ fontSize: 20, marginLeft: 10 }}>alksdjfhalskdjfhalskdjfhalsdjfkhasl</Text>
          </View>

          <View style={styles.exchange}>
            <Text style={styles.exchangeHeading}>Exchange Offered</Text>
            <ListLabels />
          </View>

        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
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
    width: 350,
    alignItems: 'flex-start',  // Aligns to the left
  },
  exchangeHeading: {
    textAlign: 'left',        
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
    marginTop: 50,
    marginRight: 120,
    fontSize: 50,
  },
});

export default HomeScreen;