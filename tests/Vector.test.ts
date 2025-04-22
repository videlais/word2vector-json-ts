import { describe, it } from 'jsr:@std/testing/bdd';
import { assertEquals, assertThrows } from 'jsr:@std/assert';

import { Vector } from '../src/Vector.ts';

describe('Vector', () => {
	it('should create a vector with given dimensions', () => {
		const vector = new Vector([1, 2, 3]);
		assertEquals(vector.getDimensions(), [1, 2, 3]);
	});

	it('should set new dimensions for the vector', () => {
		const vector = new Vector([1, 2, 3]);
		vector.setDimensions([4, 5, 6]);
		assertEquals(vector.getDimensions(), [4, 5, 6]);
	});

	it('should calculate the magnitude of the vector', () => {
		const vector = new Vector([3, 4]);
		assertEquals(vector.magnitude(), 5);
	});

	it('should add two vectors', () => {
		const vector1 = new Vector([1, 2, 3]);
		const vector2 = new Vector([4, 5, 6]);
		const result = vector1.add(vector2);
		assertEquals(result.getDimensions(), [5, 7, 9]);
	});

	it('should throw an error when adding vectors of different dimensions', () => {
		const vector1 = new Vector([1, 2, 3]);
		const vector2 = new Vector([4, 5]);
		assertThrows(
			() => vector1.add(vector2),
			'Vectors must have the same number of dimensions',
		);
	});

	it('should subtract two vectors', () => {
		const vector1 = new Vector([4, 5, 6]);
		const vector2 = new Vector([1, 2, 3]);
		const result = vector1.subtract(vector2);
		assertEquals(result.getDimensions(), [3, 3, 3]);
	});

	it('should throw an error when subtracting vectors of different dimensions', () => {
		const vector1 = new Vector([1, 2, 3]);
		const vector2 = new Vector([4, 5]);
		assertThrows(
			() => vector1.subtract(vector2),
			'Vectors must have the same number of dimensions',
		);
	});

	it('should calculate the dot product of two vectors', () => {
		const vector1 = new Vector([1, 2, 3]);
		const vector2 = new Vector([4, 5, 6]);
		assertEquals(vector1.dotProduct(vector2), 32);
	});

	it('should throw an error when calculating the dot product of vectors with different dimensions', () => {
		const vector1 = new Vector([1, 2, 3]);
		const vector2 = new Vector([4, 5]);
		assertThrows(
			() => vector1.dotProduct(vector2),
			'Vectors must have the same number of dimensions',
		);
	});

	it('should return a string representation of the vector', () => {
		const vector = new Vector([1, 2, 3]);
		assertEquals(vector.toString(), '[1, 2, 3]');
	});
});
