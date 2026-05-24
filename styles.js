import { StyleSheet } from "react-native";
import COLORS from "./src/theme/colors";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    width: "100%"
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    width: "100%"
  },

  loadingCard: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 420
  },

  loadingTitle: {
    color: COLORS.textMain,
    fontSize: 46,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center"
  },

  loadingSubtitle: {
    color: COLORS.textMuted,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center"
  },

  loadingText: {
    color: COLORS.primaryAction,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center"
  },

  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    width: "100%"
  },

  tabletScreen: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 520
  },

  centerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center"
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },

  content: {
    padding: 20,
    paddingBottom: 50
  },

  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    width: "100%"
  },

  screenTitle: {
    color: COLORS.textMain,
    fontSize: 28,
    fontWeight: "800"
  },

  sectionTitle: {
    color: COLORS.textMain,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10
  },

  headerTitle: {
    color: COLORS.textMain,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10
  },

  headerSubtitle: {
    color: COLORS.textMuted,
    fontSize: 16,
    marginBottom: 30
  },

  iconButton: {
    alignItems: "center",
    height: 34,
    justifyContent: "center",
    width: 34
  },

  iconButtonText: {
    color: COLORS.textMain,
    fontSize: 24,
    fontWeight: "900"
  },

  listContent: {
    gap: 12,
    paddingBottom: 20,
    width: "100%"
  },

  bookCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    minHeight: 96,
    padding: 14,
    width: "100%"
  },

  bookTitle: {
    color: COLORS.textMain,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8
  },

  bookLine: {
    color: COLORS.textMain,
    fontSize: 14,
    fontWeight: "700"
  },

  bookAuthor: {
    color: COLORS.textMuted,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12
  },

  empty: {
    color: COLORS.textMuted,
    fontSize: 15,
    marginTop: 32,
    textAlign: "center"
  },

  formContent: {
    gap: 12,
    paddingBottom: 22,
    width: "100%"
  },

  field: {
    gap: 6,
    width: "100%"
  },

  fieldLabel: {
    color: COLORS.textMain,
    fontSize: 12,
    fontWeight: "800"
  },

  label: {
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8
  },

  input: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    color: COLORS.textMain,
    fontSize: 14,
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: "100%"
  },

  textArea: {
    minHeight: 86,
    textAlignVertical: "top"
  },

  pickerContainer: {
    marginBottom: 16
  },

  pickerWrapper: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2D3748",
    overflow: "hidden",
    width: "100%"
  },

  picker: {
    color: COLORS.textMain,
    backgroundColor: COLORS.cardBackground,
    height: 55,
    width: "100%"
  },

  uploadBox: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#364156",
    borderStyle: "dashed",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%"
  },

  uploadArea: {
    alignItems: "center",
    borderColor: "#526078",
    borderRadius: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 112,
    padding: 14,
    width: "100%"
  },

  coverPreview: {
    width: 120,
    height: 180,
    borderRadius: 8,
    resizeMode: "cover"
  },

  uploadIcon: {
    fontSize: 40,
    color: COLORS.primaryAction,
    marginBottom: 12
  },

  uploadIconSvg: {
    marginBottom: 12
  },

  uploadTitle: {
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center"
  },

  uploadSubtitle: {
    color: COLORS.textMuted,
    fontSize: 14
  },

  uploadText: {
    color: COLORS.textMain,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 8,
    textAlign: "center"
  },

  primaryButton: {
    alignItems: "center",
    backgroundColor: COLORS.primaryAction,
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 16,
    width: "100%"
  },

  primaryButtonText: {
    color: COLORS.textMain,
    fontWeight: "900"
  },

  saveButton: {
    backgroundColor: COLORS.primaryAction,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16
  },

  saveButtonText: {
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: "bold"
  },

  cancelButton: {
    paddingVertical: 12,
    alignItems: "center"
  },

  cancelButtonText: {
    color: COLORS.textMuted,
    fontSize: 16,
    fontWeight: "bold"
  },

  textButton: {
    alignItems: "center",
    padding: 8
  },

  textButtonLabel: {
    color: COLORS.primaryAction,
    fontWeight: "800"
  },

  deletePill: {
    backgroundColor: "#a9202a",
    borderRadius: 8,
    paddingHorizontal: 22,
    paddingVertical: 8
  },

  deletePillText: {
    color: COLORS.textMain,
    fontSize: 12,
    fontWeight: "900"
  },

  message: {
    color: "#fbbf24",
    fontSize: 13,
    fontWeight: "800"
  },

  errorText: {
    color: "#EF4444",
    marginBottom: 16,
    textAlign: "center"
  },

  topSection: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24
  },

  coverWrapper: {
    width: 110,
    height: 155
  },

  coverImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    backgroundColor: COLORS.cardBackground
  },

  coverPlaceholder: {
    justifyContent: "center",
    alignItems: "center"
  },

  coverPlaceholderText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "bold"
  },

  infoWrapper: {
    flex: 1,
    justifyContent: "center"
  },

  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6
  },

  statusText: {
    fontSize: 13,
    fontWeight: "bold"
  },

  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20
  },

  metaBlock: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 14
  },

  metaLabel: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6
  },

  metaValue: {
    color: COLORS.textMain,
    fontSize: 15,
    fontWeight: "bold"
  },

  descriptionSection: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20
  },

  descriptionText: {
    color: COLORS.textMain,
    fontSize: 14,
    lineHeight: 21
  },

  readButton: {
    backgroundColor: COLORS.primaryAction,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 14
  },

  readButtonText: {
    color: COLORS.textMain,
    fontSize: 16,
    fontWeight: "bold"
  },

  actionRow: {
    flexDirection: "row",
    gap: 12
  },

  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center"
  },

  backButton: {
    backgroundColor: COLORS.cardBackground
  },

  editButton: {
    backgroundColor: COLORS.primaryAction
  },

  backButtonText: {
    color: COLORS.textMain,
    fontSize: 15,
    fontWeight: "bold"
  },

  editButtonText: {
    color: COLORS.textMain,
    fontSize: 15,
    fontWeight: "bold"
  },

  detailWrap: {
    gap: 14,
    paddingBottom: 22,
    width: "100%"
  },

  detailCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    gap: 3,
    padding: 14,
    width: "100%"
  },

  detailTitle: {
    color: COLORS.textMain,
    fontSize: 22,
    fontWeight: "900"
  },

  detailText: {
    color: COLORS.textMain,
    fontSize: 15,
    fontWeight: "700"
  },

  descriptionLabel: {
    color: COLORS.textMain,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 14
  },

  description: {
    color: COLORS.textMain,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14
  },

  pdfName: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12
  },

  footerRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%"
  },

  footerButton: {
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    flex: 1,
    minHeight: 44,
    justifyContent: "center"
  },

  footerButtonAccent: {
    alignItems: "center",
    backgroundColor: COLORS.primaryAction,
    borderRadius: 8,
    flex: 1,
    minHeight: 44,
    justifyContent: "center"
  },

  footerButtonText: {
    color: COLORS.textMain,
    fontWeight: "900"
  }
});