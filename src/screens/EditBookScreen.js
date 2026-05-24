import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';
import COLORS from '../theme/colors';
import { ICONS } from '../theme/icons';
import CustomTextInput from '../components/CustomTextInput';
import { useBookForm } from '../hooks/useBookForm';
import { bookService } from '../services/api';
import { styles } from '../../styles';

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
      <View style={styles.editBookCenterContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryAction} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.editBookContainer} contentContainerStyle={styles.editBookContent}>
      <View style={styles.editBookHeaderRow}>
        <Text style={styles.editBookHeaderTitle}>Edit Book</Text>
        <TouchableOpacity style={styles.editBookDeleteButton} onPress={handleDelete}>
          <SvgXml xml={ICONS.trash} />
          <Text style={styles.editBookDeleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      
      {error && <Text style={styles.editBookErrorText}>{error}</Text>}

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

      <View style={styles.editBookPickerContainer}>
        <Text style={styles.editBookLabel}>Status</Text>
        <View style={styles.editBookPickerWrapper}>
          <Picker
            selectedValue={formData.status_id}
            dropdownIconColor="#A0AEC0"
            style={styles.editBookPicker}
            onValueChange={(itemValue) => handleChange('status_id', itemValue)}
          >
            <Picker.Item label="Choose status" value="" color="#1C2431" />
            {options.statuses.map(status => (
              <Picker.Item key={status.id} label={status.name} value={status.id} color="#1C2431" />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.editBookPickerContainer}>
        <Text style={styles.editBookLabel}>Cover Image</Text>
        <TouchableOpacity style={styles.editBookUploadBox} onPress={pickCover} activeOpacity={0.8}>
          {selectedCover ? (
            <Image source={{ uri: selectedCover.uri }} style={styles.editBookCoverPreview} />
          ) : (
            <>
              <SvgXml xml={ICONS.imagePlaceholder} style={styles.editBookUploadIconSvg} />
              <Text style={styles.editBookUploadTitle}>Upload Book Cover</Text>
              <Text style={styles.editBookUploadSubtitle}>Tap to select an image (JPG, PNG)</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.editBookPickerContainer}>
        <View style={styles.editBookFileBox}>
          <View style={styles.editBookFileBoxContent}>
            <Text style={styles.editBookFileLabel}>PDF attached</Text>
            <Text style={styles.editBookFileName}>
              {selectedFile ? (selectedFile.name || selectedFile.file_path?.split('/').pop()) : "No file attached"}
            </Text>
          </View>
          <TouchableOpacity style={styles.editBookReplaceButton} onPress={pickFile}>
            <Text style={styles.editBookReplaceButtonText}>Replace</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.editBookSaveButton} 
        onPress={handleSave} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.editBookSaveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.editBookCancelButton} 
        onPress={() => navigation.goBack()}
        disabled={loading}
      >
        <Text style={styles.editBookCancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
