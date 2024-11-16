const snarkjs = require("snarkjs");
const fs = require("fs");
const path = require("path");

class ZKProof {
    constructor() {
        this.circuit = null; // The circuit for the zk-SNARK
        this.proof = null; // The generated proof
        this.publicSignals = null; // The public signals
    }

    async setupCircuit(circuitFile) {
        // Load the circuit from a file
        const circuitPath = path.resolve(__dirname, circuitFile);
        this.circuit = await snarkjs.circuits.load(circuitPath);
        console.log("Circuit loaded successfully.");
    }

    async generateProof(inputs) {
        if (!this.circuit) {
            throw new Error("Circuit not set up. Call setupCircuit first.");
        }

        // Generate the proof and public signals
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(this.circuit, inputs);
        this.proof = proof;
        this.publicSignals = publicSignals;
        console.log("Proof generated successfully.");
        return { proof, publicSignals };
    }

    async verifyProof() {
        if (!this.proof || !this.publicSignals) {
            throw new Error("Proof or public signals not generated.");
        }

        // Verify the proof
        const isValid = await snarkjs.groth16.verify(this.circuit.vk, this.publicSignals, this.proof);
        console.log(`Proof verification result: ${isValid}`);
        return isValid;
    }

    async exportProof(outputFile) {
        if (!this.proof) {
            throw new Error("No proof generated to export.");
        }

        // Export the proof to a JSON file
        fs.writeFileSync(outputFile, JSON.stringify(this.proof));
        console.log(`Proof exported to ${outputFile}`);
    }

    async importProof(inputFile) {
        // Import a proof from a JSON file
        const proofData = fs.readFileSync(inputFile);
        this.proof = JSON.parse(proofData);
        console.log(`Proof imported from ${inputFile}`);
    }
}

module.exports = ZKProof;
