// iot-example/index.js

class IoTDevice {
    constructor(id) {
        this.id = id;
        this.data = {};
    }

    sendData(data) {
        this.data = data;
        console.log(`Data sent from device ${this.id}:`, data);
    }

    receiveCommand(command) {
        console.log(`Command received by device ${this.id}:`, command);
    }
}

async function main() {
    const device = new IoTDevice('Device1');

    // Simulate sending data
    device.sendData({ temperature: 22, humidity: 60 });

    // Simulate receiving a command
    device.receiveCommand('Turn on the heater');
}

main().catch(console.error);
