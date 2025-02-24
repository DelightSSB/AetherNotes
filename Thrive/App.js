import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

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
    <>
      <Button title="Upload a File" onPress={handleFileUpload} />
      {fileInfo && <Text>Uploaded: {fileInfo.author}</Text>}
    </>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
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
    justifyContent: 'center',
  },
});
