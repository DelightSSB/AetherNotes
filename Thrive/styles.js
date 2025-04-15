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
    backgroundColor: 'rgb(243, 243, 243)', // background color for the whole screen
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

    // Syles for the chatbox
    messageText: {
      fontSize: 16,
  },

  AetherLogoContainer:
  {
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  
  AetherNotesLogo: {
    flex: 1,
    fontFamily: "Exo2_600SemiBold",
    fontSize: 55,
    color: 'rgb(41, 61, 122)',
  },
  chatContainer:{
    borderRadius: 18,
    borderStyle: "dashed",
    borderColor: 'rgba(41, 61, 122, .9)',
    borderWidth: 4,
    alignSelf: "center",
    width: "50%",
    height: "75%",
    marginBottom: 60,
  },
  
  //End of styles for chatbox


});

export default styles;

