import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Label() { // the big function man
    const [label, setLabel] = useState ([ // the array for all the labels gonna be database stuffs
        { name: 'labour', key: '1' },
        { name: 'special needs', key: '2' },
        { name: 'O Block', key: '3' },
        { name: 'tree planting', key: '4' },
        { name: 'children', key: '5' },
        { name: 'white', key: '6'},

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