const net = require('net');
const EventEmitter = require('events');

class Node extends EventEmitter {
    constructor(port) {
        super();
        this.port = port;
        this.server = net.createServer(this.handleConnection.bind(this));
        this.peers = new Set();
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Node listening on port ${this.port}`);
        });
    }

    handleConnection(socket) {
        socket.on('data', (data) => {
            this.emit('message', data.toString());
        });

        socket.on('end', () => {
            this.peers.delete(socket);
        });

        this.peers.add(socket);
    }

    sendMessage(message) {
        for (const peer of this.peers) {
            peer.write(message);
        }
    }
}

module.exports = Node;
