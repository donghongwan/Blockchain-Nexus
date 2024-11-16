const express = require('express');
const bodyParser = require('body-parser');

class API {
    constructor(port) {
        this.app = express();
        this.port = port;
        this.app.use(bodyParser.json());

        this.app.get('/status', (req, res) => {
            res.json({ status: 'Node is running' });
        });

        this.app.post('/message', (req, res) => {
            const { message } = req.body;
            this.node.sendMessage(message);
            res.json({ status: 'Message sent' });
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`API listening on port ${this.port}`);
        });
    }
}

module.exports = API;
