import { describe, it } from 'jsr:@std/testing/bdd';
import { assertEquals, assertThrows } from 'jsr:@std/assert';
import { getNormalize } from '../src/utils/getNormalize.ts';
import { Vector } from '../src/Vector.ts';

describe('getNormalize', () => {
	it('should normalize a non-zero vector correctly', () => {
		const vector = new Vector([3, 4]);
		const result = getNormalize(vector);
		assertEquals(result, [0.6, 0.8]); // 3/5 and 4/5
	});

	it('should throw an error when normalizing a zero vector', () => {
		const vector = new Vector([0, 0]);
		assertThrows(
			() => getNormalize(vector),
			'Cannot normalize a zero vector.',
		);
	});

	it('should normalize a vector with negative components', () => {
		const vector = new Vector([-3, -4]);
		const result = getNormalize(vector);
		assertEquals(result, [-0.6, -0.8]); // -3/5 and -4/5
	});

	it('should normalize a vector with floating-point components', () => {
		const vector = new Vector([1.5, 2.5]);
		const magnitude = Math.sqrt(1.5 ** 2 + 2.5 ** 2);
		const result = getNormalize(vector);
		assertEquals(result, [1.5 / magnitude, 2.5 / magnitude]);
	});

	it('should normalize a high-dimensional vector', () => {
		const vector = new Vector([1, 2, 3, 4]);
		const magnitude = Math.sqrt(1 ** 2 + 2 ** 2 + 3 ** 2 + 4 ** 2);
		const result = getNormalize(vector);
		assertEquals(result, [
			1 / magnitude,
			2 / magnitude,
			3 / magnitude,
			4 / magnitude,
		]);
	});
});
