import React, { useRef, useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import styles from "../styles";

export default function ChatBox({ messages}){
    
    const flatListRef = useRef(null);

    useEffect(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }, [messages]);

    return(

        <View style={{flexDirection: "row", justifyContent: "center",}}>
        <View style={styles.chatContainer}>

            {/* Displays the summary first then displays the rest of the chat */}
            <FlatList
            ref={flatListRef}
            data = {messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View
                style={[styles.messageBubble,
                    item.sender === "user" ? styles.userBubble : styles.aiBubble
                ]}
                >
                    <Text style={styles.messageText}>{item.message}</Text>
                </View>
                )}
                style={{flexGrow: 1,}}
                contentContainerStyle={{
                    justifyContent: "flex-end"
                    // justifyContent: "center"
                }}
            />
        </View>
        </View>
    );
}