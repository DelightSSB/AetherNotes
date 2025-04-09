import "@expo/metro-runtime";
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import styles from './styles'
import { LaunchView, NewChatView, OldChatView, TextBox } from "./components/chatView";
import CompanyPopup from "./components/companyPopup";
import ChatBox from "./components/chatBox";
import AISummary from "./components/chatBox";
import Sidebar from "./components/Sidebar";
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
  const[messages, setMessages] = useState([]); //array of the messages saves for a chat

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

      //These are the test case messages to help build the chatBox
      chatMessages: [
      
      {
        sender: "ai",
        message: "What can I help with today?"
      },
      {
        sender: "user",
        message: "Here's what I need..."
      },
      {
        sender: "ai",
        message: "Yes I can help you with that!"
      },
      {
        sender: "user",
        message: "Now can you help with this?"
      },
      {
        sender: "user",
        message: "Also I could use your help with this..."
      },
      {
        sender: "ai",
        message: "Ahh I gotcha, let's do this..."
      }

    ]
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

        
        
        console.log("Response:", response.data.choices[0].message.content); // this is the responce from the AI. It is formatted in markdown
        //Stores the response as a variable
        //Stores ai summary response as the active chat's variable, this is immutably changed so an update should be automatic
        // const aiResponse = "Response:"+ response.data.choices[0].message.content
        // setChatHistory(prev => 
        //   prev.map(chat => 
        //     chat.id === activeChatId?
        //     {...chat, summaryResponse: aiResponse}
        //     : chat
        //   )
        // )
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

      {/* Sidebar */}
      {sidebarVisible && (
        <Sidebar
        chatHistory = {chatHistory}
        setActiveChatId = {setActiveChatId}
        setNewChatView = {setNewChatView}
        makeNewChat = {makeNewChat}
        />
      )}


      {/* Popup that is to show when a file is attempted to be uploaded, allows the user to set their company for organization */}
      {companyModalVisible && (
        <CompanyPopup
        companyName = {companyName}
        setCompanyName = {setCompanyName}
        handleCompanySubmit = {handleCompanySubmit}
        />
      )}

      
      {/* Main displayed content */}
      <View style={[styles.mainContent,{flexDirection: "column"}]}> 
      {/* This view is displayed when the user first loads the page */}
      <View>{newChatView==null && (
        <LaunchView/>
      )}
      </View>


      {/*Looking at a new chat */}
        {newChatView==true && (
        <View style={{flex: 1}}>
          <NewChatView
          activeChatId = {activeChatId}
          logo = {logo}
          handleFileUpload = {handleFileUpload}
          />

            <AISummary
              summary={
              chatHistory.find(chat => chat.id === activeChatId)?.summaryResponse || ""
              }
            />
            <ChatBox messages={
              chatHistory.find(chat => chat.id === activeChatId)?.chatMessages || []
            } />

          
        </View>
        )}


      {/* Looking at an old chat */}
        {newChatView==false && (
          <View style={{flex: 1}}>
          <OldChatView
            activeChatId = {activeChatId}
            logo = {logo}
            handleFileUpload = {handleFileUpload}
          />
            <AISummary
              summary={
              chatHistory.find(chat => chat.id === activeChatId)?.summaryResponse || ""
              }
            />
            <ChatBox messages={
              chatHistory.find(chat => chat.id === activeChatId)?.chatMessages || []
            } />
          </View>
          )}

        {/* sidebar menu button to toggle visibility */}
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <Image source={menuIcon} style={styles.menuIcon} />
        </TouchableOpacity>

        {/* text input field to enter user input */}
        <TextBox
        textInput={textInput}
        handleTextChange={handleTextChange}
        sendIcon={sendIcon}
        />
      </View>
    </View>
  );

  
}