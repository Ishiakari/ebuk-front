import axios from 'axios';
import { API_URL } from '../../config';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const bookService = {
  getAllBooks: async () => {
    const response = await api.get('/books');
    return response.data;
  },
  
  getBookById: async (id) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  getBook: async (id) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  createBook: async (bookData) => {
    const isFormData = bookData instanceof FormData;
    const response = await api.post('/books', bookData, {
      headers: {
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return response.data;
  },

  updateBook: async (id, bookData) => {
    const isFormData = bookData instanceof FormData;
    // We use POST to /books/{id} instead of PUT for easier multipart/form-data support in Laravel
    const response = await api.post(`/books/${id}`, bookData, {
      headers: {
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return response.data;
  },

  deleteBook: async (id) => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },

  getAuthors: async () => {
    const response = await api.get('/authors');
    return response.data;
  },

  getGenres: async () => {
    const response = await api.get('/genres');
    return response.data;
  },

  getStatuses: async () => {
    const response = await api.get('/statuses');
    return response.data;
  },
};

export default api;
