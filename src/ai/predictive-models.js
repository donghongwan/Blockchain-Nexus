const { train, predict } = require('some-ml-library');

class PredictiveModels {
    constructor() {
        this.model = null;
    }

    trainModel(trainingData, labels) {
        this.model = train(trainingData, labels);
    }

    makePrediction(inputData) {
        if (!this.model) {
            throw new Error('Model has not been trained yet.');
        }
        return predict(this.model, inputData);
    }
}

module.exports = PredictiveModels;
