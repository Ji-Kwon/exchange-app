import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Skills() { // the big function man
    const [label, setLabel] = useState ([ // the array for all the labels gonna be database stuffs
        { name: 'Work Experience', key: '1' },
        { name: 'Mentoring', key: '2' },
        { name: 'Leadership', key: '3' },

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