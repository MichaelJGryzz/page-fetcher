// import the needle library
const needle = require('needle');

// import the file system
const fs = require('fs');

// get the command line args
const args = process.argv.slice(2);
const url = args[0]; // first command line arg
const filePath = args[1]; // second command line arg

// function to fetch the URL and save the resource to the local machine
const fetchAndSave = (url, filePath) => {
  // make the HTTP request using needle
  needle.get(url, (error, response) => {
    if (error) {
      return console.error(`Failed to download the URL: ${error.message}`);
    }

    // write the response body to the file
    fs.writeFile(filePath, response.body, (error) => {
      if (error) {
        return console.error(`Failed to write to file: ${error.message}`);
      }

      // calculate the size of the file and print message upon completion
      const fileSize = Buffer.byteLength(response.body);
      console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
    });
  });
};

// Run the "fetchAndSave" function
fetchAndSave(url, filePath);