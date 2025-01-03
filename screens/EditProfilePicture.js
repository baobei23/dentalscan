import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth, storage } from "../config/firebase";

export const EditProfilePicture = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photo library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your camera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select or take a photo first');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(selectedImage.uri);
      const blob = await response.blob();
      
      // Generate a unique filename
      const filename = `profile_${auth.currentUser.uid}_${Date.now()}.jpg`;
      const imageRef = ref(storage, `profile_pictures/${filename}`);
      
      // Upload the image
      const uploadResult = await uploadBytes(imageRef, blob);
      console.log('File uploaded successfully:', uploadResult);

      // Get the download URL
      const downloadURL = await getDownloadURL(imageRef);
      console.log('Download URL:', downloadURL);
      
      // Update user profile
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL
      });

      Alert.alert(
        'Success',
        'Profile picture updated successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to update profile picture. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile Picture</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Image Preview */}
      <View style={styles.imagePreview}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <MaterialIcons name="add-a-photo" size={40} color="#666" />
            <Text style={styles.placeholderText}>Select or take a photo</Text>
          </View>
        )}
      </View>

      {/* Photo Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
          <MaterialIcons name="photo-library" size={24} color="#8b5cf6" />
          <Text style={styles.optionText}>Choose from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={takePhoto}>
          <MaterialIcons name="camera-alt" size={24} color="#8b5cf6" />
          <Text style={styles.optionText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity 
        style={[styles.saveButton, selectedImage ? styles.saveButtonActive : {}]}
        onPress={uploadImage}
        disabled={!selectedImage || loading}
      >
        <Text style={styles.saveButtonText}>
          {loading ? 'Updating...' : 'Update Profile Picture'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#8b5cf6',
  },
  imagePreview: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#d3d3d3',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  saveButtonActive: {
    backgroundColor: '#8b5cf6',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 