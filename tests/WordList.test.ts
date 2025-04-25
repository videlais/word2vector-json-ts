import WordList from '../src/WordList';
import { Vector } from '../src/Vector';

describe('WordList', () => {
	let wordList: WordList;

	beforeEach(() => {
		wordList = new WordList();
	});

	it('should add a word and its vector', () => {
		const word = 'example';
		const vector = new Vector([1, 2, 3]);

		wordList.addWord(word, vector);

		expect(wordList.getVector(word)).toBe(vector);
	});

	it('should retrieve the correct vector for a word', () => {
		const word = 'test';
		const vector = new Vector([4, 5, 6]);

		wordList.addWord(word, vector);

		const retrievedVector = wordList.getVector(word);
		expect(retrievedVector).toBe(vector);
	});

	it('should return undefined for a non-existent word', () => {
		const vector = wordList.getVector('nonexistent');
		expect(vector).toBe(undefined);
	});

	it('should check if a word exists', () => {
		const word = 'exists';
		const vector = new Vector([7, 8, 9]);

		wordList.addWord(word, vector);

		expect(wordList.hasWord(word)).toBe(true);
		expect(wordList.hasWord('nonexistent')).toBe(false);
	});

	it('should remove a word and its vector', () => {
		const word = 'remove';
		const vector = new Vector([10, 11, 12]);

		wordList.addWord(word, vector);

		const removed = wordList.removeWord(word);
		expect(removed).toBe(true);
		expect(wordList.hasWord(word)).toBe(false);
	});

	it('should return false when removing a non-existent word', () => {
		const removed = wordList.removeWord('nonexistent');
		expect(removed).toBe(false);
	});

	it('should return the n closest matches for a word', () => {
		const word1 = 'word1';
		const vector1 = new Vector([1, 0, 0]);
		const word2 = 'word2';
		const vector2 = new Vector([0, 1, 0]);
		const word3 = 'word3';
		const vector3 = new Vector([0, 0, 1]);

		wordList.addWord(word1, vector1);
		wordList.addWord(word2, vector2);
		wordList.addWord(word3, vector3);
		const closestMatches = wordList.getNClosestMatches(2, word1);

		expect(closestMatches).toHaveLength(2);
		expect((closestMatches[0]?.[0] ?? 0)).toBe('word2');
		expect((closestMatches[1]?.[0] ?? 0)).toBe('word3');
	});

	it('should return an empty array if no matches are found', () => {
		const closestMatches = wordList.getNClosestMatches(2, 'nonexistent');
		expect(closestMatches).toHaveLength(0);
	});

	it('should return an empty array if n is 0', () => {
		const word = 'word';
		const vector = new Vector([1, 2, 3]);

		wordList.addWord(word, vector);

		const closestMatches = wordList.getNClosestMatches(0, word);
		expect(closestMatches).toHaveLength(0);
	});

	it('should return an empty array if n is negative', () => {
		const word = 'word';
		const vector = new Vector([1, 2, 3]);

		wordList.addWord(word, vector);

		const closestMatches = wordList.getNClosestMatches(-1, word);
		expect(closestMatches).toHaveLength(0);
	});

	it('should predict the next N words based on a given word', () => {
		const word = 'test';
		const vector = new Vector([1, 2, 3]);
		const predictedWord = 'predicted';

		wordList.addWord(word, vector);
		wordList.addWord(predictedWord, new Vector([4, 5, 6]));

		const predictions = wordList.predictNextNWord(1, [word]);
		expect(predictions).toHaveLength(1);
		expect(predictions[0]).toBe(predictedWord);
	});

	it('should return an empty array if no predictions are found', () => {
		const predictions = wordList.predictNextNWord(1, ['nonexistent']);
		expect(predictions).toHaveLength(0);
	});

	it('should return an empty array if n is 0 for predictions', () => {
		const word = 'word';
		const vector = new Vector([1, 2, 3]);

		wordList.addWord(word, vector);

		const predictions = wordList.predictNextNWord(0, [word]);
		expect(predictions).toHaveLength(0);
	});

	it('should return an empty array if n is negative for predictions', () => {
		const word = 'word';
		const vector = new Vector([1, 2, 3]);

		wordList.addWord(word, vector);

		const predictions = wordList.predictNextNWord(-1, [word]);
		expect(predictions).toHaveLength(0);
	});

	it('should return an empty array if the word list is empty', () => {
		const predictions = wordList.predictNextNWord(1, ['nonexistent']);
		expect(predictions).toHaveLength(0);
	});
});
