// services/derivativeContractsService.js
class DerivativeContractsService {
    constructor() {
        this.derivatives = [];
    }

    getAllDerivatives() {
        return this.derivatives;
    }

    createDerivative(contractName, underlyingAsset, terms) {
        const newDerivative = { id: this.derivatives.length + 1, contractName, underlyingAsset, terms };
        this.derivatives.push(newDerivative);
        return newDerivative;
    }
}

export default new DerivativeContractsService();
