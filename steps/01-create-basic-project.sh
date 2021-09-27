#! /usr/bin/sh

# Initialize project and follow onscreen prompts to create your package.json
# Recommend setting main to `src/index.js`
npm init

# Install required packages and save them in the package.json/package-lock.json
npm install --save fetch node-fetch sync-request

# create first source file
mkdir src && echo 'console.log("Hello, world!")' > src/index.js

# Run the project: `node .` will also work if main is set to src/index.js
node src/index.js
