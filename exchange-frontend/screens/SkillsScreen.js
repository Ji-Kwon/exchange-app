// src/screens/SkillsScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../src/context/AuthContext';

const skillsLabels = [
    'Labour', 'Special Needs', 'O Block', 'Tree Planting', 
    'Children', 'White', 'Mentoring', 'Education', 
    'Leadership', 'Nature', 'Fundraising', 'Wellness', 
    'Outdoors', 'Animals', 'Travel', 'Explore'
];

const SkillsScreen = () => {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const navigation = useNavigation();
    const { user, setUser } = useContext(AuthContext);

    const toggleSkill = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter((s) => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    // Load saved skills when the screen is opened
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get(`http://172.20.10.5:5001/api/users/${user.user_id}`);
                setSelectedSkills(response.data.skills || []);
            } catch (error) {
                console.error('Error loading skills:', error);
            }
        };

        fetchSkills();
    }, []);

    // Save the selected skills to the backend
    const saveSkills = async () => {
        try {
            await axios.put(`http://172.20.10.5:5001/api/users/${user.user_id}`, {
                skills: selectedSkills,
            });
    
            // Update AuthContext with the new skills
            setUser((prevUser) => ({
                ...prevUser,
                skills: selectedSkills,
            }));
    
            // Navigate back to ProfileScreen
            navigation.goBack();
        } catch (error) {
            console.error('Error saving skills:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Skills</Text>
                    <TouchableOpacity onPress={saveSkills}>
                        <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity>
                </View>
                
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.selectedContainer}>
                        {selectedSkills.map((skill, index) => (
                            <View key={index} style={styles.selectedLabel}>
                                <Text style={styles.selectedLabelText}>{skill}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.labelsContainer}>
                        {skillsLabels.map((skill, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => toggleSkill(skill)}
                                style={[
                                    styles.label,
                                    selectedSkills.includes(skill) && styles.labelSelected,
                                ]}
                            >
                                <Text style={styles.labelText}>{skill}</Text>
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

export default SkillsScreen;
