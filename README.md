# Thrive
Capstone 2025 Project for Thrive
Thrive is a tech company that gives it services, cybersecurity help and cloud computing and networking. 
They partnered with our school to give us a project that will help them communicate with their clients easier

Project Thrive (Name tbd):
Thrive wants a web ui site that will access the notes and meetings that they have with clients and summarize them for easy access in the future

Features: 

- Should show the accounts of who is involved in the meeting and the logging of the notes
  - Security will be handled by Thrive themselves unless restated or redesigned later. No need for different protocols for different security accesses.
- Each meeting should have their own ID meeting that should be recognizable and potentially searchable for later use.
- Each meeting should include the date of the meeting and the main subject talked about to include an overview
- The use of an ai summary that will summarize a given text from the employer (or potentially later from an automatically uploaded transcript, that's a stretch goal)

Stretch Goals:
- Migration of data to Snowflake cloud database
- Authentication with Kinde (For all employees or different employee levels?)
- Salesforce and ServiceNow push of data to API
- Integration with OneNote

With how the project is now (At the time of April 14th, 2025) you need to run
npx expo install expo-app-loading  
and
npx expo install @expo-google-fonts/exo-2 expo-font
in order to load the custom font for the logo.




