import { StyleSheet } from 'react-native';

// Centralize font family for consistency
const fontFamily = 'Arial'; // Replace 'Arial' with your desired font

// styles for all components on the landing/main page 
const styles = StyleSheet.create({
  standardText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: fontFamily, // Ensure the font is applied here
  },
  secondaryText: {
    fontSize: 18,
    color:'#666',
    fontFamily: fontFamily,
  },

  thirdText: {
    fontSize: 14, 
    fontWeight: "bold",
    color:"#666",
    fontFamily: fontFamily,
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
    fontFamily: fontFamily, // Consistent font family for sidebar title
  },


  historyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',  // border separating each file item
  },
  historyText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: fontFamily, // Consistent font family for history text
  },
  historyDate: {
    fontSize: 12,
    color: '#666',  // lighter color for the date text
    fontFamily: fontFamily, // Consistent font family for date
  },
  mainContent: {
    flex: 1,
    alignItems: "stretch",
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

  uploadButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(41, 61, 122)',
    // backgroundColor: '#000', // black background for button 
    borderRadius: 8,
    alignItems: 'center',
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
    fontFamily: fontFamily, 
  },
  uploadButtonText: {
    color: '#fff',  // white text color on the button
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fontFamily, 
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

  // TEXT INPUT BOX 
  textInputContainer: {
    position: 'absolute',
    alignSelf: "center",
    bottom: 50,
    width: '80%',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 18,
    borderWidth: 4,
    borderColor: '#293D74',
    fontSize: 16,
    fontFamily: fontFamily, // Consistent font family for text input
  },

  // SEND BUTTON 
  sendIconContainer: {
    marginLeft: 10,
  },
  sendIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

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
    fontFamily: fontFamily, 
  },    
  modalButtonText: {
    color: '#fff', 
    fontSize: 14,                    
    fontWeight: 'bold',
    fontFamily: fontFamily, 
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
    fontFamily: fontFamily, 
  },

    // Syles for the chatbox
    chatContainer: {
      flexGrow: 0,
      
      position: "relative",
      alignSelf: "center",
      top: 350,
      maxHeight: 800,
      width: "80%",
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
    messageText: {
      fontSize: 16,
  },
  //End of styles for chatbox


});

export default styles;
