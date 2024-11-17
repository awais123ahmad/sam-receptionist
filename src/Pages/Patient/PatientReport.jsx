import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/logo.png";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
    paddingBottom: 10,
  },
  logo: { width: 40, height: 40 },
  title: { fontSize: 16, fontWeight: "bold" },
  section: { marginBottom: 10 },
  sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  text: { lineHeight: 1.5 },
  table: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  tableRowLast: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderColor: "#000",
    fontSize: 12,
  },
  tableCellLast: {
    flex: 1,
    padding: 5,
    fontSize: 12,
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  leftColumn: {
    width: "30%",
    paddingRight: 10,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  rightColumn: {
    width: "70%",
    paddingLeft: 10,
  },
});

const PatientReport = ({ patient }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={styles.logo} src={logo} />
          <Text style={styles.title}>MIT Medical Health Screening</Text>
        </View>
        <View>
          <Text>11/16/2024</Text>
          <Text>Fee: $200</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patient: {patient.full_name || "John Doe"}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Age</Text>
          <Text style={styles.tableCell}>{patient.age || "35"}</Text>
          <Text style={styles.tableCell}>Gender</Text>
          <Text style={styles.tableCellLast}>{patient.gender || "Male"}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Blood Type</Text>
          <Text style={styles.tableCell}>{patient.blood_type || "O+"}</Text>
          <Text style={styles.tableCell}>Address</Text>
          <Text style={styles.tableCellLast}>
            {patient.address || "123 Main St, Cityville"}
          </Text>
        </View>
        <View style={styles.tableRowLast}>
          <Text style={styles.tableCell}>Phone</Text>
          <Text style={styles.tableCell}>{patient.phone || "(555) 123-4567"}</Text>
          <Text style={styles.tableCell}>Email</Text>
          <Text style={styles.tableCellLast}>
            {patient.email || "john.doe@email.com"}
          </Text>
        </View>
      </View>

      <View style={styles.contentRow}>
        <View style={styles.leftColumn}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>History</Text>
            <Text style={styles.text}>
              {patient.history ||
                "Patient has a history of chronic migraines and hypertension. Previous treatments included lifestyle changes and prescribed medications."}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Diagnose</Text>
            <Text style={styles.text}>
              {patient.diagnosis ||
                "Recent tests indicate signs of mild anemia and elevated blood pressure levels. Further diagnostic imaging recommended."}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommendation</Text>
            <Text style={styles.text}>
              {patient.recommendation ||
                "- Begin a low-sodium diet.\n- Continue current blood pressure medication.\n- Schedule follow-up in two weeks.\n- Consider iron supplements as advised."}
            </Text>
          </View>
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Treatment Recommendation</Text>
            <Text style={styles.text}>
              {patient.treatment_recommendation ||
                "- Begin a low-sodium diet.\n- Continue current blood pressure medication.\n- Schedule follow-up in two weeks.\n- Consider iron supplements as advised."}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PatientReport;
