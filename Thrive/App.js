import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import styles from './styles'


const logo = require('./assets/thrivelogo.png');
const menuIcon = require('./assets/menu-icon.png'); // sidebar menu icon
const sendIcon = require('./assets/send.png');      // text box icon

export default function App() {
  // controls the visibility of the sidebar
  const [sidebarVisible, setSidebarVisible] = useState(true);
  // stores user input from the text field 
  const [textInput, setTextInput] = useState(''); 
  // stores the list of uploaded files 
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, title: "Report.pdf", date: "Feb 20, 2025, 2:30 PM" },
    { id: 2, title: "Notes.docx", date: "Feb 18, 2025, 11:15 AM" },
    { id: 3, title: "Summary.txt", date: "Feb 15, 2025, 9:45 AM" }
  ]);

  const [newChat, createNewChat] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const makeNewChat = () => {
    createNewChat(!newChat);
  };

  const handleTextChange = async (text) => {
   llama2
    setTextInput(text);

    // send the document to the backend
    await axios.post("http://localhost:3000/query", text); 
  };

  const handleFileUpload = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
      });

      if (doc.type === 'cancel') {
        return;
      }
      console.log(doc)
      // uploading files 
      const file = doc.assets[0];
      // extract text from txt
      const b64Text = file.uri.slice(23);
      console.log(b64Text.slice(23));
      const cleanText = atob(b64Text);

      const uploadDoc = {
        id: uploadedFiles.length + 1, // ensure unique IDs
        title: file.name,
        date: new Date().toLocaleString(),
        notes: cleanText,
      };

      // send the document to the backend
      await axios.post("http://localhost:3000/upload", uploadDoc);
      
      setUploadedFiles(prevFiles => [uploadDoc, ...prevFiles]); // ensure state updates correctly
      alert('File uploaded successfully!');
    } catch (error) {
      console.error("File upload failed:", error);
      alert('Failed to upload the file.');
    }
  };

  return (

    // Start of code to build sidebar

    <View style={styles.container}>
      {sidebarVisible && (
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>History</Text>

          {/*Code for "new chat" buttons */}
          <TouchableOpacity style={styles.newChatButton} onPress={makeNewChat}>
          <Text style={styles.newChatButtonText}>New Notes Summary</Text>
        </TouchableOpacity>

        

        

          <FlatList
          // flatlist takes upLoadedFiles (array of objects)
          // each object is a file with properties id, title, date 
            data={uploadedFiles}
            // each item requires a unique string (#)
            keyExtractor={(item) => item.id.toString()}
            // render each item from the list 
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

        {/*View that's shown when the "new chat" button is pressed */}
      <View>
        {newChat && (
        <View style={styles.newChatScreen}>
          <Text style={styles.newChatText}>Choose to manually insert notes or upload a file</Text>
          <TouchableOpacity style={styles.manualNotes}>
          <Text style={styles.uploadButtonText}>MANUAL NOTES INPUT</Text>
            </TouchableOpacity>

          <TouchableOpacity style={styles.manualNotes} onPress={handleFileUpload}>
          <Text style={styles.uploadButtonText}>UPLOAD A FILE</Text>
            </TouchableOpacity>
        </View>
        )}
      </View>

        {/* sidebar menu button to toggle visibility */}
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <Image source={menuIcon} style={styles.menuIcon} />
        </TouchableOpacity>

        {!newChat && (
        <View>
          {/* logo container */}
          <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          </View>

          {/* text indicating allowed file types */}
          <Text style={styles.fileTypesText}>Only .PDF, .DOCX, & .TXT files are allowed.</Text>

          {/* button for file upload */}
          <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
            <Text style={styles.uploadButtonText}>UPLOAD A FILE</Text>
          </TouchableOpacity>
        </View>
        )}

        {/* text input field to enter user input */}
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter some text here"
            value={textInput}
            onChangeText={handleTextChange} // updates the text input value in the state
          />
          {/* send icon button next to the text input box */}
          <TouchableOpacity style={styles.sendIconContainer}>
            <Image source={sendIcon} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
        {/*auto prop adjusts the status bar styling based on the background of the screen*/}
        <StatusBar style="auto" />
      </View>
    </View>
  );

  
}