import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const getRecommendations = (result) => {
  // Extract condition name and confidence from result string
  const match = result.match(/(.*?)\s*\(([\d.]+)%\)/);
  if (!match) return getHealthyTeethRecommendations();
  
  const [_, condition, confidence] = match;
  const confidenceNum = parseFloat(confidence);

  if (confidenceNum < 70) {
    return getHealthyTeethRecommendations();
  }

  switch (condition.toLowerCase()) {
    case 'abses':
      return getAbsesRecommendations();
    case 'calculus':
      return getCalculusRecommendations();
    case 'caries':
      return getCariesRecommendations();
    default:
      return getHealthyTeethRecommendations();
  }
};

const getHealthyTeethRecommendations = () => ({
  condition: 'Healthy teeth',
  clinicalState: 'Your teeth are in good health',
  recommendations: [
    'Brush your teeth twice a day with fluoride toothpaste',
    'Floss daily to clean between teeth',
    'Visit your dentist regularly for check-ups and cleanings'
  ]
});

const getAbsesRecommendations = () => ({
  condition: 'Dental Abscess Detected',
  clinicalState: 'A dental abscess is a severe infection that requires immediate attention',
  recommendations: [
    'Seek immediate dental care - this condition requires professional treatment',
    'Take over-the-counter pain medication if needed for temporary relief',
    'Rinse with warm salt water several times a day to help draw the infection out',
    'Avoid very hot or cold foods and drinks',
    'Do not attempt to treat this condition at home as it requires professional intervention'
  ]
});

const getCalculusRecommendations = () => ({
  condition: 'Dental Calculus Detected',
  clinicalState: 'Calculus (tartar) buildup requires professional cleaning',
  recommendations: [
    'Schedule a professional dental cleaning (scaling) as soon as possible',
    'Improve your daily oral hygiene routine with proper brushing technique',
    'Use tartar-control toothpaste with fluoride',
    'Consider using an electric toothbrush for better plaque removal',
    'Floss daily to prevent future calculus formation'
  ]
});

const getCariesRecommendations = () => ({
  condition: 'Dental Caries Detected',
  clinicalState: 'Dental caries (cavity) requires treatment to prevent further decay',
  recommendations: [
    'Schedule a dental appointment for proper treatment of the cavity',
    'Use fluoride toothpaste and consider fluoride mouthwash',
    'Reduce sugar intake and avoid frequent snacking',
    'Brush teeth after meals when possible',
    'Consider dental sealants for cavity prevention'
  ]
});

export const DetectionResult = ({ route, navigation }) => {
  const { images = [], result = 'Healthy teeth' } = route.params || {};
  const { condition, clinicalState, recommendations } = getRecommendations(result);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dental Health Detection Results</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Images Carousel */}
      <ScrollView horizontal style={styles.imageCarousel} showsHorizontalScrollIndicator={false}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.teethImage} />
        ))}
      </ScrollView>

      {/* Dental Condition Section */}
      <Text style={styles.sectionTitle}>Dental Condition</Text>
      <View style={styles.resultContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="tooth-outline" size={40} color="#fff" />
        </View>
        <View style={styles.resultTextContainer}>
          <Text style={styles.dateText}>Today</Text>
          <Text style={styles.conditionText}>{result}</Text>
        </View>
      </View>

      {/* Clinical State Section */}
      <Text style={styles.sectionTitle}>Clinical State of Dental Health</Text>
      <Text style={styles.clinicalText}>{clinicalState}</Text>

      {/* Care Recommendations */}
      <View style={styles.recommendationsContainer}>
        <Text style={styles.recommendationsTitle}>Care Recommendations</Text>
        <ScrollView style={styles.recommendationsList}>
          {recommendations.map((recommendation, index) => (
            <View key={index} style={styles.recommendationItem}>
              <Text style={styles.recommendationNumber}>{index + 1}</Text>
              <Text style={styles.recommendationText}>{recommendation}</Text>
            </View>
          ))}
        </ScrollView>
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
  imageCarousel: {
    height: 120,
    marginVertical: 20,
  },
  teethImage: {
    width: 160,
    height: 120,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  resultTextContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  conditionText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
  },
  clinicalText: {
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 10,
    color: '#666',
  },
  recommendationsContainer: {
    flex: 1,
    backgroundColor: '#f3e7ff',
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
  },
  recommendationsList: {
    flex: 1,
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  recommendationNumber: {
    width: 25,
    fontSize: 16,
    fontWeight: '500',
  },
  recommendationText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
}); 