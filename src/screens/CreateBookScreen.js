import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';
import COLORS from '../theme/colors';
import { ICONS } from '../theme/icons';
import CustomTextInput from '../components/CustomTextInput';
import { useBookForm } from '../hooks/useBookForm';
import { styles } from '../../styles';

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
      <View style={styles.createBookCenterContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryAction} />
      </View>
    );
  }

  // Generate an array of years for the dropdown (e.g. from 1900 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

  return (
    <ScrollView style={styles.createBookContainer} contentContainerStyle={styles.createBookContent}>
      <Text style={styles.createBookHeaderTitle}>New Book</Text>
      <Text style={styles.createBookHeaderSubtitle}>Fill in the info below</Text>
      
      {error && <Text style={styles.createBookErrorText}>{error}</Text>}

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

      <CustomTextInput
        label="Description"
        placeholder="Enter book description"
        multiline={true}
        numberOfLines={4}
        value={formData.description}
        onChangeText={(text) => handleChange('description', text)}
      />

      <View style={styles.createBookPickerContainer}>
        <Text style={styles.createBookLabel}>Status</Text>
        <View style={styles.createBookPickerWrapper}>
          <Picker
            selectedValue={formData.status_id}
            dropdownIconColor="#A0AEC0"
            style={styles.createBookPicker}
            onValueChange={(itemValue) => handleChange('status_id', itemValue)}
          >
            <Picker.Item label="Choose status" value="" color="#1C2431" />
            {options.statuses.map(status => (
              <Picker.Item key={status.id} label={status.name} value={status.id} color="#1C2431" />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.createBookPickerContainer}>
        <Text style={styles.createBookLabel}>Cover Image</Text>
        <TouchableOpacity style={styles.createBookUploadBox} onPress={pickCover} activeOpacity={0.8}>
          {selectedCover ? (
            <Image source={{ uri: selectedCover.uri }} style={styles.createBookCoverPreview} />
          ) : (
            <>
              <SvgXml xml={ICONS.imagePlaceholder} style={styles.createBookUploadIconSvg} />
              <Text style={styles.createBookUploadTitle}>Upload Book Cover</Text>
              <Text style={styles.createBookUploadSubtitle}>Tap to select an image (JPG, PNG)</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.createBookPickerContainer}>
        <Text style={styles.createBookLabel}>PDF Content</Text>
        <TouchableOpacity style={styles.createBookUploadBox} onPress={pickFile} activeOpacity={0.8}>
          <SvgXml xml={ICONS.upArrow} style={styles.createBookUploadIconSvg} />
          <Text style={styles.createBookUploadTitle}>
            {selectedFile ? selectedFile.name : "Upload PDF, EPUB, MOBI File"}
          </Text>
          {!selectedFile && (
            <Text style={styles.createBookUploadSubtitle}>Drag or tap to attach book content</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.createBookSaveButton} 
        onPress={handleSave} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.createBookSaveButtonText}>Create Book</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.createBookCancelButton} 
        onPress={() => navigation.goBack()}
        disabled={loading}
      >
        <Text style={styles.createBookCancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
