import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ROBOFLOW_API_ENDPOINT, ROBOFLOW_API_KEY } from '@env';
import * as FileSystem from 'expo-file-system';

export const DetectionFeature = ({ navigation }) => {
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
      aspect: [4, 3],
      quality: 1,
      base64: true,
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
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', 'Please select or take a photo first');
      return;
    }

    setLoading(true);

    try {
      // Construct the API URL with API key
      const apiUrl = `${ROBOFLOW_API_ENDPOINT}?api_key=${ROBOFLOW_API_KEY}`;
      console.log('API URL:', apiUrl);

      // Create form data
      const formData = new FormData();
      formData.append('file', {
        uri: selectedImage.uri,
        type: 'image/jpeg',
        name: 'image.jpg'
      });

      // Make API request to Roboflow
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Roboflow response:', data);

      // Cek apakah ada prediksi yang valid
      if (data && data.predictions) {
        // Ambil kelas dengan confidence tertinggi
        const predictions = Object.entries(data.predictions).map(([className, details]) => ({
          class: className,
          confidence: details.confidence
        }));

        const highestConfidencePrediction = predictions.reduce((prev, current) => {
          return (prev.confidence > current.confidence) ? prev : current;
        });

        if (highestConfidencePrediction) {
          // Navigate to results screen dengan hasil prediksi tertinggi
          navigation.navigate('DetectionResult', {
            images: [selectedImage.uri],
            result: `${highestConfidencePrediction.class} (${(highestConfidencePrediction.confidence * 100).toFixed(2)}%)`
          });
        } else {
          Alert.alert('No detection', 'Could not detect dental condition in the image. Please try again with a different image.');
        }
      } else {
        console.log('Unexpected API response format:', data);
        Alert.alert('Error', 'Received unexpected response format from the server.');
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      Alert.alert('Error', 'Failed to analyze the image. Please try again.');
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
        <Text style={styles.headerTitle}>Dental Detection</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Selected Image Preview */}
      <View style={styles.imagePreview}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <MaterialIcons name="add-a-photo" size={40} color="#666" />
            <Text style={styles.placeholderText}>Select or take a photo</Text>
          </View>
        )}
      </View>

      {/* Photo Options */}
      <View style={styles.photoOptions}>
        <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
          <MaterialIcons name="photo-library" size={32} color="black" />
          <Text style={styles.optionText}>Add photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={takePhoto}>
          <MaterialIcons name="camera-alt" size={32} color="black" />
          <Text style={styles.optionText}>Take picture</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={[styles.submitButton, selectedImage ? styles.submitButtonActive : {}]}
        onPress={analyzeImage}
        disabled={!selectedImage || loading}
      >
        <Text style={styles.submitText}>
          {loading ? 'Analyzing...' : 'Analyze Image'}
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
  },
  imagePreview: {
    width: '90%',
    height: 300,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  photoOptions: {
    marginTop: 20,
    paddingHorizontal: 20,
    gap: 20,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  submitButton: {
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
  submitButtonActive: {
    backgroundColor: '#8b5cf6',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 