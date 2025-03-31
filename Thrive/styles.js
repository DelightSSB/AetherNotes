
import { StyleSheet }from 'react-native';




// styles for all components on the landing/main page 
const styles = StyleSheet.create({
  standartText:{
    fontSize: 20,
    fontWeight: 'bold'

  },
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'rgb(199, 200, 216)', // background color for the whole screen
    },
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
    },
    historyItem: {
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',  // border separating each file item
    },
    historyText: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    historyDate: {
      fontSize: 12,
      color: '#666',  // lighter color for the date text
    },
    mainContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    logo: {
      width: 200,
      height: 80,
      resizeMode: 'contain',
    },
    fileTypesText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#555',
      marginBottom: 10,
      textAlign: 'center',
    },
    uploadButton: {
      marginTop: 20,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: 'rgb(41, 61, 122)',
      // backgroundColor: '#000', // black background for button 
      borderRadius: 8,
      alignItems: 'center'
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
    },
    uploadButtonText: {
      color: '#fff',  // white text color on the button
      fontSize: 16,
      fontWeight: 'bold',
    },
    menuButton: {
      position: 'absolute',
      top: 20,
      left: 20,
    },
    menuIcon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    textInputContainer: {
      position: 'absolute',
      bottom: 50,
      width: '80%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      fontSize: 16,
    },
    sendIconContainer: {
      marginLeft: 10,
    },
    sendIcon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
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
      width: 300,
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center', 
      elevation: 10, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      zIndex: 1000, 
    }, 
    modalButton: {
      marginTop: 10,
      backgroundColor: 'rgb(41, 61, 122)', // Match button background color
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18, // Match sidebar title or button text size
      fontWeight: 'bold', // Match boldness with buttons
      color: '#333', // Consistent text color
      marginBottom: 15,
      textAlign: 'center',
    },    
    modalButtonText: {
      color: '#fff', // White text color
      fontSize: 16,
      fontWeight: 'bold',
    },
    
    pickerContainer: {
      width: '100%',
      marginBottom: 15,
    },
    picker: {
      height: 50,
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333', // Match text color
    },

});

export default styles;

