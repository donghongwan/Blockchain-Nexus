// tests/IoTIntegration.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('IoTIntegration', function () {
    let IoTIntegration;
    let iotIntegration;

    beforeEach(async function () {
        IoTIntegration = await ethers.getContractFactory('IoTIntegration');
        iotIntegration = await IoTIntegration.deploy();
        await iotIntegration.deployed();
    });

    it('should register a new IoT device', async function () {
        const device = await iotIntegration.registerDevice('Device1', 'Device Description');
        expect(device).to.have.property('message', 'Device registered successfully');
    });

    it('should allow sending data from IoT device', async function () {
        await iotIntegration.registerDevice('Device1', 'Device Description');
        const dataSent = await iotIntegration.sendData('Device1', 'Temperature: 22°C');
        expect(dataSent).to.have.property('message', 'Data sent successfully');
    });
});
