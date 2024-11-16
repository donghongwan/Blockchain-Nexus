const crypto = require('crypto');

class SmartContract {
    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
        this.state = {}; // Store contract state
        this.events = []; // Store emitted events
        this.contractAddress = this.generateContractAddress();
    }

    generateContractAddress() {
        // Generate a unique address for the contract based on its name and owner
        return crypto.createHash('sha256').update(this.name + this.owner + Date.now()).digest('hex');
    }

    deploy() {
        console.log(`Deploying contract: ${this.name} at address: ${this.contractAddress}`);
        // Logic to deploy the contract (e.g., store it in the blockchain)
        this.emitEvent('ContractDeployed', { address: this.contractAddress });
    }

    execute(methodName, params) {
        if (typeof this[methodName] !== 'function') {
            throw new Error(`Method ${methodName} does not exist on contract ${this.name}`);
        }
        const result = this[methodName](...params);
        this.emitEvent('MethodExecuted', { methodName, params, result });
        return result;
    }

    emitEvent(eventName, data) {
        this.events.push({ eventName, data, timestamp: Date.now() });
        console.log(`Event emitted: ${eventName}`, data);
    }

    // Example method
    setState(key, value) {
        this.state[key] = value;
        return this.state;
    }

    getState(key) {
        return this.state[key];
    }

    getEvents() {
        return this.events;
    }
}

module.exports = SmartContract;
