import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions, TextInput} from 'react-native';
import styles from "../styles";
import "@expo/metro-runtime";
import { changeTitle } from "./companyPopup";

const screenWidth = Dimensions.get('window').width;
export default function Sidebar({chatHistory, makeNewChat, setActiveChatId, setNewChatView, deleteChat, changeTitle}){

  const thriveLogo = require('../assets/ThriveLogoSqr.png');
  const editIcon = require('../assets/edit-pen.png');

return(
  <View style={sidebar.sidebarContainer}>

    <Image source={thriveLogo} style={sidebar.logo} />

    <Text style={sidebar.sidebarTitle}>History</Text>

    {/*Code for "new chat" buttons */}
    <TouchableOpacity style={sidebar.newChatButton} onPress={makeNewChat}>
    <Text style={sidebar.newChatButtonText}>New Notes Summary</Text>
    </TouchableOpacity>


    <FlatList
    //This flatlist takes in the array chatHistory which is story the chats created
    // each object is a file with properties id, title, and timestamp 
      data={chatHistory}

      // each item requires a unique string (#)
      keyExtractor={(item) => item.id.toString()}
      // renders each items from the chatHistory array and makes them a button to be used to restore their history
      renderItem={({ item }) => (
        <View style={sidebar.buttonContainer}>
          <TouchableOpacity 
          style={sidebar.deleteButton}
          onPress={() => deleteChat(item.id)}>
          <Text style={{fontSize: 16, color: "rgb(241, 90, 41)", alignSelf: "center",}}> X </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
          style={{flex: 4}}
          onPress={() => {
            setActiveChatId(item.id);
            setNewChatView(false)
          }}>
            {/* Displays the title and the date it was created */}
          <View style={sidebar.historyItem}>
            <Text style={sidebar.historyText}>{item.title}</Text>
            <Text style={sidebar.historyDate}>Created on {item.timestamp}</Text>
          </View>
          </TouchableOpacity>

          {/* TODO: Implement change title */}
          <TouchableOpacity style={sidebar.editIconContainer} onPress={changeTitle}>
            <Image source={editIcon} style={sidebar.editButton} />
          </TouchableOpacity>
        </View>
      )}
    />
    {/* End of building sidebar */}
  </View>
    )
}

const sidebar = StyleSheet.create({
  
  buttonContainer:{
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    paddingRight: 5
  },
  logo: {
    alignSelf: "center",
    width: screenWidth > 1440 ? 200 : screenWidth * 0.2,  
    height: screenWidth > 1440 ? 200 : screenWidth * 0.2,
    resizeMode: 'contain'
  },
  deleteButton: {
    height: "50%",
    flex: 1,
    justifyContent: "center",
    padding: 6,
    marginLeft: 10,
  },

  sidebarContainer: {
    flex: 1,
    backgroundColor: 'rgba(199, 200, 216, 1)',
    padding: 15,
    borderRightWidth: 3,
    borderRightColor: 'rgba(46, 48, 55, .5)',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: styles.fontFamily, // Consistent font family for sidebar title
  },
  newChatButton: {
    marginTop: 10,
    backgroundColor: 'rgb(41, 61, 122)',
    paddingVertical: 22,
    paddingHorizontal: 20,
    // backgroundColor: '#000', // black background for button 
    borderRadius: 10,
    alignItems: 'center',
  },
  newChatButtonText: {
    color: '#fff',  
    fontSize: 14,
    
    fontWeight: 'bold',
    fontFamily: styles.fontFamily, 
  },
  historyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',  // border separating each file item
  },
  historyText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: styles.fontFamily, // Consistent font family for history text
  },
  historyDate: {
    fontSize: 12,
    color: '#666',  // lighter color for the date text
    fontFamily: styles.fontFamily, // Consistent font family for date
  },
  editIconContainer: {
    alignItems: "center",
    flex: 1,
    padding: 4,
    borderRadius: 4,
  },
  editButton: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
})
