import "@expo/metro-runtime";
import { useState, useRef, useEffect } from 'react';
import {Text, View, TouchableOpacity, Image, FlatList, TextInput,  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import styles from './styles'
// import pdfToText from "react-pdftotext";

var mammoth = require("mammoth");

import { LaunchView, NewChatView, OldChatView, TextBox } from "./components/chatView";
import CompanyPopup from "./components/companyPopup";
import ChatBox from "./components/chatBox";
import Sidebar from "./components/Sidebar";
import { uploadAsync } from "expo-file-system";
import { useFonts, Exo2_600SemiBold } from '@expo-google-fonts/exo-2';
import AppLoading from 'expo-app-loading';




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

  const textInputRef = useRef(null); //used to refocus onto chat

  //Imports the Expo 2 font for AetherNotes Logo Text, if the font doesn't import then the app will stall until it does
  const [fontsLoaded] = useFonts({
    Exo2_600SemiBold,
  });

  // if (!fontsLoaded) {
  //   return null; // or null if you're not using AppLoading
  // }

  //Call this to save the chats locally in their immediate state.
  const saveChats = (chatToSave = chatHistory) => {
    AsyncStorage.setItem('recentChats', JSON.stringify(chatToSave)).catch(err =>
      console.error("Failed to save chatHistory after AI response", err)
    );
  }

  // Creates a new chat. Defaults chat ID to length of history, gives the new chat a title, and records the time the chat was made
  const makeNewChat = () => {
    const chatID = chatHistory.length + 1;
    // const summaryResponse = "Summary test"
    //Creates a new chat object with a unique ID, a title to view on the sidebar, and date on when it was created (saved as a string) 
    const newChat = {
      id: chatID,
      title: `Chat ${chatID}`, //variable to be updated when the popup menu is implemented
      timestamp: new Date().toLocaleString(),

      //Array of chats, these are automatically updated as the user and ai respond to each other
      chatMessages: [
        {
          sender: "ai",
          message: "How can I help today?"
        }
    ]
    }; 
    
    const updatedHistory = [newChat, ... chatHistory].slice(0,14); //Adds this newChat object to the chatHistory array (This adds this chat to the beginning of the array rather than the end) only 14 chats can be saved

    setChatHistory(updatedHistory); 
    setActiveChatId(chatID); //Sets the active chat to the one just created, ensures the new chat you're editing is the newest one created assuming you stay in the chat
    setNewChatView(true); //Ensures the view is automatically changed when the button is pressed
    saveChats(updatedHistory);

    return newChat;
  };

  const deleteChat = (ID) => {
    const updatedHistory = chatHistory.filter(chat => chat.id !== ID);

    setChatHistory(updatedHistory);

    if(activeChatId === ID){
      setActiveChatId(null);
      setNewChatView(null);
    }
    saveChats(updatedHistory);
  };


  //Reloads the chats on app start/restart
  useEffect(() => {
    const loadChatsFromStorage = async () => {
      try{
        const storedChats = await AsyncStorage.getItem('recentChats');
        if (storedChats) {
          setChatHistory(JSON.parse(storedChats));
        }
      } catch (error){
        console.error('Failed to load chat history:', error);
      }
    };
    loadChatsFromStorage();
  }, []);

  const summaryReturn = async (text) => {
    try {
        const response = await axios.post("http://localhost:3000/summary", {
            text: text 
        });

        let updatedHistory = [];
        //Stores the response as a variable
        //Stores ai summary response as the active chat's variable, this is immutably changed so an update should be automatic
        const aiResponse =  response.data.choices[0].message.content
        
        
        if(newChatView===null){
          const newChat = makeNewChat();
          const updatedMessaging = {
            ...newChat,
            chatMessages: [...newChat.chatMessages, {sender: "ai", message: aiResponse}]
          };
          updatedHistory = [updatedMessaging, ...chatHistory].slice(0,14);
          setChatHistory(updatedHistory);
          saveChats(updatedHistory);
        }
        else{
        //Adds the response as a message from the ai
        updatedHistory = chatHistory.map(chat =>
          chat.id === activeChatId
            ? {
                ...chat,
                chatMessages: [...chat.chatMessages, { sender: "ai", message: aiResponse }]
              }
            : chat
        );

        setChatHistory(updatedHistory);
        saveChats(updatedHistory);

    } catch (error) {
        console.error("Error sending summary request:", error);
    }
    
 };

  //show pop up instead of immediate upload
  const handleFileUpload = () => {
    setCompanyModalVisible(true);
  };

  //Handles sending a message and adding it to chatBox
  const handleSendMessage = async () => {
    if (!textInput.trim()) return; // Don't send empty messages

    const newMessage = {
      sender: "user",
      message: textInput.trim()
    };
    let updatedHistory =[];

    if(newChatView==null){
      const newChat = makeNewChat();
      const updatedMessaging = {
        ...newChat,
        chatMessages: [...newChat.chatMessages, newMessage]
      };
      updatedHistory = [updatedMessaging, ...chatHistory].slice(0,14);
      setChatHistory(updatedHistory);
      saveChats(updatedHistory);

    }
    else{
    const newMessage = {
      sender: "user",
      message: textInput.trim(),
      companyName,
    };
  

    // Immediately update state using a functional update to ensure you're working with the latest chatHistory
    setChatHistory(prevChats =>
      prevChats.map(chat => {
        if (chat.id === activeChatId) {
          return { ...chat, chatMessages: [...chat.chatMessages, userMessage] };
        }
        return chat;
      })
    );
    saveChats(chatHistory); // Optionally, save the chats after appending (or do it in a callback)
  
    // Optionally clear the input right away
    setTextInput("");
    textInputRef.current?.focus();
  
    try {
      const response = await axios.post("http://localhost:3000/prompt", userMessage);
      const aiResponse = {
        sender: "ai",
        message: response.data.choices[0].message.content,
      };
  
      // Append the AI response using a functional update so we build on the latest state
      setChatHistory(prevChats =>
        prevChats.map(chat => {
          if (chat.id === activeChatId) {
            return { ...chat, chatMessages: [...chat.chatMessages, aiResponse] };
          }
          return chat;
        })
      );
      aiResponse.current?.focus();
      // Make sure to save the updated chat history, if needed.
    } catch (error) {
      console.error("Error sending prompt request:", error.response?.data || error.message);
      // Optionally show an error message to the user
    }
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
          
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            try {
              const response = await fetch(file.uri);
              const blob = await response.blob();
              const reader = new FileReader();
          
              cleanText = await new Promise((resolve, reject) => {
                reader.onload = function(event) {
                  const arrayBuffer = event.target.result;
          
                  mammoth.extractRawText({ arrayBuffer })
                    .then(result => resolve(result.value))
                    .catch(err => reject(err));
                };
          
                reader.onerror = () => reject(new Error("File reading failed"));
          
                reader.readAsArrayBuffer(blob);
              });
            } catch (error) {
              console.error("Error extracting text:", error);
              return null;
            }
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
        deleteChat={deleteChat}
        />
      )}
      
      {/* Main displayed content */}
      <View style={[styles.mainContent]}> 
        <View style={styles.AetherLogoContainer}>
          <Text style={styles.AetherNotesLogo}>AetherNotes</Text>
        </View>

        {/* Popup that is to show when a file is attempted to be uploaded, allows the user to set their company for organization */}
      {companyModalVisible && (
        <CompanyPopup
        companyName = {companyName}
        setCompanyName = {setCompanyName}
        handleCompanySubmit = {handleCompanySubmit}
        />
      )}

      {/* sidebar menu button to toggle visibility */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
        <Image source={menuIcon} style={styles.menuIcon} />
      </TouchableOpacity>
      
      {/* This view is displayed when the user first loads the page */}
      {newChatView==null && (
        <View style ={{flex: 1, 
          justifyContent: "space-between",
          width: "100%"}}>
        <LaunchView
        logo = {logo}
        handleFileUpload = {handleFileUpload}
        />

        <View style={styles.chatContainer}>
          <ChatBox messages={
              chatHistory.find(chat => chat.id === activeChatId)?.chatMessages || [
                {
                  sender: "ai",
                  message: "How can I help today?"
                }
            ]
            } summary={chatHistory.find(chat => chat.id === activeChatId)?.summaryResponse || ""
            } />

        <TextBox
            setTextInput={setTextInput}
            textInput={textInput}
            handleSend={handleSendMessage}
            sendIcon={sendIcon}
            inputRef={textInputRef}
          />
          </View>
        </View>
      )}
      


      {/*Looking at a new chat */}
        {newChatView==true && (
          
        <View style={{flex: 1, 
        justifyContent: "space-between",
        width: "100%"}}>
          
          <NewChatView
          activeChatId = {activeChatId}
          logo = {logo}
          handleFileUpload = {handleFileUpload}
          />

        <View style={styles.chatContainer}>
          <ChatBox messages={
              chatHistory.find(chat => chat.id === activeChatId)?.chatMessages || []
            } summary={chatHistory.find(chat => chat.id === activeChatId)?.summaryResponse || ""
            } />
          
          <TextBox
            setTextInput={setTextInput}
            textInput={textInput}
            handleSend={handleSendMessage}
            sendIcon={sendIcon}
            inputRef={textInputRef}
          />
        </View>
          
        </View>
        )}


      {/* Looking at an old chat */}
        {newChatView==false && (
          <View style={{flex: 1, 
            justifyContent: "space-between",
            width: "100%"}}>

            <OldChatView
              activeChatId = {activeChatId}
              logo = {logo}
              handleFileUpload = {handleFileUpload}
            />

            <View style={styles.chatContainer}>
              <ChatBox messages={
                chatHistory.find(chat => chat.id === activeChatId)?.chatMessages || []
              } summary={chatHistory.find(chat => chat.id === activeChatId)?.summaryResponse || ""
              } />

              <TextBox
                setTextInput={setTextInput}
                textInput={textInput}
                handleSend={handleSendMessage}
                sendIcon={sendIcon}
                inputRef={textInputRef}
              />
            </View>

          </View>
          )}

        {/* text input field to enter user input */}
      </View>
    </View>
  );

  
}