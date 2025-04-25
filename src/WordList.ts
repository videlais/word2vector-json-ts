import { Vector } from './Vector';
import { getCosSimilarity } from './utils/getCosSimilarity';

/**
 * WordList class to manage a list of words and their corresponding vectors.
 */
export class WordList {
	/**
	 * A map to store words and their corresponding vectors.
	 * The key is the word (string) and the value is the vector (Vector).
	 */
	private words: Map<string, Vector>;

	/**
	 * Constructor to initialize the WordList.
	 * It creates an empty map to store words and vectors.
	 */
	constructor() {
		this.words = new Map<string, Vector>();
	}

	/**
	 * Adds a word and its corresponding vector to the WordList.
	 * @param word - The word to be added.
	 * @param vector - The vector corresponding to the word.
	 */
	addWord(word: string, vector: Vector): void {
		this.words.set(word, vector);
	}

	/**
	 * Retrieves the vector corresponding to a given word.
	 * @param word - The word whose vector is to be retrieved.
	 * @returns The vector corresponding to the word, or undefined if the word does not exist.
	 */
	getVector(word: string): Vector | undefined {
		return this.words.get(word);
	}

	/**
	 * Checks if a word exists in the WordList.
	 * @param word - The word to be checked.
	 * @returns True if the word exists, false otherwise.
	 */
	hasWord(word: string): boolean {
		return this.words.has(word);
	}

	/**
	 * Removes a word and its corresponding vector from the WordList.
	 * @param word - The word to be removed.
	 * @returns True if the word was removed, false if it did not exist.
	 */
	removeWord(word: string): boolean {
		return this.words.delete(word);
	}

	/**
	 * Retrieves the n closest matches to a given word based on cosine similarity.
	 * @param n - The number of closest matches to retrieve.
	 * @param inputWord - The word for which to find the closest matches.
	 * @returns An array of tuples, each containing a word and its similarity score.
	 */
	getNClosestMatches(n: number, inputWord: string): [string, number][] {
		// Define default results array.
		// This will hold the closest matches and their similarity scores.
		// Each entry is a tuple of [word, similarity score].
		// For example: [["word1", 0.9], ["word2", 0.8], ...]
		let results = [] as [string, number][];

		// Get the vector for the given word
		const inputWordVector = this.getVector(inputWord);

		// If the vector is not found, return an empty array
		// This means the word does not exist in the WordList.
		// In this case, we cannot find any closest matches.
		if (inputWordVector !== undefined) {
			// Get the vectors for all words in the WordList
			const wordVectorArray = Array.from(this.words.entries()).reduce(
				(acc, [word, vec]) => {
					acc[word] = vec;
					return acc;
				},
				{} as Record<string, Vector>,
			);

			// For each word, calculate the cosine similarity with the given word vector.
			for (const [word, vector] of Object.entries(wordVectorArray)) {
				// Skip the input word itself to avoid self-comparison.
				if (word === inputWord) {
					continue;
				}
				// Calculate the cosine similarity
				const sim = getCosSimilarity(inputWordVector, vector);
				results.push([word, sim]);
			}

			// Sort the results by similarity in descending order
			results.sort((a, b) => b[1] - a[1]);

			// Return the top n results
			results = results.slice(0, n);
		}

		// Return the results
		return results;
	}

	/**
	 * Predicts the next n words based on a provided word list.
	 * @param n - The number of predictions to make.
	 * @param wordList - The list of words to base predictions on.
	 * @returns An array of predicted words.
	 */
	predictNextNWord(n: number, wordList: [string]) {
		// Based on a provided word list, calculate the next probable words.
		const predictions = new Map<string, number>();

		// Iterate through the provided word list
		for (const word of wordList) {
			// Check if the word exists in the WordList
			if (!this.hasWord(word)) {
				// If the word does not exist, skip to the next word
				continue;
			}

			// Get the n closest matches for the current word
			// This will return an array of tuples, each containing a word and its similarity score.
			const closestMatches = this.getNClosestMatches(n, word);

			// Accumulate similarity scores for each predicted word
			for (const [predictedWord, similarity] of closestMatches) {
				// If the predicted word already exists in the predictions map,
				// accumulate the similarity score.
				if (predictions.has(predictedWord)) {
					// Update the similarity score for the existing predicted word
					// by adding the new similarity score to the existing one.
					predictions.set(
						predictedWord,
						predictions.get(predictedWord)! + similarity,
					);
				} else {
					// If the predicted word does not exist in the predictions map,
					// add it with the current similarity score.
					// This means this is the first time we are encountering this predicted word.
					predictions.set(predictedWord, similarity);
				}
			}
		}

		// Convert the map to an array and sort by accumulated similarity scores.
		const sortedPredictions = Array.from(predictions.entries()).sort((
			a,
			b,
		) => b[1] - a[1]);

		// Return the top n predicted words.
		return sortedPredictions.slice(0, n).map(([word]) => word);
	}
}

export default WordList;
