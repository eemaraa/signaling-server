const WebSocket = require('ws');
const PORT = process.env.PORT;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // بث الرسالة لجميع العملاء الآخرين
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

console.log('WebSocket server is running on port', PORT);
