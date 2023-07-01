const express = require('express');
const app = express();
const port = 3000;

// Serve the JSON file
app.get('/', (req, res) => {
  // Path to the JSON file

  // Set the appropriate Content-Type header
  res.setHeader('Content-Type', 'application/json');

  // Send the JSON file
  res.sendFile(__dirname + '/products.json');
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
