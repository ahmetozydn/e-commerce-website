const net = require('net');

// Create a TCP socket and connect to the server
const client = new net.Socket();
client.connect(3000, 'localhost', () => {
  console.log('Connected to server.');
});

// Handle data received from the server
client.on('data', data => {
  console.log(`Received data from server: ${data}`);
  
  // You can perform further actions with the received data here
});

// Handle server disconnection (optional)
client.on('close', () => {
  console.log('Server connection closed.');
});