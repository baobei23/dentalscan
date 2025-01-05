import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const LocateYourProblem = ({ route, navigation }) => {
  const { dentist } = route.params;

  const handleSubmit = () => {
    navigation.navigate('Invoice', { dentist });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Press to navigate your problem{'\n'}to Dr.{dentist.name}
      </Text>

      {/* Chat Input */}
      <View style={styles.chatInputContainer}>
        <TextInput
          style={styles.chatInput}
          placeholder="Add chat here..."
          placeholderTextColor="#8b5cf6"
        />
      </View>

      {/* Teeth Diagram */}
      <View style={styles.diagramContainer}>
        <Image
          source={require('../assets/teeth-diagram.png')}
          style={styles.teethDiagram}
          resizeMode="contain"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
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
    paddingTop: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 28,
  },
  chatInputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  chatInput: {
    backgroundColor: '#f3e8ff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#8b5cf6',
  },
  diagramContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  teethDiagram: {
    width: '100%',
    height: '80%',
    tintColor: '#ffc0cb',
  },
  submitButton: {
    backgroundColor: '#d3d3d3',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 