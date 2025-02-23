// src/screens/ProfileScreen.js
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  // Get the logged-in user's data from your AuthContext
  const { user, setUser, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  // Initialize state with user data from the database
  const [profileImage, setProfileImage] = useState(user?.profile_picture || null);
  const [bio, setBio] = useState(user?.bio || '');
  const [bioText, setBioText] = useState(bio);
  const [editingBio, setEditingBio] = useState(false);

  // Request permissions for accessing images
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // Function to upload an image to Cloudinary and return the secure URL
  const uploadImageToCloudinary = async (localUri) => {
    const filename = localUri.split('/').pop();
    let formData = new FormData();
    formData.append('file', {
      uri: localUri,
      name: filename,
      type: 'image/jpeg', // adjust if needed
    });
    formData.append('upload_preset', 'pfpPreset'); // your unsigned upload preset from Cloudinary
    try {
      let res = await fetch(
        `https://api.cloudinary.com/v1_1/deasgfcjg/image/upload`, // replace with your cloud name if different
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      let data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return null;
    }
  };

  // Pick a new profile image, then upload it to Cloudinary
  const pickProfileImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const localUri = result.assets ? result.assets[0].uri : result.uri;
        const uploadedUrl = await uploadImageToCloudinary(localUri);
        if (uploadedUrl) {
          setProfileImage(uploadedUrl);
        }
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  // Toggle to edit mode for bio
  const handleEditBio = () => {
    setEditingBio(true);
  };

  // Save the bio and dismiss the keyboard
  const handleDoneBio = () => {
    setBio(bioText);
    setEditingBio(false);
    Keyboard.dismiss();
  };

  // Save profile changes (profile image and bio) to the database
  const handleSaveProfile = async () => {
    try {
      // Replace with your actual backend URL and endpoint
      const response = await axios.put(`http://172.20.10.5:5001/api/users/${user.user_id}`, {
        profile_picture: profileImage,
        bio: bio,
      });
      // Update your AuthContext with the new user data
      setUser(response.data);
      console.log('Profile updated:', response.data);
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Header Title */}
          <Text style={styles.headerTitle}>Profile</Text>

          {/* Profile Picture Section */}
          <View style={styles.profilePicContainer}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require('../assets/images/fillerpfp.png')
              }
              style={styles.profilePic}
            />
            <TouchableOpacity style={styles.editIconContainer} onPress={pickProfileImage}>
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>

          {/* Display user's full name from the database */}
          <Text style={styles.userName}>
            {user ? `${user.first_name} ${user.last_name}` : 'User Name'}
          </Text>

          {/* Bio Section */}
          <Text style={styles.sectionTitle}>Bio About Me</Text>
          <View style={styles.bioContainer}>
            {editingBio ? (
              <>
                <TextInput
                  style={[styles.bioInput, styles.editableBio]}
                  placeholder="Enter your bio..."
                  multiline
                  value={bioText}
                  onChangeText={(text) => setBioText(text)}
                />
                <TouchableOpacity style={styles.doneButton} onPress={handleDoneBio}>
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={styles.bioDisplayContainer} onPress={handleEditBio}>
                <Text style={styles.bioDisplayText}>{bio || 'Tap to add your bio'}</Text>
                <Text style={styles.editBioIcon}>✏️</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Skills Section */}
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <View key={index} style={styles.skillLabel}>
                  <Text style={styles.skillLabelText}>{skill}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noSkillsText}>No skills selected.</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.sectionRow}
            onPress={() => navigation.navigate('SkillsScreen')}
          >
            <Text style={styles.sectionLabel}>Edit Skills</Text>
            <Text style={styles.sectionArrow}>›</Text>
          </TouchableOpacity>


          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {user.interests && user.interests.length > 0 ? (
              user.interests.map((interest, index) => (
                <View key={index} style={styles.interestLabel}>
                  <Text style={styles.interestLabelText}>{interest}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noInterestsText}>No interests selected.</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.sectionRow}
            onPress={() => navigation.navigate('InterestsScreen')}
          >
            <Text style={styles.sectionLabel}>Edit Interests</Text>
            <Text style={styles.sectionArrow}>›</Text>
          </TouchableOpacity>
          {/* Save Profile Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6DCAC',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6DCAC',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 10,
    alignSelf: 'flex-start',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
  },
  profilePicContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 10,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: 'cover',
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 5,
  },
  editIcon: {
    fontSize: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  bioContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  bioInput: {
    minHeight: 80,
    padding: 10,
    textAlignVertical: 'top',
  },
  editableBio: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  doneButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#028391',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  doneButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  bioDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bioDisplayText: {
    flex: 1,
    fontSize: 16,
  },
  editBioIcon: {
    fontSize: 18,
    marginLeft: 10,
    color: '#028391',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  skillLabel: {
    backgroundColor: '#028391',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  skillLabelText: {
    color: '#FFF',
    fontSize: 14,
  },
  noSkillsText: {
    color: '#666',
    fontSize: 16,
    fontStyle: 'italic',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  interestLabel: {
    backgroundColor: '#028391',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  interestLabelText: {
    color: '#FFF',
    fontSize: 14,
  },
  noInterestsText: {
    color: '#666',
    fontSize: 16,
    fontStyle: 'italic',
  },

  sectionRow: {
    width: '100%',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 18,
  },
  sectionArrow: {
    fontSize: 18,
    color: '#666',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#028391',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#028391',
    fontSize: 16,
  },
});
