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
  Text,
  TextInput,
  View
} from "react-native";
import { styles } from "./styles";

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

  function openCreate() {
    resetForm();
    setScreen("create");
  }

  function openEdit(book) {
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      year: book.year,
      status: book.status,
      description: book.description,
      pdf: book.pdf
    });

    setEditingId(book.id);
    setSelectedId(book.id);
    setMessage("");
    setScreen("edit");
  }

  function saveBook() {
    if (!form.title.trim() || !form.author.trim()) {
      setMessage("Title and author are required.");
      return;
    }

    const existing = books.find((book) => book.id === editingId);

    const savedBook = {
      id: editingId ?? String(Date.now()),
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre.trim(),
      year: form.year.trim(),
      status: form.status.trim() || "Reading",
      description: form.description.trim(),
      pdf: form.pdf,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setBooks((current) =>
      editingId
        ? current.map((book) => (book.id === editingId ? savedBook : book))
        : [...current, savedBook]
    );

    setSelectedId(savedBook.id);
    resetForm();
    setScreen("home");
  }

  function confirmDelete(book) {
    Alert.alert("Delete book?", `Remove "${book.title}" from your library?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteBook(book)
      }
    ]);
  }

  async function deleteBook(book) {
    setBooks((current) => current.filter((item) => item.id !== book.id));

    if (book.pdf?.uri) {
      await FileSystem.deleteAsync(book.pdf.uri, { idempotent: true }).catch(
        () => {}
      );
    }

    resetForm();
    setSelectedId(null);
    setScreen("home");
  }

  async function openPdf(book) {
    if (!book?.pdf?.uri) {
      setMessage("No PDF file is attached to this book.");
      return;
    }

    const available = await Sharing.isAvailableAsync();

    if (available) {
      await Sharing.shareAsync(book.pdf.uri, {
        mimeType: "application/pdf",
        dialogTitle: book.title,
        UTI: "com.adobe.pdf"
      });
    } else {
      setMessage("This device cannot open the PDF directly.");
    }
  }

  function openDetails(book) {
    setSelectedId(book.id);
    setMessage("");
    setScreen("details");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {screen === "home" && (
        <HomeScreen
          books={sortedBooks}
          message={message}
          onAdd={openCreate}
          onSelect={openDetails}
        />
      )}

      {screen === "create" && (
        <BookForm
          mode="create"
          form={form}
          message={message}
          onChange={updateForm}
          onPickPdf={pickPdf}
          onSave={saveBook}
          onCancel={() => {
            resetForm();
            setScreen("home");
          }}
        />
      )}

      {screen === "edit" && (
        <BookForm
          mode="edit"
          form={form}
          message={message}
          onChange={updateForm}
          onPickPdf={pickPdf}
          onDelete={() => selectedBook && confirmDelete(selectedBook)}
          onSave={saveBook}
          onCancel={() => {
            resetForm();
            setScreen(selectedBook ? "details" : "home");
          }}
        />
      )}

      {screen === "details" && (
        <BookDetails
          book={selectedBook}
          message={message}
          onBack={() => setScreen("home")}
          onEdit={() => selectedBook && openEdit(selectedBook)}
          onRead={() => openPdf(selectedBook)}
        />
      )}
    </SafeAreaView>
  );
}

function HomeScreen({ books, message, onAdd, onSelect }) {
  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Text style={styles.screenTitle}>Home</Text>

        <Pressable style={styles.iconButton} onPress={onAdd}>
          <Text style={styles.iconButtonText}>+</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Book List</Text>

      {!!message && <Text style={styles.message}>{message}</Text>}

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.empty}>No books yet. Tap + to add one.</Text>
        }
        renderItem={({ item }) => (
          <Pressable style={styles.bookCard} onPress={() => onSelect(item)}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookLine}>{item.author}</Text>
            <Text style={styles.bookLine}>Status : {item.status}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

function BookForm({
  mode,
  form,
  message,
  onChange,
  onPickPdf,
  onDelete,
  onSave,
  onCancel
}) {
  const isEdit = mode === "edit";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <View style={styles.topBar}>
        <Text style={styles.screenTitle}>
          {isEdit ? "Edit Book" : "Create Book"}
        </Text>

        {isEdit && (
          <Pressable style={styles.deletePill} onPress={onDelete}>
            <Text style={styles.deletePillText}>Delete</Text>
          </Pressable>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.formContent}>
        <Field
          label="Title"
          placeholder="Enter Book Title"
          value={form.title}
          onChangeText={(value) => onChange("title", value)}
        />

        <Field
          label="Author"
          placeholder="Enter Author Name"
          value={form.author}
          onChangeText={(value) => onChange("author", value)}
        />

        <Field
          label="Genre"
          placeholder="Enter Genre"
          value={form.genre}
          onChangeText={(value) => onChange("genre", value)}
        />

        <Field
          label="Year"
          placeholder="Enter Publication Year"
          keyboardType="number-pad"
          value={form.year}
          onChangeText={(value) => onChange("year", value)}
        />

        <Field
          label="Status"
          placeholder="Select Status"
          value={form.status}
          onChangeText={(value) => onChange("status", value)}
        />

        <Field
          label="Description"
          placeholder="Enter book description"
          multiline
          value={form.description}
          onChangeText={(value) => onChange("description", value)}
        />

        <View style={styles.uploadBox}>
          <Text style={styles.fieldLabel}>Book Content</Text>

          <Pressable style={styles.uploadArea} onPress={onPickPdf}>
            <Text style={styles.uploadIcon}>PDF</Text>
            <Text style={styles.uploadText}>
              {form.pdf?.name ?? "Tap to upload pdf file"}
            </Text>
          </Pressable>
        </View>

        {!!message && <Text style={styles.message}>{message}</Text>}

        <Pressable style={styles.primaryButton} onPress={onSave}>
          <Text style={styles.primaryButtonText}>
            {isEdit ? "Update and Save" : "Save Book"}
          </Text>
        </Pressable>

        <Pressable style={styles.textButton} onPress={onCancel}>
          <Text style={styles.textButtonLabel}>Cancel</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function BookDetails({ book, message, onBack, onEdit, onRead }) {
  if (!book) {
    return (
      <View style={styles.screen}>
        <Text style={styles.screenTitle}>Book Content</Text>
        <Text style={styles.empty}>This book could not be found.</Text>

        <Pressable style={styles.footerButton} onPress={onBack}>
          <Text style={styles.footerButtonText}>Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.detailWrap}>
      <Text style={styles.screenTitle}>Book Content</Text>

      {!!message && <Text style={styles.message}>{message}</Text>}

      <View style={styles.detailCard}>
        <Text style={styles.detailTitle}>{book.title}</Text>
        <Text style={styles.detailText}>Author {book.author}</Text>
        <Text style={styles.detailText}>Genre : {book.genre || "None"}</Text>
        <Text style={styles.detailText}>
          Date Published : {book.year || "N/A"}
        </Text>
        <Text style={styles.detailText}>Status : {book.status}</Text>

        <Text style={styles.descriptionLabel}>Description :</Text>
        <Text style={styles.description}>
          {book.description || "No description added yet."}
        </Text>

        <Text style={styles.pdfName}>
          {book.pdf?.name ? `PDF : ${book.pdf.name}` : "No PDF attached"}
        </Text>

        <Pressable style={styles.primaryButton} onPress={onRead}>
          <Text style={styles.primaryButtonText}>Read Content</Text>
        </Pressable>
      </View>

      <View style={styles.footerRow}>
        <Pressable style={styles.footerButton} onPress={onBack}>
          <Text style={styles.footerButtonText}>Back</Text>
        </Pressable>

        <Pressable style={styles.footerButtonAccent} onPress={onEdit}>
          <Text style={styles.footerButtonText}>Edit File</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function Field({ label, multiline, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>

      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        placeholderTextColor="#7b879b"
        multiline={multiline}
        {...props}
      />
    </View>
  );
}