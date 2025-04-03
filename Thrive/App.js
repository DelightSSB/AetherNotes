import "@expo/metro-runtime";
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import styles from './styles'
import ChatBox from "./components/chatBox";
import { set } from 'mongoose';
import { Picker } from '@react-native-picker/picker';



const logo = require('./assets/thrivelogo.png');
const menuIcon = require('./assets/menu-icon.png'); // sidebar menu icon
const sendIcon = require('./assets/send.png');      // text box icon

export default function App() {
  // controls the visibility of the sidebar
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // stores user input from the text field 
  const [textInput, setTextInput] = useState(""); // State for the text input
  // stores messages for chatBox
  const[messages, setMessages] = useState([]);

   //pop up visibility and input state
  const[companyModalVisible, setCompanyModalVisible] = useState(false);
  // Company name storage for backend assignment
  const [companyName, setCompanyName] = useState('');

  //Chats as usestates
  const [chatHistory, setChatHistory] = useState([]); // All chats in history
  const [activeChatId, setActiveChatId] = useState(null); // Current chat being viewed

  //View for new chat
  const [newChatView, setNewChatView] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Creates a new chat. Defaults chat ID to length of history, gives the new chat a title, and records the time the chat was made
  const makeNewChat = () => {
    const chatID = chatHistory.length + 1;
    const newChat = {
      id: chatID,
      title: `Chat ${chatID}`, //variable to be updated when the popup menu is implemented
      timestamp: new Date().toLocaleString(),
      summaryResponse: "",
    }; //Creates a new chat object with a unique ID, a title to view on the sidebar, and date on when it was created (saved as a string) 
    
    setChatHistory([newChat, ...chatHistory]); //Adds this newChat object to the chatHistory array (This adds this chat to the beginning of the array rather than the end)
    setActiveChatId(chatID); //Sets the active chat to the one just created, ensures the new chat you're editing is the newest one created assuming you stay in the chat
    setNewChatView(true); //Ensures the view is automatically changed when the button is pressed
  };

  const summaryReturn = async (text) => {
    try {
        const response = await axios.post("http://localhost:3000/summary", {
            text: text 
        });

        //Stores the response as a variable
        const aiResponse = "Response:"+ response.data.choices[0].message.content
        // console.log("Response:", response.data.choices[0].message.content); // this is the responce from the AI. It is formatted in markdown

        //Stores ai summary response as the active chat's variable, this is immutably changed so an update should be automatic
        setChatHistory(prev => 
          prev.map(chat => 
            chat.id === activeChatId?
            {...chat, summaryResponse: aiResponse}
            : chat
          )
        )
    } catch (error) {
        console.error("Error sending summary request:", error);
    }
 };
 

  const handleTextChange = async () => {

  }

  //show pop up instead of immediate upload
  const handleFileUpload = () => {
    setCompanyModalVisible(true);
  };

  //upload after company name is submitted
  const handleCompanySubmit = async () => {
    setCompanyModalVisible(false);
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
      });
      if (doc.type === 'cancel') {
        return;
      }


      const file = doc.assets[0];
      let cleanText;
      let fileType;

      
      // switch case for doc types
      switch(file.mimeType){
        case "text/plain":
          const b64Text = file.uri.slice(23);
          cleanText = atob(b64Text);
          break;
        case "application/pdf":
          cleanText = doc;
          fileType = "PDF"
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          cleanText = doc;
          fileType = "docx"
          break;
      }

      const uploadDoc = {
        id: 10, 
        title: file.name,
        client: companyName,
        date: new Date().toLocaleString(),
        notes: cleanText,
      };
      console.log(uploadDoc)

      summaryReturn(cleanText)
      // send the document to the backend
      await axios.post("http://localhost:3000/upload", uploadDoc);

      alert('File uploaded successfully!');
      setCompanyName(''); //reset company after submission
    } catch (error) {
      console.error("File upload failed:", error);
      alert('Failed to upload the file.');
    }
  };

  return (
    <View style={styles.container}>

      {/* Start of building the sidebar */}
      {sidebarVisible && (
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>History</Text>

          {/*Code for "new chat" buttons */}
          <TouchableOpacity style={styles.newChatButton} onPress={makeNewChat}>
          <Text style={styles.newChatButtonText}>New Notes Summary</Text>
        </TouchableOpacity>

        
        <FlatList
          //This flatlist takes in the array chatHistory which is story the chats created
          // each object is a file with properties id, title, and timestamp 
            data={chatHistory}

            // each item requires a unique string (#)
            keyExtractor={(item) => item.id.toString()}

            // renders each items from the chatHistory array and makes them a button to be used to restore their history
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={() => {
                setActiveChatId(item.id);
                setNewChatView(false)
              }}>
                {/* Displays the title and the date it was created */}
              <View style={styles.historyItem}>
                <Text style={styles.historyText}>{item.title}</Text>
                <Text style={styles.historyDate}>Created on {item.timestamp}</Text>
              </View>
              </TouchableOpacity>
            )}
          />
          {/* End of building sidebar */}
        </View>
      )}

      {/* Popup that is to show when a file is attempted to be uploaded */}
      {companyModalVisible && (
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>What is your company?</Text>
                <Picker
        selectedValue={companyName}
        style={styles.picker}
        onValueChange={(itemValue) => setCompanyName(itemValue)}
      >
        <Picker.Item label="Select Company" value="" />  {/* Default option */}
        <Picker.Item label="Company 1" value="Company 1" />
        <Picker.Item label="Company 2" value="Company 2" />
        <Picker.Item label="Company 3" value="Company 3" />
      </Picker>
                <TouchableOpacity style={styles.modalButton} onPress={handleCompanySubmit}>
                  <Text style={styles.modalButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

      
      {/* Start of main view that is displayed */}
      <View style={styles.mainContent}> 


      {/* This view is displayed when the user first loads the page */}
      <View>{newChatView==null && (
        <View>
  
        <Text style={[styles.thirdText, { textAlign: 'center'}, {justifyContent: "flex-start"}, {paddingTop: 1}, {paddingBottom: 1}]}>
          Chat ID: None
          </Text>
        <Text style={[styles.standardText, { textAlign: 'center'}, {justifyContent: "flex-start"}, {paddingTop: 1}]}>
          Press "New Notes Summary" to create a chat!
        </Text>
        </View>
      )}
      </View>


      {/*newChat == true */}
      <View>
        {newChatView==true && (
        <View>
          {/* To display the current chat the user is looking in (for testing) */}
          <Text style={[styles.thirdText, { textAlign: 'center'}, {justifyContent: "flex-start"}, {paddingTop: 1}]}>
            New Chat ID: {activeChatId}
            </Text>

          {/* logo container */}
          <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          </View>

          {/* text indicating allowed file types */}
          <Text style={styles.thirdText}>Only .PDF, .DOCX, & .TXT files are allowed.</Text>

          {/* button for file upload */}
          <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
            <Text style={styles.uploadButtonText}>UPLOAD A FILE</Text>
          </TouchableOpacity>
          <ChatBox messages={messages} />
        </View>
        )}
      </View>


      {/* newChat == false */}
      {newChatView==false && (
        <View>
          {/* To display the current chat the user is looking in (for testing) */}
          <Text style={[styles.thirdText, { textAlign: 'center'}, {paddingTop: 1},]}>
            This is an old chat with ID: {activeChatId}
            </Text>

          {/* logo container */}
          <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          </View>

          {/* text indicating allowed file types */}
          <Text style={styles.thirdText}>Only .PDF, .DOCX, & .TXT files are allowed.</Text>

          {/* button for file upload */}
          <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
            <Text style={styles.uploadButtonText}>UPLOAD A FILE</Text>
          </TouchableOpacity>

          <ChatBox messages={messages} />
        </View>
        )}


        {/* sidebar menu button to toggle visibility */}
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <Image source={menuIcon} style={styles.menuIcon} />
        </TouchableOpacity>

        

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