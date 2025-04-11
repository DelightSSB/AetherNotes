import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput, Picker, StatusBar} from 'react-native';
import styles from "../styles";
import {ChatBox, AISummary} from "./chatBox";

// Blank view from the launch of the site
export function LaunchView({}){
    return(
        <View style={{paddingTop: 100}}>
  
        <Text style={[styles.thirdText, { textAlign: 'center'}, {alignSelf: "center"}, {paddingTop: 1}, {paddingBottom: 1}]}>
          Chat ID: None
          </Text>
        <Text style={[styles.standardText, { textAlign: 'center'}, {alignSelf: "center"}, {paddingTop: 1}]}>
          Press "New Notes Summary" to create a chat!
        </Text>
        </View>
    )
}

// View shown when New Notes Summary button is pressed
export function NewChatView({activeChatId, logo, handleFileUpload}){
    return(
  
          <View style={chatView.buttonContainer}>
            {/* To display the current chat the user is looking in (for testing) */}
            <Text style={[styles.thirdText, { textAlign: 'center'}, {paddingTop: 1}]}>
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
          </View>

    )
}

// View shown when an old chat is selected in the history.
export function OldChatView({activeChatId, logo, handleFileUpload}){
    return(

          <View style={chatView.buttonContainer}>
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
          </View>
    )
}

//Textbox at the bottom
export function TextBox ({textInput, sendIcon, setTextInput, handleSend, inputRef}){
    return(
        <View style={chatView.textInputContainer}>
          <TextInput

          ref={inputRef}
          blurOnSubmit={false}
          style={chatView.textInput}
          placeholder="What do you need?"
          value={textInput}
          onChangeText={(val) => setTextInput(val)}
          onSubmitEditing={handleSend } // Pressing "Enter" triggers send

          />
          {/* send icon button next to the text input box */}
          <TouchableOpacity style={styles.sendIconContainer} onPress={handleSend}>
            <Image source={sendIcon} style={styles.sendIcon} />
          </TouchableOpacity>
          {/*auto prop adjusts the status bar styling based on the background of the screen*/}
        <StatusBar style="auto" />
        </View>
        
    )
}

const chatView = StyleSheet.create({
  buttonContainer:{
    width: "25%",
    alignSelf: "center",
    marginTop: 80,
  },
  thirdText: {
    fontSize: 14, 
    fontWeight: "bold",
    color:"#666",
    fontFamily: styles.fontFamily,
  },
  standardText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: styles.fontFamily, // Ensure the font is applied here
  },
  textInputContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    // width: '80%',
    flexDirection: 'row',
  },
    // TEXT INPUT BOX 
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 18,
    borderWidth: 4,
    borderColor: '#293D74',
    fontSize: 16,
    fontFamily: styles.fontFamily, // Consistent font family for text input
  },


})