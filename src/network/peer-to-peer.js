const Node = require('./node');

class PeerToPeer {
    constructor(port) {
        this.node = new Node(port);
        this.node.on('message', this.handleMessage.bind(this));
    }

    start() {
        this.node.start();
    }

    handleMessage(message) {
        console.log(`Received message: ${message}`);
        // Handle incoming messages (e.g., broadcast, process commands)
    }

    connectToPeer(host, port) {
        const socket = net.createConnection(port, host, () => {
            console.log(`Connected to peer at ${host}:${port}`);
        });

        socket.on('data', (data) => {
            this.node.emit('message', data.toString());
        });
    }
}

module.exports = PeerToPeer;
