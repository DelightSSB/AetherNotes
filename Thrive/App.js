import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
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
      <Image source={logo} style={styles.logo} />
      <UploadButton />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  uploadButton:{
    position: 'absolute',
    bottom: 30,
    left: "50%",
    transform: [{ translateX: -75 }],
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText:{
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
});
