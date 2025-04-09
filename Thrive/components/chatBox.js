import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import styles from "../styles";

export default function ChatBox({ messages }){
    return(

        <View style={styles.chatContainer}>
        <FlatList
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
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-end"
            }}
        />
        </View>
    );
}

export function AISummary({ summary }){
    return(
        <View
            style={[styles.messageBubble, styles.aiBubble]}
            >
                <Text style={styles.messageText}>{summary}</Text>
            </View>
    )
}