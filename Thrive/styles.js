
import { StyleSheet }from 'react-native';




// styles for all components on the landing/main page 
const styles = StyleSheet.create({
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
    newChatText: {
      fontSize: 18, // Make it more readable
      fontWeight: "bold",
      marginBottom: 15, // Adds space between text & buttons
      textAlign: "center",
    },
  
      newChatScreen: {
        flexDirection: "column", // Places buttons side by side
        justifyContent: "center", // Centers horizontally
        alignItems: "center", // Aligns buttons vertically
        marginTop: "50%", // Adjust this value to move them to the vertical center
      },
  
      manualNotes: {
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: 'rgb(41, 61, 122)',
        // backgroundColor: '#000', // black background for button 
        borderRadius: 8,
        marginHorizontal: 15
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

});

export default styles;

