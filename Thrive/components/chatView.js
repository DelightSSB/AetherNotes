import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput, Picker, StatusBar} from 'react-native';
import styles from "../styles";
import {ChatBox, AISummary} from "./chatBox";

// Blank view from the launch of the site
export function LaunchView({logo, handleFileUpload}){
    return(

        <View style={chatView.buttonContainer}>

            {/* text indicating allowed file types */}
            <Text style={chatView.thirdText}>Only .PDF, .DOCX, & .TXT files are allowed.</Text>

            {/* button for file upload */}
            <TouchableOpacity style={chatView.uploadButton} onPress={handleFileUpload}>
              <Text style={chatView.uploadButtonText}>UPLOAD A FILE</Text>
            </TouchableOpacity>
          </View>
    )
}

// View shown when New Notes Summary button is pressed
export function NewChatView({activeChatId, logo, handleFileUpload}){
    return(
  
          <View style={chatView.buttonContainer}>
            {/* To display the current chat the user is looking in (for testing) */}
            {/* <Text style={[chatView.thirdText, { textAlign: 'center'}, {paddingTop: 1}]}>
              New Chat ID: {activeChatId}
              </Text> */}

            {/* text indicating allowed file types */}
            <Text style={chatView.thirdText}>Only .PDF, .DOCX, & .TXT files are allowed.</Text>

            {/* button for file upload */}
            <TouchableOpacity style={chatView.uploadButton} onPress={handleFileUpload}>
              <Text style={chatView.uploadButtonText}>UPLOAD A FILE</Text>
            </TouchableOpacity>
          </View>

    )
}

// View shown when an old chat is selected in the history.
export function OldChatView({activeChatId, logo, handleFileUpload}){
    return(

          <View style={chatView.buttonContainer}>
          {/* To display the current chat the user is looking in (for testing) */}
          {/* <Text style={[chatView.thirdText, { textAlign: 'center'}, {paddingTop: 1},]}>
            This is an old chat with ID: {activeChatId}
            </Text> */}

          {/* text indicating allowed file types */}
          <Text style={chatView.thirdText}>Only .PDF, .DOCX, & .TXT files are allowed.</Text>

          {/* button for file upload */}
          <TouchableOpacity style={chatView.uploadButton} onPress={handleFileUpload}>
            <Text style={chatView.uploadButtonText}>UPLOAD A FILE</Text>
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
          <TouchableOpacity style={chatView.sendIconContainer} onPress={handleSend}>
            <Image source={sendIcon} style={chatView.sendIcon} />
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
    marginTop: 30,
  },
  thirdText: {
    alignSelf: "center",
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
    borderColor: 'rgba(0, 0, 0, .7)',
    fontSize: 16,
    fontFamily: styles.fontFamily, // Consistent font family for text input
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(41, 61, 122)',
    // backgroundColor: '#000', // black background for button 
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',  // white text color on the button
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: styles.fontFamily, 
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
  },
  sendIconContainer: {
    marginLeft: 10,
  },
  sendIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  AetherNotesLogo: {
    alignSelf: "center",
    fontFamily: "Exo2_600SemiBold",
    fontSize: 55
  },


})