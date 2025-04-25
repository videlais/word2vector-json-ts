import { getCosSimilarity } from './utils/getCosSimilarity';
export class WordList {
    constructor() {
        this.words = new Map();
    }
    addWord(word, vector) {
        this.words.set(word, vector);
    }
    getVector(word) {
        return this.words.get(word);
    }
    hasWord(word) {
        return this.words.has(word);
    }
    removeWord(word) {
        return this.words.delete(word);
    }
    getNClosestMatches(n, inputWord) {
        let results = [];
        const inputWordVector = this.getVector(inputWord);
        if (inputWordVector !== undefined) {
            const wordVectorArray = Array.from(this.words.entries()).reduce((acc, [word, vec]) => {
                acc[word] = vec;
                return acc;
            }, {});
            for (const [word, vector] of Object.entries(wordVectorArray)) {
                if (word === inputWord) {
                    continue;
                }
                const sim = getCosSimilarity(inputWordVector, vector);
                results.push([word, sim]);
            }
            results.sort((a, b) => b[1] - a[1]);
            results = results.slice(0, n);
        }
        return results;
    }
    predictNextNWord(n, wordList) {
        const predictions = new Map();
        for (const word of wordList) {
            if (!this.hasWord(word)) {
                continue;
            }
            const closestMatches = this.getNClosestMatches(n, word);
            for (const [predictedWord, similarity] of closestMatches) {
                if (predictions.has(predictedWord)) {
                    predictions.set(predictedWord, predictions.get(predictedWord) + similarity);
                }
                else {
                    predictions.set(predictedWord, similarity);
                }
            }
        }
        const sortedPredictions = Array.from(predictions.entries()).sort((a, b) => b[1] - a[1]);
        return sortedPredictions.slice(0, n).map(([word]) => word);
    }
}
export default WordList;
//# sourceMappingURL=WordList.js.map