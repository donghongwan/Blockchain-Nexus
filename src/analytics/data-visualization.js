const Chart = require('chart.js');

class DataVisualization {
    constructor(canvasId) {
        this.canvasId = canvasId;
    }

    renderChart(data) {
        const ctx = document.getElementById(this.canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Transaction Volume',
                    data: data.values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

module.exports = DataVisualization;
