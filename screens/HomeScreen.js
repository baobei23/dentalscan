import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { signOut } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth } from "../config";
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation();
  
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const handleDetectionPress = () => {
    console.log('Navigating to DetectionFeature');
    navigation.navigate('DetectionFeature');
  };

  const handleProfilePress = () => {
    console.log('Navigating to Profile');
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f3e7ff', '#e0f0ff']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle-outline" size={120} color="#8b5cf6" />
            </View>
            <Text style={styles.username}>Profile</Text>
          </View>

          {/* Info Message */}
          <Text style={styles.infoMessage}>
            Just like fingerprints, toothprints are unique to each individual.
          </Text>

          {/* Navigation Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Connect to new dentists</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button}
              onPress={handleDetectionPress}
            >
              <Text style={styles.buttonText}>dental health detection</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button}
              onPress={handleProfilePress}
            >
              <Text style={styles.buttonText}>Go to your profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  avatarContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  infoMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
    color: '#333',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#8b5cf6',
    fontSize: 16,
    fontWeight: '500',
  },
});
