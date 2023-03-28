# RememberMe

# Setup
- Download the project folder from GitHub

- Run the command to install the npm packages
`npm i`
- Run to auto build the dev files
`npm build-dev`
- Run to setup webserver
`npm start`

# Guide
- For the prototype code should be written in index.js 
- By running the dev and prod commands webpack 'packs all the html, css and js into either dev or dist directories
- dist/ is what the netlify server reads from 

# TO DO
- In the file Netlify/functions/dbwrite.js need to add the node.js code that will send the audio file named the scanned serial number to the db
- Need to create a UI following the protopie layout

# NOTES
It seems to be allowed to use the NFC permissions on android
you need a valid and signed https request, have been testing
by using netlify's domain 
`remembermebox.netlify.app`

