import { beforeEach, describe, it } from 'jsr:@std/testing/bdd';
import { assertEquals } from 'jsr:@std/assert';

import WordList from '../src/WordList.ts';
import { Vector } from '../src/Vector.ts';

describe('WordList', () => {
	let wordList: WordList;

	beforeEach(() => {
		wordList = new WordList();
	});

	it('should add a word and its vector', () => {
		const word = 'example';
		const vector = new Vector([1, 2, 3]);

		wordList.addWord(word, vector);

		assertEquals(wordList.getVector(word), vector);
	});

	it('should retrieve the correct vector for a word', () => {
		const word = 'test';
		const vector = new Vector([4, 5, 6]);

		wordList.addWord(word, vector);

		const retrievedVector = wordList.getVector(word);
		assertEquals(retrievedVector, vector);
	});

	it('should return undefined for a non-existent word', () => {
		const vector = wordList.getVector('nonexistent');
		assertEquals(vector, undefined);
	});

	it('should check if a word exists', () => {
		const word = 'exists';
		const vector = new Vector([7, 8, 9]);

		wordList.addWord(word, vector);

		assertEquals(wordList.hasWord(word), true);
		assertEquals(wordList.hasWord('nonexistent'), false);
	});

	it('should remove a word and its vector', () => {
		const word = 'remove';
		const vector = new Vector([10, 11, 12]);

		wordList.addWord(word, vector);

		const removed = wordList.removeWord(word);
		assertEquals(removed, true);
		assertEquals(wordList.hasWord(word), false);
	});

	it('should return false when removing a non-existent word', () => {
		const removed = wordList.removeWord('nonexistent');
		assertEquals(removed, false);
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

		assertEquals(closestMatches.length, 2);
		assertEquals(closestMatches[0][0], 'word2');
		assertEquals(closestMatches[1][0], 'word3');
	});

	it('should return an empty array if no matches are found', () => {
		const closestMatches = wordList.getNClosestMatches(2, 'nonexistent');
		assertEquals(closestMatches.length, 0);
	});

	it('should return an empty array if n is 0', () => {
		const word = 'word';
		const vector = new Vector([1, 2, 3]);

		wordList.addWord(word, vector);

		const closestMatches = wordList.getNClosestMatches(0, word);
		assertEquals(closestMatches.length, 0);
	});

	it('should return an empty array if n is negative', () => {
		const word = 'word';
		const vector = new Vector([1, 2, 3]);

		wordList.addWord(word, vector);

		const closestMatches = wordList.getNClosestMatches(-1, word);
		assertEquals(closestMatches.length, 0);
	});

	it('should predict the next N words based on a given word', () => {
		const word = 'test';
		const vector = new Vector([1, 2, 3]);
		const predictedWord = 'predicted';

		wordList.addWord(word, vector);
		wordList.addWord(predictedWord, new Vector([4, 5, 6]));

		const predictions = wordList.predictNextNWord(1, [word]);
		assertEquals(predictions.length, 1);
		assertEquals(predictions[0], predictedWord);
	});

	it('should return an empty array if no predictions are found', () => {
		const predictions = wordList.predictNextNWord(1, ['nonexistent']);
		assertEquals(predictions.length, 0);
	});

	it('should return an empty array if n is 0 for predictions', () => {
		const word = 'word';
		const vector = new Vector([1, 2, 3]);

		wordList.addWord(word, vector);

		const predictions = wordList.predictNextNWord(0, [word]);
		assertEquals(predictions.length, 0);
	});

	it('should return an empty array if n is negative for predictions', () => {
		const word = 'word';
		const vector = new Vector([1, 2, 3]);

		wordList.addWord(word, vector);

		const predictions = wordList.predictNextNWord(-1, [word]);
		assertEquals(predictions.length, 0);
	});

	it('should return an empty array if the word list is empty', () => {
		const predictions = wordList.predictNextNWord(1, ['nonexistent']);
		assertEquals(predictions.length, 0);
	});
});
