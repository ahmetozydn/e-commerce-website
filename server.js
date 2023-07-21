const http = require('http');
const url = require('url');
const fs = require('fs');
const { json } = require('express');
const dataFilePath = './data/products.json';
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);
  console.log(pathname);

  // Set the response header to indicate JSON content
  res.setHeader('Content-Type', 'application/json');

  // Check the requested URL and respond accordingly
    console.log("hello world");
    // Read the data from the JSON file
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      //res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      if (err) {

        res.writeHead(500);

        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      } else {
        // Parse the JSON data and return it as a response
        res.writeHead(200);
        res.end(data);
      }
    });
    // For any other route, return a 404 Not Found response
/*     res.writeHead(404);
    console.log("hellooo!")
    res.end(JSON.stringify({ message: 'Not Found' })); */
});

const port = 5050;
const host = 'localhost';

server.listen(port, () => {
  console.log(`Server running on http://${host}:${port}/api`);
});