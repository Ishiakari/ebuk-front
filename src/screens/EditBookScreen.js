import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';
import COLORS from '../theme/colors';
import { ICONS } from '../theme/icons';
import CustomTextInput from '../components/CustomTextInput';
import { useBookForm } from '../hooks/useBookForm';
import { bookService } from '../services/api';

export default function EditBookScreen({ route, navigation }) {
  const { book } = route.params;
  const { formData, options, selectedFile, selectedCover, loading, initialLoading, error, handleChange, pickFile, pickCover, submitForm } = useBookForm(book);

  const handleSave = async () => {
    const success = await submitForm();
    if (success) {
      // Need to go back to Home (or refresh BookDetails)
      navigation.navigate('Home');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Book",
      "Are you sure you want to delete this book? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              await bookService.deleteBook(book.id);
              navigation.navigate('Home');
            } catch (err) {
              Alert.alert("Error", "Failed to delete book");
            }
          }
        }
      ]
    );
  };

  if (initialLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryAction} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Edit Book</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <SvgXml xml={ICONS.trash} />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      
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
        placeholder="Enter genre (e.g. Software, Self-help)"
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

      <CustomTextInput
        label="Description"
        placeholder="Enter book description"
        multiline={true}
        numberOfLines={4}
        value={formData.description}
        onChangeText={(text) => handleChange('description', text)}
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
          {selectedCover ? (
            <Image source={{ uri: selectedCover.uri }} style={styles.coverPreview} />
          ) : (
            <>
              <SvgXml xml={ICONS.imagePlaceholder} style={styles.uploadIconSvg} />
              <Text style={styles.uploadTitle}>Upload Book Cover</Text>
              <Text style={styles.uploadSubtitle}>Tap to select an image (JPG, PNG)</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.pickerContainer}>
        <View style={styles.fileBox}>
          <View style={styles.fileBoxContent}>
            <Text style={styles.fileLabel}>PDF attached</Text>
            <Text style={styles.fileName}>
              {selectedFile ? (selectedFile.name || selectedFile.file_path?.split('/').pop()) : "No file attached"}
            </Text>
          </View>
          <TouchableOpacity style={styles.replaceButton} onPress={pickFile}>
            <Text style={styles.replaceButtonText}>Replace</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={handleSave} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  headerTitle: {
    color: COLORS.textMain,
    fontSize: 32,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#991B1B', // Dark red background
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 6,
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
  coverPreview: {
    width: 120,
    height: 180,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  uploadIconSvg: {
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
  fileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#364156',
    padding: 20,
  },
  fileBoxContent: {
    flex: 1,
  },
  fileLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  fileName: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  replaceButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#364156',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  replaceButtonText: {
    color: '#38BDF8', // Light blue
    fontWeight: 'bold',
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
