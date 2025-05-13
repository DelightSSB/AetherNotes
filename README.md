# AetherNotes
# Capstone 2025 Project for Thrive
Thrive is a tech company that gives it services, cybersecurity help and cloud computing and networking. 
They partnered with our school to give us a project that will help them communicate with their clients easier

This is a web app that is to be used by Thrive. This application is to take notes that are about the various clients and then provide a summary of those notes. Then a user will be able to prompt the AI about the information given about a specific company. All of the notes are stored in a MongoDB database.

### Features:
- User should be able to upload notes to the AI to have them be summarized and stored.
- User should be able to prompt the AI further about the company to get more information from other notes provieded.
- Each chat should have their own ID that should be recognizable and changable by the user.



## To run the project use the following commands and information.
Note: All API keys for the LLM, and URI for the database is kept in a environment file. For the project to work on the backend you must provide your own keys in a file called 'config-2.env' and then have this file within the /Backend directory. './Backend/config-2.env'

1. Ensure you have npm and Node.js installed on your device. 

2. Open two seperate terminals. One will be used to run the front end of the application and then the second will be used to run the backend through node.js.

3. On your first terminal you should make sure you are in the main directory and run the 'npm install' to install all the necessary packages for the project. 

4. Once it finishing installing go ahead and run 'npm start' to start the React frontend. 

5. Once it start booting, navigate to your second terminal and then use 'cd Backend' to navigate to the Backend directory. 

6. Once there run 'node server.js' to start the backend. 

To know it all is running correct you should see on the terminal with the frontend a qr code and a link to the localhost webserver and the second terminal should say 'Server running on port 3000'






