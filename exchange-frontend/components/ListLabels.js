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
        <View style={style.container}>
            
        { label.map((item) => {
            return (
                <View key={item.key}>
                    <Text>{item.name}</Text>
                </View>
            )

        })};

        </View>
    );
}

const style = StyleSheet.create ({
    container: {
    

    },

});