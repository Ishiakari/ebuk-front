import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import COLORS from "../theme/colors";
import { styles } from "../../styles";

export default function BookDetailsScreen({ route, navigation }) {
  const { book } = route.params;

  const getStatusColor = (statusName) => {
    switch (statusName?.toLowerCase()) {
      case "reading":
        return COLORS.statusReading;
      case "completed":
        return COLORS.statusCompleted;
      case "plan to read":
      case "to read":
        return COLORS.statusPlanToRead;
      default:
        return COLORS.statusBorrowed;
    }
  };

  const coverUri = book.cover_image_url || book.cover_image;
  const statusName = book.status?.name || book.status || "Unknown";
  const authorName = book.author?.name || book.author || "Unknown Author";
  const genreName = book.genre?.name || book.genre || "General";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>Book Details</Text>

      <View style={styles.topSection}>
        <View style={styles.coverWrapper}>
          {coverUri ? (
            <Image source={{ uri: coverUri }} style={styles.coverImage} />
          ) : (
            <View style={[styles.coverImage, styles.coverPlaceholder]}>
              <Text style={styles.coverPlaceholderText}>No Cover</Text>
            </View>
          )}
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.bookTitle} numberOfLines={2}>
            {book.title}
          </Text>

          <Text style={styles.bookAuthor}>{authorName}</Text>

          <View style={styles.statusBadge}>
            <Text style={[styles.statusText, { color: getStatusColor(statusName) }]}>
              {statusName}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>Genre</Text>
          <Text style={styles.metaValue}>{genreName}</Text>
        </View>

        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>Date Published</Text>
          <Text style={styles.metaValue}>{book.year || "N/A"}</Text>
        </View>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.metaLabel}>Description</Text>
        <Text style={styles.descriptionText}>
          {book.description || "No description provided."}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.readButton}
        onPress={() => {
          if (book.file?.file_path || book.file_url) {
            navigation.navigate("ReadContent", { book });
          } else {
            Alert.alert(
              "No File",
              "There is no readable document attached to this book."
            );
          }
        }}
      >
        <Text style={styles.readButtonText}>Read Content</Text>
      </TouchableOpacity>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => navigation.navigate("EditBook", { book })}
        >
          <Text style={styles.editButtonText}>Edit File</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}