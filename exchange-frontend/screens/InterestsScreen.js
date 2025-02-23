// src/screens/InterestsScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../src/context/AuthContext';

const interestsLabels = [
    'Mentoring', 'Children and Youth', 'Immigration', 'Nature', 
    'Fundraising', 'Wellness', 'Outdoors', 'Animals', 
    'Education', 'Work Experience', 'Leadership', 'Travel', 
    'Explore', 'Meet New People'
];

const InterestsScreen = () => {
    const [selectedInterests, setSelectedInterests] = useState([]);
    const navigation = useNavigation();
    const { user, setUser } = useContext(AuthContext);

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((s) => s !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    // Load saved interests when the screen is opened
    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const response = await axios.get(`http://172.20.10.5:5001/api/users/${user.user_id}`);
                setSelectedInterests(response.data.interests || []);
            } catch (error) {
                console.error('Error loading interests:', error);
            }
        };

        fetchInterests();
    }, []);

    // Save the selected interests to the backend
    const saveInterests = async () => {
        try {
            await axios.put(`http://172.20.10.5:5001/api/users/${user.user_id}`, {
                interests: selectedInterests,
            });
    
            // Update AuthContext with the new interests
            setUser((prevUser) => ({
                ...prevUser,
                interests: selectedInterests,
            }));
    
            // Navigate back to ProfileScreen
            navigation.goBack();
        } catch (error) {
            console.error('Error saving interests:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Interests</Text>
                    <TouchableOpacity onPress={saveInterests}>
                        <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity>
                </View>
                
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.selectedContainer}>
                        {selectedInterests.map((interest, index) => (
                            <View key={index} style={styles.selectedLabel}>
                                <Text style={styles.selectedLabelText}>{interest}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.labelsContainer}>
                        {interestsLabels.map((interest, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => toggleInterest(interest)}
                                style={[
                                    styles.label,
                                    selectedInterests.includes(interest) && styles.labelSelected,
                                ]}
                            >
                                <Text style={styles.labelText}>{interest}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F6DCAC',
    },
    container: { 
        flex: 1, 
        backgroundColor: '#F6DCAC', 
        padding: 20,
        paddingTop: 50, 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cancelText: { color: '#000', fontSize: 18 },
    title: { fontSize: 32, fontWeight: 'bold' },
    doneText: { color: '#028391', fontSize: 18 },
    scrollContainer: { flexGrow: 1 },
    selectedContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    selectedLabel: {
        backgroundColor: '#028391',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 5,
    },
    selectedLabelText: { color: '#FFF' },
    labelsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    label: {
        backgroundColor: '#FBEED6',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
        margin: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { height: 2 },
    },
    labelSelected: { backgroundColor: '#028391', borderColor: '#028391' },
    labelText: { color: '#000' },
});

export default InterestsScreen;
