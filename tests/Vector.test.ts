import { Vector } from '../src/Vector';

describe('Vector', () => {
	describe('getDimensions', () => {
		it('should create a vector with given dimensions', () => {
			const vector = new Vector([1, 2, 3]);
			expect(vector.getDimensions()).toStrictEqual([1, 2, 3]);
		});
	
		it('should set new dimensions for the vector', () => {
			const vector = new Vector([1, 2, 3]);
			vector.setDimensions([4, 5, 6]);
			expect(vector.getDimensions()).toStrictEqual([4, 5, 6]);
		});

		it('should add two vectors', () => {
			const vector1 = new Vector([1, 2, 3]);
			const vector2 = new Vector([4, 5, 6]);
			const result = vector1.add(vector2);
			expect(result.getDimensions()).toStrictEqual([5, 7, 9]);
		});
	
	});

	describe('add', () => {
		it('should throw an error when first vector is different from second', () => {
			const vector1 = new Vector([1, 2, 3]);
			const vector2 = new Vector([4, 5]);
			expect(
				() => vector1.add(vector2)).toThrow();
		});
	
		it('should throw an error when second vector is different from first', () => {
			const vector1 = new Vector([1, 2, 3]);
			const vector2 = new Vector([4, 5]);
			expect(
				() => vector2.add(vector1)).toThrow();
		});

		it('should return empty vector when adding two empty vectors', () => {
			const vector1 = new Vector([]);
			const vector2 = new Vector([]);
			const result = vector1.add(vector2);
			expect(result.getDimensions()).toStrictEqual([]);
		});

		it('should return 0 vector when adding two 0 vectors', () => {
			const vector1 = new Vector([0]);
			const vector2 = new Vector([0]);
			const result = vector1.add(vector2);
			expect(result.getDimensions()).toStrictEqual([0]);
		});
	});

	describe('subtract', () => {
		it('should subtract two vectors', () => {
			const vector1 = new Vector([4, 5, 6]);
			const vector2 = new Vector([1, 2, 3]);
			const result = vector1.subtract(vector2);
			expect(result.getDimensions()).toStrictEqual([3, 3, 3]);
		});
	
		it('should throw an error when subtracting vectors of different dimensions', () => {
			const vector1 = new Vector([1, 2, 3]);
			const vector2 = new Vector([4, 5]);
			expect(
				() => vector1.subtract(vector2)).toThrow();
		});
	});

	describe('dotproduct', () => {
		it('should calculate the dot product of two vectors', () => {
			const vector1 = new Vector([1, 2, 3]);
			const vector2 = new Vector([4, 5, 6]);
			expect(vector1.dotProduct(vector2)).toBe(32);
		});
	
		it('should throw an error when calculating the dot product of vectors with different dimensions', () => {
			const vector1 = new Vector([1, 2, 3]);
			const vector2 = new Vector([4, 5]);
			expect(
				() => vector1.dotProduct(vector2)).toThrow();
		});
	});

	describe('magnitude', () => {
		it('should calculate the magnitude of the vector', () => {
			const vector = new Vector([3, 4]);
			expect(vector.magnitude()).toBe(5);
		});
	});

	describe('toString', () => {
		it('should return a string representation of the vector', () => {
			const vector = new Vector([1, 2, 3]);
			expect(vector.toString()).toBe('[1, 2, 3]');
		});
	});
});
