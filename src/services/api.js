import axios from "axios";
import { API_URL } from "../../config";

const api = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    Accept: "application/json"
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API ERROR MESSAGE:", error.message);
    console.log("API ERROR RESPONSE:", error.response?.data);
    console.log("API ERROR STATUS:", error.response?.status);
    console.log("API ERROR URL:", error.config?.url);
    throw error;
  }
);

async function parseResponse(response) {
  const text = await response.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    console.log("API FETCH ERROR:", data);
    throw data;
  }

  return data;
}

export const bookService = {
  getAllBooks: async () => {
    const response = await api.get("/books");
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
    const response = await fetch(`${API_URL}/books`, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: bookData
    });

    return parseResponse(response);
  },

  updateBook: async (id, bookData) => {
    if (bookData instanceof FormData) {
      bookData.append("_method", "PUT");
    }

    const response = await fetch(`${API_URL}/books/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: bookData
    });

    return parseResponse(response);
  },

  deleteBook: async (id) => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },

  getAuthors: async () => {
    const response = await api.get("/authors");
    return response.data;
  },

  getGenres: async () => {
    const response = await api.get("/genres");
    return response.data;
  },

  getStatuses: async () => {
    const response = await api.get("/statuses");
    return response.data;
  }
};

export default api;