import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import styles from "../styles";

export default function Sidebar(){
return(
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
    )
}
