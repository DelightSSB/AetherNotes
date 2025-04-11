import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import styles from "../styles";

export default function Sidebar({chatHistory, makeNewChat, setActiveChatId, setNewChatView}){
return(
<View style={sidebar.sidebar}>
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
              <TouchableOpacity
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
            )}
          />
          {/* End of building sidebar */}
        </View>
    )
}

const sidebar = StyleSheet.create({
  sidebar: {
    width: 250,
    backgroundColor: 'rgba(244, 244, 244, .5)', // semi-transparent background for sidebar 
    padding: 15,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
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
})
