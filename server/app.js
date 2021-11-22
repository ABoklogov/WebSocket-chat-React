const ws = require('ws');

const wsServer = new ws.Server({ port: 5000 }, () =>
  console.log('Сервер подклечен на порку 5000!'),
);

wsServer.on('connection', ws => {
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
});

const broadcastMessage = message => {
  wsServer.clients.forEach(client => {
    client.send(JSON.stringify(message));
  });
};
