import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { COLORS } from '../theme/colors';

export default function BookDetailsScreen({ route, navigation }) {
  const { book } = route.params;

  // Function to render the status badge color
  const getStatusColor = (statusName) => {
    switch (statusName?.toLowerCase()) {
      case 'reading': return COLORS.statusReading;
      case 'completed': return COLORS.statusCompleted;
      case 'plan to read': return COLORS.statusPlanToRead;
      default: return COLORS.statusBorrowed;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>Book Details</Text>

      <View style={styles.topSection}>
        <View style={styles.coverWrapper}>
          {book.cover_image ? (
            <Image source={{ uri: book.cover_image }} style={styles.coverImage} />
          ) : (
            <View style={[styles.coverImage, styles.coverPlaceholder]}>
              <Text style={styles.coverPlaceholderText}>No Cover</Text>
            </View>
          )}
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
          <Text style={styles.bookAuthor}>{book.author}</Text>
          <View style={styles.statusBadge}>
            <Text style={[styles.statusText, { color: getStatusColor(book.status) }]}>
              {book.status || 'Unknown'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>Genre</Text>
          <Text style={styles.metaValue}>{book.genre || 'General'}</Text>
        </View>
        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>Date Published</Text>
          <Text style={styles.metaValue}>{book.year || 'N/A'}</Text>
        </View>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.metaLabel}>Description</Text>
        <Text style={styles.descriptionText}>
          {book.description || 'No description provided.'}
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.readButton}
        onPress={() => {
          if (book.file && book.file.file_path) {
            navigation.navigate('ReadContent', { book });
          } else {
            Alert.alert("No File", "There is no readable document attached to this book.");
          }
        }}
      >
        <Text style={styles.readButtonText}>Read Content</Text>
      </TouchableOpacity>

      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => navigation.navigate('EditBook', { book })}
        >
          <Text style={styles.editButtonText}>Edit File</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 24,
    paddingBottom: 50,
  },
  headerTitle: {
    color: COLORS.textMain,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  coverWrapper: {
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  coverImage: {
    width: 100,
    height: 150,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  coverPlaceholder: {
    backgroundColor: '#2D3748',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverPlaceholderText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  infoWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    color: COLORS.textMain,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bookAuthor: {
    color: COLORS.textMuted,
    fontSize: 16,
    marginBottom: 16,
  },
  statusBadge: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  metaBlock: {
    flex: 1,
  },
  metaLabel: {
    color: COLORS.textMain,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metaValue: {
    color: COLORS.textMuted,
    fontSize: 16,
  },
  descriptionSection: {
    marginBottom: 40,
  },
  descriptionText: {
    color: COLORS.textMain,
    fontSize: 15,
    lineHeight: 24,
    opacity: 0.9,
  },
  readButton: {
    backgroundColor: COLORS.primaryAction,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  readButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#FFF8F0', // Slight off-white as in the design
    marginRight: 10,
  },
  backButtonText: {
    color: '#4A2E1B', // Dark brownish matching the design
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: COLORS.primaryAction,
    marginLeft: 10,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
