const express = require('express');
const Metrics = require('./metrics');

class Dashboard {
    constructor(port) {
        this.app = express();
        this.port = port;
        this.metrics = new Metrics();

        this.app.get('/dashboard', (req, res) => {
            const metricsData = this.metrics.getMetrics();
            res.render('dashboard', { metrics: metricsData });
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Dashboard running on http://localhost:${this.port}/dashboard`);
        });
    }
}

module.exports = Dashboard;
