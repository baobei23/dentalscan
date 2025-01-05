import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const InvoiceScreen = ({ route, navigation }) => {
  const { dentist } = route.params;

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
        <Text style={styles.headerTitle}>Invoice</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Order Details Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order Details</Text>
        <Text style={styles.subtitle}>active stomatologist</Text>

        {/* Normal Price */}
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>NORMAL PRICE</Text>
          <View style={styles.priceBox}>
            <Text style={styles.price}>Rp 50.000</Text>
          </View>
        </View>

        {/* Promo Section */}
        <TouchableOpacity style={styles.promoSection}>
          <Text style={styles.promoText}>Choose Promo or Enter{'\n'}Promo Code</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.totalPrice}>
          <Text style={styles.totalPriceText}>Rp 50.000</Text>
        </View>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>Payment Method</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#f8f9fa',
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  priceSection: {
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 14,
    color: '#8b5cf6',
    marginBottom: 10,
  },
  priceBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  price: {
    fontSize: 16,
    color: '#8b5cf6',
  },
  promoSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoText: {
    fontSize: 14,
    color: '#666',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalPrice: {
    flex: 1,
    justifyContent: 'center',
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: '500',
  },
  paymentButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 