import { useState, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { bookService } from '../services/api';

export function useBookForm(initialBook = null) {
  const [formData, setFormData] = useState({
    title: initialBook?.title || '',
    author_name: initialBook?.author || '',
    year: initialBook?.year || '',
    genre_name: initialBook?.genre || '',
    status_id: initialBook?.status_id || '',
    description: initialBook?.description || '',
  });

  const [selectedFile, setSelectedFile] = useState(initialBook?.file || null);
  const [selectedCover, setSelectedCover] = useState(
    initialBook?.cover_image ? { uri: initialBook.cover_image, isExisting: true } : null
  );

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

  const pickCover = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/jpeg', 'image/png', 'image/jpg'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedCover(result.assets[0]);
      }
    } catch (err) {
      console.error("Error picking cover:", err);
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
      if (formData.description) submissionData.append('description', formData.description);
      
      if (selectedFile && !selectedFile.file_path) {
        submissionData.append('file', {
          uri: selectedFile.uri,
          name: selectedFile.name || 'file.pdf',
          type: selectedFile.mimeType || 'application/pdf',
        });
      }

      if (selectedCover && !selectedCover.isExisting) {
        submissionData.append('cover_image', {
          uri: selectedCover.uri,
          name: selectedCover.name || 'cover.jpg',
          type: selectedCover.mimeType || 'image/jpeg',
        });
      }

      if (initialBook && initialBook.id) {
        await bookService.updateBook(initialBook.id, submissionData);
      } else {
        await bookService.createBook(submissionData);
      }
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
    selectedCover,
    loading,
    initialLoading,
    error,
    handleChange,
    pickFile,
    pickCover,
    submitForm
  };
}
