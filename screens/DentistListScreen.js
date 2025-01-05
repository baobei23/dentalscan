import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const dentists = [
  {
    id: 1,
    name: 'Laurie Go',
    rating: 5,
    image: require('../assets/dentists/lau.png'),
    clinicName: "Go's Clinic",
    contactNumber: "+62 8888 8888",
    address: "Tabing",
    customers: 147,
    unfinished: 11
  },
  {
    id: 2,
    name: 'Chri',
    rating: 4,
    image: require('../assets/dentists/chri.png'),
    clinicName: "Chri's Clinic",
    contactNumber: "+62 8888 8889",
    address: "Padang",
    customers: 120,
    unfinished: 8
  },
  {
    id: 3,
    name: 'Lee',
    rating: 4,
    image: require('../assets/dentists/lee.png'),
    clinicName: "Lee's Clinic",
    contactNumber: "+62 8888 8890",
    address: "Jakarta",
    customers: 135,
    unfinished: 9
  },
  {
    id: 4,
    name: 'Sophie',
    rating: 3,
    image: require('../assets/dentists/sophie.png'),
    clinicName: "Sophie's Clinic",
    contactNumber: "+62 8888 8891",
    address: "Bandung",
    customers: 98,
    unfinished: 7
  },
  {
    id: 5,
    name: 'Laylee',
    rating: 2,
    image: require('../assets/dentists/laylee.png'),
    clinicName: "Laylee's Clinic",
    contactNumber: "+62 8888 8892",
    address: "Surabaya",
    customers: 75,
    unfinished: 5
  }
];

const RatingStars = ({ rating }) => {
  return (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? "star" : "star-outline"}
          size={16}
          color="#FFD700"
        />
      ))}
    </View>
  );
};

export const DentistListScreen = ({ navigation }) => {
  const [sortBy, setSortBy] = useState('rating');

  const handleDentistPress = (dentist) => {
    navigation.navigate('DentistInfo', { dentist });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>choose a dentist</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Sort Button */}
      <TouchableOpacity style={styles.sortButton}>
        <MaterialIcons name="sort" size={20} color="white" />
        <Text style={styles.sortButtonText}>by rating</Text>
        <MaterialIcons name="keyboard-arrow-down" size={20} color="white" />
      </TouchableOpacity>

      {/* Dentist List */}
      <ScrollView style={styles.dentistList}>
        {dentists.map((dentist) => (
          <TouchableOpacity 
            key={dentist.id} 
            style={styles.dentistCard}
            onPress={() => handleDentistPress(dentist)}
          >
            <View style={styles.imageContainer}>
              <Image source={dentist.image} style={styles.dentistImage} />
              <View style={styles.overlay}>
                <View style={styles.dentistInfo}>
                  <Text style={styles.dentistName}>{dentist.name}</Text>
                  <RatingStars rating={dentist.rating} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    color: '#000',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginVertical: 10,
  },
  sortButtonText: {
    color: 'white',
    marginHorizontal: 8,
    fontSize: 14,
  },
  dentistList: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  dentistCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    padding: 15,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  dentistImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
  },
  dentistInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dentistName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
}); 