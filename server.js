
const http = require('http'); // a module for HTTP requests and responses
const fs = require('fs');
const dataFilePath = './data/products.json'; // file path that contains JSON data
const port = 5050; // which port would be used for server
const host = 'localhost'; // host name

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Set the response header to indicate JSON content
  // Check the requested URL and respond accordingly
    fs.readFile(dataFilePath, 'utf8', (err, data) => { // Read the data from the JSON file
      res.setHeader("Access-Control-Allow-Origin", "*"); //res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      const jsonData = JSON.parse(data);
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      } else {
        res.writeHead(200); // Parse the JSON data and return it as a response
        res.end(data);
      }
    });
});




server.listen(port, () => {
  console.log(`Server running on http://${host}:${port}/api`);
});