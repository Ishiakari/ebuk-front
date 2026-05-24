import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1f1f1f"
  },

  screen: {
    flex: 1,
    backgroundColor: "#101927",
    paddingHorizontal: 16,
    paddingTop: 10
  },

  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18
  },

  screenTitle: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "800"
  },

  sectionTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10
  },

  iconButton: {
    alignItems: "center",
    height: 34,
    justifyContent: "center",
    width: 34
  },

  iconButtonText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900"
  },

  listContent: {
    gap: 12,
    paddingBottom: 20
  },

  bookCard: {
    backgroundColor: "#25334a",
    borderRadius: 8,
    minHeight: 96,
    padding: 14
  },

  bookTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900"
  },

  bookLine: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700"
  },

  empty: {
    color: "#94a3b8",
    fontSize: 15,
    marginTop: 32,
    textAlign: "center"
  },

  formContent: {
    gap: 12,
    paddingBottom: 22
  },

  field: {
    gap: 6
  },

  fieldLabel: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800"
  },

  input: {
    backgroundColor: "#25334a",
    borderRadius: 8,
    color: "#ffffff",
    fontSize: 14,
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 10
  },

  textArea: {
    minHeight: 86,
    textAlignVertical: "top"
  },

  uploadBox: {
    gap: 8
  },

  uploadArea: {
    alignItems: "center",
    borderColor: "#526078",
    borderRadius: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 112,
    padding: 14
  },

  uploadIcon: {
    color: "#61708a",
    fontSize: 20,
    fontWeight: "900"
  },

  uploadText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 8,
    textAlign: "center"
  },

  primaryButton: {
    alignItems: "center",
    backgroundColor: "#2f6df6",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 16
  },

  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "900"
  },

  textButton: {
    alignItems: "center",
    padding: 8
  },

  textButtonLabel: {
    color: "#4f83ff",
    fontWeight: "800"
  },

  deletePill: {
    backgroundColor: "#a9202a",
    borderRadius: 8,
    paddingHorizontal: 22,
    paddingVertical: 8
  },

  deletePillText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900"
  },

  message: {
    color: "#fbbf24",
    fontSize: 13,
    fontWeight: "800"
  },

  detailWrap: {
    gap: 14,
    paddingBottom: 22
  },

  detailCard: {
    backgroundColor: "#25334a",
    borderRadius: 8,
    gap: 3,
    padding: 14
  },

  detailTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900"
  },

  detailText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700"
  },

  descriptionLabel: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
    marginTop: 14
  },

  description: {
    color: "#ffffff",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14
  },

  pdfName: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12
  },

  footerRow: {
    flexDirection: "row",
    gap: 12
  },

  footerButton: {
    alignItems: "center",
    backgroundColor: "#8c97aa",
    borderRadius: 8,
    flex: 1,
    minHeight: 44,
    justifyContent: "center"
  },

  footerButtonAccent: {
    alignItems: "center",
    backgroundColor: "#526ca8",
    borderRadius: 8,
    flex: 1,
    minHeight: 44,
    justifyContent: "center"
  },

  footerButtonText: {
    color: "#ffffff",
    fontWeight: "900"
  }
});