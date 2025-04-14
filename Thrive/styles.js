import { StyleSheet } from 'react-native';

// Centralize font family for consistency
const fontFamily = 'Arial'; // Replace 'Arial' with your desired font

// styles for all components on the landing/main page 
const styles = StyleSheet.create({
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
  mainContent: {
    flex: 5,
    alignItems: "center",
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

  // SEND BUTTON 
  sendIconContainer: {
    marginLeft: 10,
  },
  sendIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

    // Syles for the chatbox
    messageText: {
      fontSize: 16,
  },
  //End of styles for chatbox


});

export default styles;

