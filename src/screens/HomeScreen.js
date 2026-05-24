import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { COLORS } from '../theme/colors';
import { API_URL } from '../../config'; // Accesses your workstation computer's IPv4 network link
import BookCard from '../components/BookCard';

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Core API function handling network fetch from Laravel backend
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Hits your live endpoint (e.g., http://192.168.1.XX:8000/api/books)
      const response = await axios.get(`${API_URL}/books`);
      
      // Updates state directly with data rows matching your MySQL blueprint
      setBooks(response.data); 
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError("Could not sync with the backend database.");
    } finally {
      setLoading(false);
    }
  };

  // Mount effect to automatically fetch records on boot execution
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      {/* Match the smartphone status bar background seamless configuration */}
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Custom Clean Header Top bar Navigation Frame */}
      <View style={styles.header}>
        <Text style={styles.appLogo}>eBuk</Text>
      </View>

      <Text style={styles.screenTitle}>Book List</Text>

      {/* Network Logic Conditionals */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primaryAction} />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchBooks}>
            <Text style={styles.retryButtonText}>Retry Connection</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Main High-Performance Native List Controller View */
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={fetchBooks} // Pull down on screen to manually trigger reload
          refreshing={loading}
          renderItem={({ item }) => (
            <BookCard 
              book={item} 
              onPress={() => navigation.navigate('BookDetail', { bookId: item.id })} 
            />
          )}
          contentContainerStyle={styles.listScrollContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No books found in your library database.
            </Text>
          }
        />
      )}

      {/* Floating Action Button (FAB) anchored using your exact accent brand blue */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('CreateBook')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Uses #121A27
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
  },
  appLogo: {
    color: COLORS.primaryAction, // Uses #2E65F3
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  screenTitle: {
    color: COLORS.textMain,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 5,
  },
  listScrollContent: {
    paddingBottom: 100, // Leaves clean layout room so cards never hide under the FAB
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.primaryAction,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    color: COLORS.textMuted,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 40,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: COLORS.primaryAction, // Uses #2E65F3
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    // Premium shadowing to match the visual elevation float depth depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  fabIcon: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '300',
    marginTop: -3, // Micro-alignment adjustment to balance the font tracking baseline
  },
});