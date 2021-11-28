const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const server = require('http').createServer(app);
const ws = require('ws');
require('dotenv').config();
const { PORT = 3000 } = process.env;

const wsServer = new ws.Server({ server: server });

app.use(cors());
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

server.listen(PORT, () => {
  console.log(`Сервер запустился на порту ${PORT}`);
});

const clients = [];

wsServer.on('connection', ws => {
  clients.push(ws);

  ws.on('message', data => {
    const message = JSON.parse(data);

    switch (message.event) {
      case 'message':
        broadcastMessage(message);
        break;
      case 'connection':
        broadcastMessage(message);
        break;
      default:
        break;
    }
  });
  ws.on('close', () => {
    const idx = clients.findIndex(client => client === ws);
    clients.splice(idx, 1);
  });
});

const broadcastMessage = message => {
  clients.forEach(client => {
    client.send(JSON.stringify(message));
  });
};
