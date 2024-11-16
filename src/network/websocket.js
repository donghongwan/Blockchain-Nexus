const WebSocket = require('ws');

class WebSocketServer {
    constructor(port) {
        this.wss = new WebSocket.Server({ port });
        this.wss.on('connection', (ws) => {
            console.log('New client connected');
            ws.on('message', (message) => {
                console.log(`Received message: ${message}`);
                // Broadcast message to all clients
                this.broadcast(message);
            });
        });
    }

    broadcast(message) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
}

module.exports = WebSocketServer;
