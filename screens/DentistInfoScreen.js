import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const DentistInfoScreen = ({ route, navigation }) => {
  const { dentist } = route.params;

  const handleConsultation = () => {
    navigation.navigate('ConsultationSchedule', { dentist });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      <Image source={dentist.image} style={styles.profileImage} />

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Name and Status */}
        <View style={styles.nameSection}>
          <Text style={styles.name}>{dentist.name}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>active stomatologist</Text>
            <Ionicons name="checkmark-circle" size={20} color="#8b5cf6" />
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{dentist.customers}</Text>
            <Text style={styles.statLabel}>Customers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{dentist.unfinished}</Text>
            <Text style={styles.statLabel}>Unfinished</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{dentist.rating}.0</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Consultation Button */}
        <TouchableOpacity 
          style={styles.consultButton}
          onPress={handleConsultation}
        >
          <Text style={styles.consultButtonText}>Consultation</Text>
        </TouchableOpacity>

        {/* Info Items */}
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Clinic Name</Text>
            <Text style={styles.infoValue}>{dentist.clinicName}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Contact Number</Text>
            <Text style={styles.infoValue}>{dentist.contactNumber}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{dentist.address}</Text>
          </View>
        </View>

        {/* Visit Profile Button */}
        <TouchableOpacity style={styles.visitButton}>
          <Text style={styles.visitButtonText}>Visit Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  nameSection: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  status: {
    fontSize: 16,
    color: '#666',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  consultButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  consultButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#8b5cf6',
  },
  visitButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  visitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 