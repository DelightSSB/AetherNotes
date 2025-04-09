import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput, Picker } from 'react-native';
import styles from "../styles";

export default function CompanyPopup ({companyName, setCompanyName, handleCompanySubmit }){
    return(
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>What is your company?</Text>
            <Picker
    selectedValue={companyName}
    style={styles.picker}
    onValueChange={(itemValue) => setCompanyName(itemValue)}
  >
    <Picker.Item label="Select Company" value="" />  {/* Default option */}
    <Picker.Item label="Company 1" value="Company 1" />
    <Picker.Item label="Company 2" value="Company 2" />
    <Picker.Item label="Company 3" value="Company 3" />
  </Picker>
            <TouchableOpacity style={styles.modalButton} onPress={handleCompanySubmit}>
              <Text style={styles.modalButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}