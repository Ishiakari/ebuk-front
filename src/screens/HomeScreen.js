import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import COLORS from '../theme/colors';
import { bookService } from '../services/api';
import BookCard from '../components/BookCard';
import { styles } from '../../styles';

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Core API function handling network fetch from Laravel backend
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookService.getAllBooks();
      setBooks(data); 
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError("Could not sync with the backend database.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch records when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchBooks();
    }, [])
  );

  return (
    <View style={styles.homeContainer}>
      {/* Match the smartphone status bar background seamless configuration */}
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Custom Clean Header Top bar Navigation Frame */}
      <View style={styles.homeHeader}>
        <Text style={styles.homeAppLogo}>eBuk</Text>
      </View>

      <Text style={styles.homeScreenTitle}>Book List</Text>

      {/* Network Logic Conditionals */}
      {loading ? (
        <View style={styles.homeCenterContainer}>
          <ActivityIndicator size="large" color={COLORS.primaryAction} />
        </View>
      ) : error ? (
        <View style={styles.homeCenterContainer}>
          <Text style={styles.homeErrorText}>{error}</Text>
          <TouchableOpacity style={styles.homeRetryButton} onPress={fetchBooks}>
            <Text style={styles.homeRetryButtonText}>Retry Connection</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Main High-Performance Native List Controller View */
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={fetchBooks}
          refreshing={loading}
          renderItem={({ item }) => (
            <BookCard 
              book={item} 
              onPress={() => navigation.navigate('BookDetails', { book: item })} 
            />
          )}
          contentContainerStyle={styles.homeListScrollContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.homeEmptyText}>
              No books found in your library database.
            </Text>
          }
        />
      )}

      {/* Floating Action Button (FAB) anchored using your exact accent brand blue */}
      <TouchableOpacity 
        style={styles.homeFab} 
        onPress={() => navigation.navigate('CreateBook')}
        activeOpacity={0.8}
      >
        <Text style={styles.homeFabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};