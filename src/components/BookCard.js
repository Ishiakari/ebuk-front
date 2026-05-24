import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../theme/colors';

export default function BookCard({ book, onPress }) {
  // Helper to dynamically pick badge colors matching your system statuses
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'reading': return COLORS.statusReading;
      case 'completed': return COLORS.statusCompleted;
      case 'plan to read': return COLORS.statusPlanToRead;
      default: return COLORS.statusBorrowed;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {/* 1. Left Section: Book Cover Image Layout */}
      <View style={styles.coverContainer}>
        {book.cover_image ? (
          <Image source={{ uri: book.cover_image }} style={styles.cover} />
        ) : (
          <View style={[styles.cover, styles.placeholderCover]}>
            <Text style={styles.placeholderText}>eBuk</Text>
          </View>
        )}
      </View>

      {/* 2. Right Section: Meta Information Layout */}
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{book.title}</Text>
          {book.status && (
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(book.status) }]}>
              <Text style={styles.badgeText}>{book.status}</Text>
            </View>
          )}
        </View>

        <Text style={styles.author} numberOfLines={1}>Author: {book.author}</Text>
        
        <View style={styles.genreBadge}>
          <Text style={styles.genreText}>{book.genre || 'General'}</Text>
        </View>

        {/* 3. Bottom Utility Area: Dynamic Format Indicator badges */}
        {book.file_format && (
          <View style={styles.formatIndicator}>
            <Text style={styles.formatIcon}>⚡</Text>
            <Text style={styles.formatText}>{book.file_format.toUpperCase()}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  coverContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cover: {
    width: 85,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#252F3F',
  },
  placeholderCover: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  title: {
    color: COLORS.textMain,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  author: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginTop: 2,
  },
  genreBadge: {
    backgroundColor: '#252F41',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 6,
  },
  genreText: {
    color: '#A0AEC0',
    fontSize: 12,
    fontWeight: '600',
  },
  formatIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  formatIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  formatText: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});