import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView, TextInput} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const logo = require('./assets/thrivelogo.png');

//const fileUpload = require("./components/fileUpload")

function UploadButton() {
  const [fileInfo, setFileInfo] = useState(null);
  const handleFileUpload = async () => {
    try {
      // Step 1: Pick a file
      const doc = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
      });

      if (doc.type === 'cancel') {
        return;
      }
      console.log(doc)

      // For uploading files
      const file = doc.assets[0];
      const uploadDoc = {
        title: file.name,
        client: "TestClient",
        author: file.name, 
        participants: "TestParticipants",
        date: new Date(),
        notes: file,
        };

      // Step 4: Send the document to the backend
      await axios.post("http://localhost:3000/upload", uploadDoc);

      setFileInfo(uploadDoc);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error("File upload failed:", error);
      alert('Failed to upload the file.');
    }
  };
  return (
    <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
      <Text style={styles.uploadButtonText}>UPLOAD A FILE</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <Text style={styles.sidebarTitle}>History</Text>
        <FlatList
          data={[
            { title: "Report.pdf", date: "Feb 20, 2025, 2:30 PM" },
            { title: "Notes.docx", date: "Feb 18, 2025, 11:15 AM" },
            { title: "Summary.txt", date: "Feb 15, 2025, 9:45 AM" },
            { title: "Report.pdf", date: "Feb 20, 2025, 2:30 PM" },
            { title: "Notes.docx", date: "Feb 18, 2025, 11:15 AM" },
            { title: "Summary.txt", date: "Feb 15, 2025, 9:45 AM" },
            { title: "Report.pdf", date: "Feb 20, 2025, 2:30 PM" },
            { title: "Notes.docx", date: "Feb 18, 2025, 11:15 AM" },
            { title: "Summary.txt", date: "Feb 15, 2025, 9:45 AM" },
            { title: "Report.pdf", date: "Feb 20, 2025, 2:30 PM" },
            { title: "Notes.docx", date: "Feb 18, 2025, 11:15 AM" },
            { title: "Summary.txt", date: "Feb 15, 2025, 9:45 AM" },
            { title: "Report.pdf", date: "Feb 20, 2025, 2:30 PM" },
            { title: "Notes.docx", date: "Feb 18, 2025, 11:15 AM" },
            { title: "Summary.txt", date: "Feb 15, 2025, 9:45 AM" },
            { title: "Report.pdf", date: "Feb 20, 2025, 2:30 PM" },
            { title: "Notes.docx", date: "Feb 18, 2025, 11:15 AM" },
            { title: "Summary.txt", date: "Feb 15, 2025, 9:45 AM" },
            { title: "Report.pdf", date: "Feb 20, 2025, 2:30 PM" },
            { title: "Notes.docx", date: "Feb 18, 2025, 11:15 AM" },
            { title: "Summary.txt", date: "Feb 15, 2025, 9:45 AM" },
            { title: "Report.pdf", date: "Feb 20, 2025, 2:30 PM" },
            { title: "Notes.docx", date: "Feb 18, 2025, 11:15 AM" },
            { title: "Summary.txt", date: "Feb 15, 2025, 9:45 AM" },
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.historyText}>{item.title}</Text>
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
          )}
        />
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <Text style={styles.fileTypesText}>Only .PDF, .DOCX, & .TXT files are allowed.</Text>
        <UploadButton />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Sidebar + Main Content
    backgroundColor: '#fff',
  },
  sidebar: {
    width: 250,
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  historyText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  historyDate: {
    fontSize: 12,
    color: '#666',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  logoContainer: {
    position: 'absolute',
    top: 10,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
  },
  fileTypesText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  uploadButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
