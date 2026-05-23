import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from './config'; // Imports your 192.168.1.41 IP

export default function App() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Testing connection to your Laravel GET /api/books endpoint
    axios.get(`${API_URL}/books`)
      .then(response => {
        setMessage('Connection successful! Backend is responding.');
        console.log('Data from Laravel:', response.data);
        setLoading(false);
      })
      .catch(error => {
        setMessage('Connection failed. Check terminal logs.');
        console.error('API Error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>eBuk Mobile Test</Text>
      <Text style={styles.subtitle}>Target: {API_URL}</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.status}>{message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  status: { fontSize: 16, textAlign: 'center', color: '#333' }
});