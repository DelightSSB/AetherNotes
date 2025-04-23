import {React, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput, Picker } from 'react-native';
import styles from "../styles";


export default function CompanyPopup ({companyName, setCompanyName, handleCompanySubmit, title, setTitle, handleCloseModal, curTitle}){
  useEffect(() => {
    setTitle(curTitle);
  }, [curTitle]);
  return(
        <View style={companyPopup.modalOverlay}>
          <View style={companyPopup.modalBox}>
            <TouchableOpacity style={companyPopup.closeButton} onPress={handleCloseModal}>
              <Text style={companyPopup.closeButtonText}>X</Text>
            </TouchableOpacity>
            {/* <Text style={companyPopup.modalTitle}>Enter a title for these notes</Text> */}
            <TextInput
            blurOnSubmit={false}
            style={companyPopup.picker}
            placeholder="Enter Title"
            value={title}
            onChangeText={(val) => setTitle(val)}
            />
            {/* <Text style={companyPopup.modalTitle}>What is your company?</Text> */}
            <Picker
    selectedValue={companyName}
    style={companyPopup.picker}
    onValueChange={(itemValue) => setCompanyName(itemValue)}
  >
    <Picker.Item label="Select Company" value="" />  {/* Default option */}
    <Picker.Item label="The Foster Protocol" value="The Foster Protocol" />
    <Picker.Item label="Ctrl+Channing" value="Ctrl+Channing" />
    <Picker.Item label="Mike & Byte" value="Mike & Byte" />
  </Picker>
            <TouchableOpacity style={companyPopup.modalButton} onPress={handleCompanySubmit}>
              <Text style={companyPopup.modalButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}

export function ChangeTitlePopup ({handleChangeTitle, title, setTitle, closeTitleChange, curTitle}){
  useEffect(() => {
    setTitle(curTitle);
  }, [curTitle]);
  return(
      <View style={companyPopup.modalOverlay}>
        <View style={companyPopup.modalBox}>
          <TouchableOpacity style={companyPopup.closeButton} onPress={closeTitleChange}>
            <Text style={companyPopup.closeButtonText}>X</Text>
          </TouchableOpacity>
          {/* <Text style={companyPopup.modalTitle}>Enter a title for these notes</Text> */}
          <TextInput
          blurOnSubmit={false}
          style={companyPopup.picker}
          placeholder="Enter Title"
          value={title}
          onChangeText={(val) => setTitle(val)}
          />
          <TouchableOpacity style={companyPopup.modalButton} onPress={handleChangeTitle}>
            <Text style={companyPopup.modalButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export function ConfirmDelete ({setDeleteModal, curTitle, ID, deleteChat}){
  return(
    <View style={companyPopup.modalOverlay}>
        <View style={companyPopup.modalBox}>
          <TouchableOpacity style={companyPopup.closeButton} onPress={() => setDeleteModal(false)}>
            <Text style={companyPopup.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={companyPopup.modalTitle}>Delete {curTitle}?</Text>
          <TouchableOpacity style={companyPopup.modalButton} onPress={() => {deleteChat(ID); setDeleteModal(false)}}>
            <Text style={companyPopup.modalButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

const companyPopup = StyleSheet.create({
  // POP UP BOX FOR COMPANY ASSIGNMENT
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, 
  },
  modalBox: {
    width: '80%',                   // Increased the width to 80% for a larger box (can be adjusted)
    maxWidth: 800,                  // Added max width for responsiveness
    backgroundColor: '#fff',
    padding: 100,                    // Increased padding for more space
    borderRadius: 15,               // Rounded corners
    alignItems: 'center',
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1000, 
  }, 
  modalButton: {
    marginTop: 20,
    backgroundColor: 'rgb(41, 61, 122)', 
    paddingVertical: 12,
    paddingHorizontal: 30,            
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,                  
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,               
    textAlign: 'center',
    fontFamily: styles.fontFamily, 
  },    
  modalButtonText: {
    color: '#fff', 
    fontSize: 14,                    
    fontWeight: 'bold',
    fontFamily: styles.fontFamily, 
  },
  
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333', 
    fontFamily: styles.fontFamily, 
    margin: 20,
  },
  titleInput: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'rgba(0, 0, 0, .7)',
    fontSize: 10,
    fontFamily: styles.fontFamily,
    padding: 10,
    paddingBottom : 15,
},
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1001,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
})