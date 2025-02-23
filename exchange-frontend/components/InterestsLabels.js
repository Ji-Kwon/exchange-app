import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function interestsLabel() { // the big function man
    const [label, setLabel] = useState ([ // the array for all the labels gonna be database stuffs
        { name: 'Mentoring', key: '1' },
        { name: 'Children and Youth', key: '2' },
        { name: 'Immigration', key: '3' },
        { name: 'Nature', key: '4' },
        { name: 'Fundraising', key: '5' },
        { name: 'Wellness', key: '6'},
        { name: 'Outdoors', key: '7'},
        { name: 'Animals', key: '8'},
        { name: 'Education', key: '9'},
        { name: 'Work Experience', key: '10'},
        { name: 'Leadership', key: '11'},
        { name: 'Travel', key: '12'},
        { name: 'Explore', key: '13'},
        { name: 'Meet New People', key: '14'},

    ]);

    return (
        <View style={styles.container} >
            
        { label.map((item) => {
            return (
                <View style={styles.list} key={item.key}>
                    <Text style={styles.text}>{item.name}</Text>
                </View>
            );

        })};

        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        

    },
    list: {
        margin: 10,
       
        
    },

    text: {
        backgroundColor: "#FBEED6",
        padding: 7,
        borderRadius: 30,
        borderWidth: 4,
        borderColor: 'black',
        fontSize: 15,
        shadowColor: "#000",        
        shadowOpacity: 0.5,
        shadowRadius: 4,
        shadowOffset: {height: 5,},
        


    },

});