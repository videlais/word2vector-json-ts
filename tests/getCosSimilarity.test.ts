import { Vector } from '../src/Vector.ts';
import { describe, it } from 'jsr:@std/testing/bdd';
import { assertEquals, assertThrows } from 'jsr:@std/assert';
import { getCosSimilarity } from '../src/utils/getCosSimilarity.ts';

describe('getCosSimilarity', () => {
	it('should calculate cosine similarity for two valid vectors', () => {
		const vector1 = new Vector([1, 2, 3]);
		const vector2 = new Vector([4, 5, 6]);
		const similarity = getCosSimilarity(vector1, vector2);
		assertEquals(similarity.toFixed(10), (0.9746318462).toFixed(10));
	});

	it('should return 1 for identical vectors', () => {
		const vector1 = new Vector([1, 2, 3]);
		const vector2 = new Vector([1, 2, 3]);
		const similarity = getCosSimilarity(vector1, vector2);
		assertEquals(similarity, 1);
	});

	it('should return 0 for orthogonal vectors', () => {
		const vector1 = new Vector([1, 0]);
		const vector2 = new Vector([0, 1]);
		const similarity = getCosSimilarity(vector1, vector2);
		assertEquals(similarity, 0);
	});

	describe('Errors', () => {
		it('should throw an error if first vector has a different dimension than second', () => {
			const vector1 = new Vector([1, 2, 3]);
			const vector2 = new Vector([4, 5]);
			assertThrows(
				() => getCosSimilarity(vector1, vector2),
				'Vectors must have the same dimensions',
			);
		});

		it('should throw an error if second vector has a different dimension than first', () => {
			const vector1 = new Vector([1, 2, 3]);
			const vector2 = new Vector([4, 5]);
			assertThrows(
				() => getCosSimilarity(vector2, vector1),
				'Vectors must have the same dimensions',
			);
		});

		it('should throw an error if the first of the vectors is a zero vector', () => {
			const vector1 = new Vector([0, 0, 0]);
			const vector2 = new Vector([1, 2, 3]);
			assertThrows(
				() => getCosSimilarity(vector1, vector2),
				'Vector magnitude cannot be zero',
			);
		});

		it('should throw an error if the second of the vectors is a zero vector', () => {
			const vector1 = new Vector([0, 0, 0]);
			const vector2 = new Vector([1, 2, 3]);
			assertThrows(
				() => getCosSimilarity(vector2, vector1),
				'Vector magnitude cannot be zero',
			);
		});

		it('should throw an error if inputs are not of type Vector', () => {
			const vector1 = [1, 2, 3] as unknown as Vector;
			const vector2 = new Vector([4, 5, 6]);
			assertThrows(
				() => getCosSimilarity(vector1, vector2),
				'Inputs must be of type Vector',
			);
		});

		it('should throw an error if vectors are empty', () => {
			const vector1 = new Vector([]);
			const vector2 = new Vector([]);
			assertThrows(
				() => getCosSimilarity(vector1, vector2),
				'Vectors cannot be empty',
			);
		});

		it('should throw an error if the first vector has a magnitude of 0', () => {
			const vector1 = new Vector([0, 0, 0]);
			const vector2 = new Vector([1, 2, 3]);
			assertThrows(
				() => getCosSimilarity(vector1, vector2),
				'Vector magnitude cannot be zero',
			);
		});

		it('should throw an error if the second vector has a magnitude of 0', () => {
			const vector1 = new Vector([1, 2, 3]);
			const vector2 = new Vector([0, 0, 0]);
			assertThrows(
				() => getCosSimilarity(vector1, vector2),
				'Vector magnitude cannot be zero',
			);
		});
	});
});
