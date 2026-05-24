import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS } from '../theme/colors';
import CustomTextInput from '../components/CustomTextInput';
import { useBookForm } from '../hooks/useBookForm';

export default function CreateBookScreen({ navigation }) {
  const { formData, options, selectedFile, selectedCover, loading, initialLoading, error, handleChange, pickFile, pickCover, submitForm } = useBookForm();

  const handleSave = async () => {
    const success = await submitForm();
    if (success) {
      navigation.goBack();
    }
  };

  if (initialLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryAction} />
      </View>
    );
  }

  // Generate an array of years for the dropdown (e.g. from 1900 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>New Book</Text>
      <Text style={styles.headerSubtitle}>Fill in the info below</Text>
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      <CustomTextInput
        label="Title"
        placeholder="Enter book title"
        value={formData.title}
        onChangeText={(text) => handleChange('title', text)}
      />

      <CustomTextInput
        label="Author"
        placeholder="Enter author name"
        value={formData.author_name}
        onChangeText={(text) => handleChange('author_name', text)}
      />

      <CustomTextInput
        label="Genre"
        placeholder="Enter genre (e.g. Fiction, Sci-Fi)"
        value={formData.genre_name}
        onChangeText={(text) => handleChange('genre_name', text)}
      />

      <CustomTextInput
        label="Year"
        placeholder="Enter publication year"
        keyboardType="numeric"
        value={formData.year}
        onChangeText={(text) => handleChange('year', text)}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={formData.status_id}
            dropdownIconColor="#A0AEC0"
            style={styles.picker}
            onValueChange={(itemValue) => handleChange('status_id', itemValue)}
          >
            <Picker.Item label="Choose status" value="" color={COLORS.textMuted} />
            {options.statuses.map(status => (
              <Picker.Item key={status.id} label={status.name} value={status.id} color={COLORS.textMain} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Cover Image</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={pickCover} activeOpacity={0.8}>
          <Text style={styles.uploadIcon}>🖼️</Text>
          <Text style={styles.uploadTitle}>
            {selectedCover ? selectedCover.name : "Upload Book Cover (JPG, PNG)"}
          </Text>
          {!selectedCover && (
            <Text style={styles.uploadSubtitle}>Tap to select an image</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>PDF Content</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={pickFile} activeOpacity={0.8}>
          <Text style={styles.uploadIcon}>⬆️</Text>
          <Text style={styles.uploadTitle}>
            {selectedFile ? selectedFile.name : "Upload PDF, EPUB, MOBI File"}
          </Text>
          {!selectedFile && (
            <Text style={styles.uploadSubtitle}>Drag or tap to attach book content</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={handleSave} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.saveButtonText}>Create Book</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.cancelButton} 
        onPress={() => navigation.goBack()}
        disabled={loading}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 50,
  },
  headerTitle: {
    color: COLORS.textMain,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 10,
  },
  headerSubtitle: {
    color: COLORS.textMuted,
    fontSize: 16,
    marginBottom: 30,
  },
  label: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerWrapper: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D3748',
    overflow: 'hidden',
  },
  picker: {
    color: COLORS.textMain,
    height: 55,
  },
  uploadBox: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#364156',
    borderStyle: 'dashed',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    fontSize: 40,
    color: COLORS.primaryAction,
    marginBottom: 12,
  },
  uploadTitle: {
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  uploadSubtitle: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: COLORS.primaryAction,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.textMuted,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 16,
    textAlign: 'center',
  },
});
