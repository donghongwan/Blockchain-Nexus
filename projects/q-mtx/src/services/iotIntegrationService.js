// services/iotIntegrationService.js
class IoTIntegrationService {
    constructor() {
        this.devices = [];
    }

    getAllDevices() {
        return this.devices;
    }

    registerDevice(deviceName, deviceType) {
        const newDevice = { id: this.devices.length + 1, deviceName, deviceType };
        this.devices.push(newDevice);
        return newDevice;
    }

    sendCommandToDevice(id, command) {
        const device = this.devices.find(d => d.id === id);
        if (!device) throw new Error('Device not found');
        // Implement command logic here
        return { message: `Command "${command}" sent to device ${device.deviceName}` };
    }
}

export default new IoTIntegrationService();
