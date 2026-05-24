import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

const STORAGE_KEY = "EBUK_BOOKS";

const emptyForm = {
  title: "",
  author: "",
  genre: "",
  year: "",
  status: "",
  description: "",
  pdf: null
};

export default function App() {
  const [books, setBooks] = useState([]);
  const [screen, setScreen] = useState("home");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(books)).catch(() => {
      setMessage("Unable to save your library.");
    });
  }, [books]);

  const sortedBooks = useMemo(
    () => [...books].sort((a, b) => a.title.localeCompare(b.title)),
    [books]
  );

  const selectedBook = books.find((book) => book.id === selectedId);

  async function loadBooks() {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setBooks(JSON.parse(saved));
    } catch {
      setMessage("Unable to load your library.");
    }
  }

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function pickPdf() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true
      });

      if (result.canceled) return;

      const file = result.assets[0];
      const safeName = file.name.replace(/[^\w.-]/g, "_");
      const localUri = `${FileSystem.documentDirectory}${Date.now()}-${safeName}`;

      await FileSystem.copyAsync({ from: file.uri, to: localUri });

      updateForm("pdf", {
        name: file.name,
        uri: localUri,
        size: file.size ?? null
      });
      setMessage("PDF file attached.");
    } catch {
      setMessage("PDF upload failed. Please try another file.");
    }
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");

  }
}