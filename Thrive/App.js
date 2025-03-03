import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const logo = require('./assets/thrivelogo.png');
const menuIcon = require('./assets/menu-icon.png'); // Your menu icon file
const sendIcon = require('./assets/send.png'); // Your send icon file

function UploadButton() {
  const [fileInfo, setFileInfo] = useState(null);
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
        title: file.name,
        client: "TestClient",
        author: file.name, 
        participants: "TestParticipants",
        date: new Date(),
        notes: file,
      };

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
  const [sidebarVisible, setSidebarVisible] = useState(true); // State to track sidebar visibility
  const [textInput, setTextInput] = useState(''); // State to track text input value

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleTextChange = (text) => {
    setTextInput(text);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      {sidebarVisible && (
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
      )}

      {/* Main Content */}
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <Image source={menuIcon} style={styles.menuIcon} />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        {/* Centered text */}
        <Text style={styles.fileTypesText}>Only .PDF, .DOCX, & .TXT files are allowed.</Text>

        {/* Upload Button centered */}
        <UploadButton />

        {/* Text Input and Send Icon */}
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
    flexDirection: 'row', // sidebar + main container
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
    justifyContent: 'center', // Center elements vertically
    alignItems: 'center', // Center elements horizontally
    paddingBottom: 20, // Space for text input at the bottom
    position: 'relative', // To allow positioning of the text input container
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20, // Space between logo and text
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
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1000,
  },
  menuIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textInputContainer: {
    position: 'absolute',
    bottom: 50, // Adjust this value to move the input up or down
    width: '80%',
    flexDirection: 'row', // Align text input and send icon horizontally
    alignItems: 'center',
  },
  textInput: {
    flex: 1, // This ensures the text input takes up all available space
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  sendIconContainer: {
    marginLeft: 10, // Space between the text input and the send icon
  },
  sendIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
