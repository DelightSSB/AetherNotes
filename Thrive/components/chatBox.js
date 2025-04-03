import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import styles from "../styles";

export default function chatBox({ messages }){
    return(
        <FlatList
        data = {messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <View
            style={[styles.messageBubble,
                item.sender === "user" ? styles.userBubble : styles.aiBubble
            ]}
            >
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
            )}
        />
    );
}