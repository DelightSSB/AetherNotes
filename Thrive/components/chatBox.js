import React, { useRef, useEffect } from "react";
import { FlatList, View, Text, StyleSheet, Image } from "react-native";
import styles from "../styles";



export default function ChatBox({ messages}){
    const AetherLogo = require('../assets/AetherNotesIconDarkBlue.png');
    const flatListRef = useRef(null);

    useEffect(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }, [messages]);

    return(

        <View style={chatBox.container}>

            {/* Displays the summary first then displays the rest of the chat */}
            <FlatList
            ref={flatListRef}
            data = {messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{marginBottom: 16}}>
                {item.sender === "user" ?(
                <View style={[chatBox.userBubble, {backgroundColor: "transparent"}]}>
                    <Text style={{alignSelf: "flex-end", marginRight: 45, paddingBottom: 5,}}> You </Text>
                  <View style={[chatBox.messageBubble, chatBox.userBubble]}>
                    <Text style={styles.messageText}>{item.message}</Text>
                  </View>
                </View>
                ) : (
                  <View style={[chatBox.aiBubble, {backgroundColor: "transparent"}]}>
                  <View style={chatBox.aiHeader}>
                    <Image source={AetherLogo} style={chatBox.logoIcon} />
                  </View>
                  <View style={[chatBox.messageBubble, chatBox.aiBubble]}>
                    <Text style={styles.messageText}>{item.message}</Text>
                  </View>
                </View>
                )}

              </View>
                // <View
                // style={[chatBox.messageBubble,
                //     item.sender === "user" ? chatBox.userBubble : chatBox.aiBubble
                // ]}
                // >
                //     <Text style={styles.messageText}>{item.message}</Text>
                // </View>
                )}

                contentContainerStyle={chatBox.chatContent}
            />
            </View>

    );
}

const chatBox = StyleSheet.create({
  container:{
    flex: 1,
    padding: 10
    
  },

  chatContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
},
  messageBubble: {
    padding: 7,
    borderRadius: 10,
    maxWidth: "75%",
},
  userBubble: {
    
    backgroundColor: "rgba(15 ,130 ,198 , .4)",
    alignSelf: "flex-end",
    marginRight: 40,
  },
  aiBubble: {
    backgroundColor: "rgba(199,200,216,.8)",
    alignSelf: "flex-start",
    marginRight: 50
},
logoIcon: {
  width: 35,
  height: 35,
  resizeMode: "contain",
},
aiHeader: {
  flexDirection: "row",
  alignItems: "center",
},        
})