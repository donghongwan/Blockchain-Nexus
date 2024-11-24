// services/aiModelRegistryService.js
class AIModelRegistryService {
    constructor() {
        this.models = [];
    }

    registerModel(modelName, version, metadata) {
        const newModel = { id: this.models.length + 1, modelName, version, metadata };
        this.models.push(newModel);
        return newModel;
    }

    getAllModels() {
        return this.models;
    }

    getModelById(id) {
        const model = this.models.find(m => m.id === id);
        if (!model) throw new Error('Model not found');
        return model;
    }
}

export default new AIModelRegistryService();
