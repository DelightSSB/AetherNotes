import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import styles from "../styles";

export default function chatBox({ messages }){
    return(
        <FlatList
        inverted={true}
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
    );
}

export function AISummary(){
    return(
        <View
            style={[styles.messageBubble, styles.userBubble]}
            >
                <Text style={styles.messageText}>{chat.summaryResponse}</Text>
            </View>
    )
}

