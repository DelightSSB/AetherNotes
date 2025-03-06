import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const logo = require('./assets/thrivelogo.png');
const menuIcon = require('./assets/menu-icon.png');
const sendIcon = require('./assets/send.png');

export default function App() {
  // Controls the visibility of the sidebar
  const [sidebarVisible, setSidebarVisible] = useState(true);
  // Stores user input from the text field 
  const [textInput, setTextInput] = useState(''); 
  // Stores the list of uploaded files 
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, title: "Report.pdf", date: "Feb 20, 2025, 2:30 PM" },
    { id: 2, title: "Notes.docx", date: "Feb 18, 2025, 11:15 AM" },
    { id: 3, title: "Summary.txt", date: "Feb 15, 2025, 9:45 AM" }
  ]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleTextChange = (text) => {
    setTextInput(text);
  };

  const handleFileUpload = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
      });

      if (doc.type === 'cancel') {
        return;
      }

      const file = doc.assets[0];
      const uploadDoc = {
        id: uploadedFiles.length + 1, // ensure unique IDs
        title: file.name,
        date: new Date().toLocaleString(),
      };

      await axios.post("http://localhost:3000/upload", uploadDoc);
      
      setUploadedFiles(prevFiles => [uploadDoc, ...prevFiles]); // ensure state updates correctly
      alert('File uploaded successfully!');
    } catch (error) {
      console.error("File upload failed:", error);
      alert('Failed to upload the file.');
    }
  };

  return (
    <View style={styles.container}>
      {sidebarVisible && (
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>History</Text>
          <FlatList
            data={uploadedFiles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text style={styles.historyText}>{item.title}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
            )}
          />
        </View>
      )}

      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <Image source={menuIcon} style={styles.menuIcon} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        <Text style={styles.fileTypesText}>Only .PDF, .DOCX, & .TXT files are allowed.</Text>

        <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
          <Text style={styles.uploadButtonText}>UPLOAD A FILE</Text>
        </TouchableOpacity>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter some text here"
            value={textInput}
            onChangeText={handleTextChange}
          />
          <TouchableOpacity style={styles.sendIconContainer}>
            <Image source={sendIcon} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(220, 244, 255)',
  },
  sidebar: {
    width: 250,
    backgroundColor: 'rgba(244, 244, 244, 0.7)',
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  menuIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  textInputContainer: {
    position: 'absolute',
    bottom: 50,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  sendIconContainer: {
    marginLeft: 10,
  },
  sendIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
