import { useState, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { bookService } from '../services/api';

export function useBookForm() {
  const [formData, setFormData] = useState({
    title: '',
    author_name: '',
    year: '',
    genre_name: '',
    status_id: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const [options, setOptions] = useState({
    statuses: [],
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setInitialLoading(true);
        const [statuses] = await Promise.all([
          bookService.getStatuses(),
        ]);
        setOptions({ statuses });
        
        // Set defaults if available
        setFormData(prev => ({
          ...prev,
          status_id: statuses.length > 0 ? statuses[0].id : '',
        }));
      } catch (err) {
        console.error("Failed to fetch dropdown options:", err);
        setError("Could not load form options.");
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchOptions();
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/epub+zip', 'application/x-mobipocket-ebook'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const submitForm = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Basic validation
      if (!formData.title || !formData.author_name || !formData.genre_name || !formData.status_id) {
        throw new Error("Please fill in all required fields.");
      }

      const submissionData = new FormData();
      submissionData.append('title', formData.title);
      submissionData.append('author_name', formData.author_name);
      submissionData.append('genre_name', formData.genre_name);
      submissionData.append('status_id', formData.status_id);
      if (formData.year) submissionData.append('year', formData.year);
      
      if (selectedFile) {
        submissionData.append('file', {
          uri: selectedFile.uri,
          name: selectedFile.name,
          type: selectedFile.mimeType || 'application/octet-stream',
        });
      }

      await bookService.createBook(submissionData);
      return true; // Success
    } catch (err) {
      setError(err.message || "Failed to create book.");
      return false; // Failed
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    options,
    selectedFile,
    loading,
    initialLoading,
    error,
    handleChange,
    pickFile,
    submitForm
  };
}
