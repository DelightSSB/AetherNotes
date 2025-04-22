import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions, TextInput} from 'react-native';
import styles from "../styles";
import "@expo/metro-runtime";
import { changeTitle } from "./companyPopup";
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;
export default function Sidebar({chatHistory, makeNewChat, setActiveChatId, setNewChatView, setDeleteModal, setChangeTitleModal}){

  const thriveLogo = require('../assets/ThriveLogoSqr.png');
  const editIcon = require('../assets/edit-pen.png');

return(
  <View style={sidebar.sidebarContainer}>

    <Image source={thriveLogo} style={sidebar.logo} />

    {/*Code for "new chat" buttons */}
    <TouchableOpacity style={sidebar.newChatButton} onPress={makeNewChat}>
    <Image source={editIcon} style={sidebar.newChatButtonIcon} />
    <Text style={sidebar.newChatButtonText}>New Notes Summary</Text>
    </TouchableOpacity>

    <View style={sidebar.historyContainer}>
    <Text style={sidebar.historyTitle}>Chat History</Text>
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
          onPress={() => {
            setActiveChatId(item.id); 
            setDeleteModal(true)
          }}>
          <Ionicons
                    name="close-circle"
                    size={20}
                    color="rgb(241, 90, 41)"
                  />
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
          <TouchableOpacity style={sidebar.editIconContainer} onPress={() => {setActiveChatId(item.id); setNewChatView(false); setChangeTitleModal(true)}}>
            <Image source={editIcon} style={sidebar.editButton} />
          </TouchableOpacity>
        </View>
      )}
    />
    </View>
    {/* End of building sidebar */}
  </View>
    )
}

const sidebar = StyleSheet.create({
  
  buttonContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    gap: 5,
  },
  logo: {
    alignSelf: "center",
    width: screenWidth > 1440 ? 200 : screenWidth * 0.2,  
    height: screenWidth > 1440 ? 200 : screenWidth * 0.2,
    resizeMode: 'contain'
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
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
    marginTop: 20,
    backgroundColor: 'rgb(41, 61, 122)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    // backgroundColor: '#000', // black background for button 
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  newChatButtonIcon: {
    width: 24, 
    height: 24,
    marginRight: 7,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  newChatButtonText: {
    color: '#fff',  
    fontSize: 14,
    
    fontWeight: 'bold',
    fontFamily: styles.fontFamily, 
  },
  historyContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5', // Light background for the history section
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(41, 61, 122)', // Match the primary color
    marginBottom: 10,
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
