const { NLP } = require('some-nlp-library');

class NaturalLanguageProcessing {
    constructor() {
        this.nlp = new NLP();
    }

    analyzeSentiment(text) {
        return this.nlp.sentiment(text);
    }

    extractEntities(text) {
        return this.nlp.entities(text);
    }
}

module.exports = NaturalLanguageProcessing;
