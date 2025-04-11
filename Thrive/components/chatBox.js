import React, { useRef, useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import styles from "../styles";

export default function ChatBox({ messages}){
    
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
                <View
                style={[chatBox.messageBubble,
                    item.sender === "user" ? chatBox.userBubble : chatBox.aiBubble
                ]}
                >
                    <Text style={styles.messageText}>{item.message}</Text>
                </View>
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
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    // marginHorizontal: 120,
    maxWidth: "75%",
},
  userBubble: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
    marginRight: 40
  },
  aiBubble: {
    backgroundColor: "#EEE",
    alignSelf: "flex-start",
    marginRight: 50
},
})