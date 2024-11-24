// src/api/iotIntegration.js
import express from 'express';

const router = express.Router();

// Mock IoT device data
let devices = [];

// Route to get all IoT devices
router.get('/', (req, res) => {
    res.json(devices);
});

// Route to register a new IoT device
router.post('/', (req, res) => {
    const { deviceName, deviceType } = req.body;
    const newDevice = { id: devices.length + 1, deviceName, deviceType };
    devices.push(newDevice);
    res.status(201).json(newDevice);
});

// Route to send a command to an IoT device
router.post('/:id/command', (req, res) => {
    const { id } = req.params;
    const { command } = req.body;
    const device = devices.find(d => d.id === parseInt(id));
    if (!device) return res.status(404).json({ error: 'Device not found' });

    // Implement command logic here
    res.json({ message: `Command "${command}" sent to device ${device.deviceName}` });
});

export default router;
