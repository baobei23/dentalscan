import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const currentDate = new Date();
const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

// Generate available times from 08:00 to 17:00
const generateTimes = () => {
  const times = [];
  for (let hour = 8; hour <= 17; hour++) {
    const formattedHour = hour.toString().padStart(2, '0');
    times.push(`${formattedHour} : 00`);
    if (hour !== 17) { // Don't add :30 for last hour
      times.push(`${formattedHour} : 30`);
    }
  }
  return times;
};

const times = generateTimes();

export const ConsultationScheduleScreen = ({ route, navigation }) => {
  const { dentist } = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('11 : 00');

  const handleSubmit = () => {
    if (selectedDate) {
      navigation.navigate('LocateYourProblem', { dentist });
    }
  };

  // Generate calendar dates with padding for alignment
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const padding = Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1).fill(null);
  const calendarDates = [...padding, ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{dentist.name}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>active stomatologist</Text>
          <Ionicons name="checkmark-circle" size={20} color="#8b5cf6" />
        </View>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Selected Time Display */}
      <View style={styles.selectedTimeContainer}>
        <Text style={styles.selectedTimeText}>{selectedTime}</Text>
      </View>

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        {/* Days Header */}
        <View style={styles.daysHeader}>
          {days.map((day, index) => (
            <Text key={index} style={styles.dayText}>{day}</Text>
          ))}
        </View>

        {/* Dates Grid */}
        <View style={styles.datesGrid}>
          {calendarDates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateButton,
                selectedDate === date && styles.selectedDate,
                !date && styles.emptyDate
              ]}
              onPress={() => date && setSelectedDate(date)}
              disabled={!date}
            >
              <Text style={[
                styles.dateText,
                selectedDate === date && styles.selectedDateText
              ]}>
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Time Picker */}
      <ScrollView 
        style={styles.timePickerContainer}
        showsVerticalScrollIndicator={false}
      >
        {times.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeButton,
              selectedTime === time && styles.selectedTime
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={[
              styles.timeButtonText,
              selectedTime === time && styles.selectedTimeText
            ]}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity 
        style={[styles.submitButton, selectedDate && styles.submitButtonActive]}
        disabled={!selectedDate}
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
    paddingBottom: 20,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  selectedTimeContainer: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedTimeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  calendarContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  daysHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateButton: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  emptyDate: {
    backgroundColor: 'transparent',
  },
  selectedDate: {
    backgroundColor: '#8b5cf6',
    borderRadius: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  selectedDateText: {
    color: '#fff',
  },
  timePickerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  timeButton: {
    paddingVertical: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedTime: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  timeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedTimeText: {
    color: '#333',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#d3d3d3',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitButtonActive: {
    backgroundColor: '#8b5cf6',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 