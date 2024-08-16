const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

// SSL certificates
const server = https.createServer({
  cert: fs.readFileSync('./cert.pem'),
  key: fs.readFileSync('./key.pem')
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(443, () => {
  console.log('WebSocket server is running');
});
